import { RemarkGroup } from '../models/pnr/remark.group.model';
import { PassiveSegmentModel } from '../models/pnr/passive-segment.model';
import { Injectable } from '@angular/core';
import { RemarkModel } from '../models/pnr/remark.model';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { analyzeAndValidateNgModules } from '@angular/compiler';

declare var smartScriptSession: any;


@Injectable({
    providedIn: 'root',
  })
  export class RemarkService {
      remarksElement:Array<any>;
      crypticCommands=Array<string>();
      deleteRemarksByIds=Array<string>();
      passiveSegmentElement:Array<any>;
      passiveSegmentGroup:Array<PassiveSegmentModel>;
      responseMessage:string;
        constructor(){
            this.deleteRemarksByIds=new Array<string>();
            this.crypticCommands=new Array<string>();
            this.remarksElement=new Array<any>();
        }

        
        clear(){
            this.deleteRemarksByIds.length=0;
            this.crypticCommands.length=0;
            this.remarksElement.length=0;
        }

        BuildRemarks(remarkGroups: RemarkGroup[]){
                this.remarksElement= new Array<any>();
                this.passiveSegmentElement = new Array<any>();

                remarkGroups.forEach(group => 
                    {
                        if (group.group!=""&& group.group!="" )
                        {
                            if(group.deleteRemarkByIds != null && group.deleteRemarkByIds.length>0){
                                group.deleteRemarkByIds.forEach(c => {
                                    this.deleteRemarksByIds.push(c);
                                });
                            }

                            if(group.cryptics != null && group.cryptics.length>0){
                                group.cryptics.forEach(c => {
                                    this.crypticCommands.push(c);
                                });
                            }


                        
                                if (group.passiveSegments != null && group.passiveSegments.length>0)
                                {
                                    group.passiveSegments.forEach(pas=>{
                                    this.passiveSegmentElement.push(this.addPassiveSegmentElement(pas));
                                    });
                                }
                            

                            if (group.remarks!=null && group.remarks.length>0)
                            {
                            group.remarks.forEach(rem=>{
                                        if(rem.remarkType == "FS"){
                                            this.remarksElement.push(this.getFSRemarksElement(rem));
                                        }else
                                        {
                                            this.remarksElement.push(this.getRemarkElement(rem));
                                        }    
                                        
                                            });
                            }
                        }   
                                      
                
            });

            
       
        }

        getFSRemarksElement(remarkModel:RemarkModel)
        {
            var reference =
                    {
                        qualifier: "OT",
                        number: "1"
                    };
                var elementManagementData = {
                    reference: reference,
                    segmentName: "FS"
                };

            var fareElement =
            {
                generalIndicator: "S",
				passengerType: "",
				freetextLong: remarkModel.remarkText
            }

            return {elementManagementData, fareElement};

        }

        getRemarkElement(remarkModel:RemarkModel){
                var reference =
                    {
                        qualifier: "OT",
                        number: "1"
                    };
                var elementManagementData = {
                    reference: reference,
                    segmentName: "RM"
                };
                    
                var remarks = {
                    type:  remarkModel.remarkType,
                    category: remarkModel.category,
                    freetext: remarkModel.remarkText
                };
                    
                var miscellaneousRemark = {
                    remarks: remarks
                };
                
                return {elementManagementData, miscellaneousRemark};
        
         }

         addPassiveSegmentElement(passiveSegmentmodel: PassiveSegmentModel){

            var reference ={
                qualifier: "SR",
                number: "1"
            }
    
            var elementManagementItinerary = {
                reference: reference,
                segmentName: "RU"
            }
    
            var boardPointDetail = {
                cityCode: passiveSegmentmodel.startPoint
            }
            var offPointDetail = {
                cityCode: passiveSegmentmodel.endPoint
            }
            var company = {
                identification: passiveSegmentmodel.vendor            }
            
            var travelProductProduct = {
                depDate: passiveSegmentmodel.startDate,
                depTime: "0000",
                arrDate: passiveSegmentmodel.endDate,
                arrTime: "0000"
         }

         var travelProduct = {
            product: travelProductProduct,
            boardpointDetail: boardPointDetail,
            offpointDetail: offPointDetail,
            company: company
        }

        var relatedProduct = {
            quantity: "1",
            status: passiveSegmentmodel.status
            // quantitySpecified: true,
            // product: travelProductProduct
        }

        var messageActionBusiness ={
            function: "12"
        }

        var messageAction = {
            business : messageActionBusiness
        }

        var freeTextItineraryDetail ={
            subjectQualifier: "3",
            type: "P19"
        }

        var freeTextItinerary ={
            freetextDetail: freeTextItineraryDetail,
            longFreetext: passiveSegmentmodel.freeText
        }

        var airAuxItinerary ={
            travelProduct: travelProduct,
            messageAction: messageAction,
            relatedProduct: relatedProduct,
            freetextItinerary: freeTextItinerary
            
        }
    
    return {elementManagementItinerary, airAuxItinerary}
        // var summary = {originDestinationDetails};
        // RemarklistModel.addRemark(summary);
        // alert(JSON.stringify(RemarklistModel.originDestinationDetails ))

    }

        sendCryptics(){
            this.crypticCommands.forEach(command => { smartScriptSession.send(command); });            
        }


        deleteRemarks(){
            var deleteIds="";
            this.deleteRemarksByIds.forEach(ids => { deleteIds+=ids+"," });  
            if (deleteIds!="") {           
     
                deleteIds = deleteIds.slice(0, -1)
                smartScriptSession.send("XE"+deleteIds);
            }
        
        }


        async   sendRemarks(){
            var pnrActions = {
                 optionCode: "0"
             }
      
             
            if (this.passiveSegmentElement.length > 0){
                
                var originDestination = {
                    origin: "",
                    destination: ""
                }

                var originDestinationDetails ={
                    originDestination: originDestination,
                    itineraryInfo: this.passiveSegmentElement
                } 
            }

            if (this.remarksElement.length > 0){
            var dataElementsMaster = {
                marker1: "",
                dataElementsIndiv: this.remarksElement
            }
            }
      
      
            
            var remarkElements ={pnrActions, originDestinationDetails, dataElementsMaster}            
            console.log(JSON.stringify(remarkElements));
            await    smartScriptSession.requestService("ws.addMultiElement_v14.1", remarkElements).then(data=>
            {
                this.responseMessage = "Remarks Updated";
                smartScriptSession.send("RT");
                // alert(JSON.stringify(remarkElements));
            }, error=>
            {
                this.responseMessage = JSON.stringify(error);              
                });
                
            }
        
          
        async SubmitRemarks(){
            this.deleteRemarks();
            this.sendCryptics();
            await this.sendRemarks();
            this.clear();
        }

  }







