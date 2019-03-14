import { RemarkGroup } from '../models/remark.group.model';
import { PassiveSegmentGroup } from '../models/remark.group.model';
import { Injectable } from '@angular/core';
import { RemarkModel } from '../models/remark.model';
import { PassiveSegmentModel } from '../models/passive-segment.model';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { analyzeAndValidateNgModules } from '@angular/compiler';

declare var smartScriptSession: any;


@Injectable({
    providedIn: 'root',
  })
  export class RemarkService {
      remarksElement:Array<any>;
      passiveSegmentElement:Array<any>;
      
      responseMessage:string;
        constructor(){

        }

        BuildRemarks(remarkGroups: RemarkGroup[], passiveSegmentGroup: PassiveSegmentGroup[]){
                this.remarksElement= new Array<any>();
                this.passiveSegmentElement = new Array<any>();

                remarkGroups.forEach(group => {
                    if (group.group!=""&& group.remarks.length>0){
                        group.remarks.forEach(rem=>{
                        this.remarksElement.push(this.getRemarkElement(rem));
                    });
                }
            });

            passiveSegmentGroup.forEach(group => {
                if (group.group!=""&& group.passiveSegment.length>0){
                    group.passiveSegment.forEach(pas=>{
                    this.passiveSegmentElement.push(this.addPassiveSegmentElement(pas));
                });
            }
        });
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

        // CombineElements(){
        //     if (this.passiveSegmentElement.length > 0){
                
        //         var originDestination = {
        //             origin: "",
        //             destination: ""
        //         }

        //         this.originDestinationDetails ={
        //             originDestination: originDestination,
        //             itineraryInfo: this.passiveSegmentElement
        //         } 
        //     }

        //     if (this.remarksElement.length > 0){
        //         this.dataElementsMaster = {
        //             marker1: "",
        //             dataElementsIndiv: this.remarksElement
        //         }
        //     }

        // }

         async SubmitRemarks(){
        
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
               
            }, error=>
            {
                this.responseMessage = JSON.stringify(error);              
                
            });
          
        }

  }







