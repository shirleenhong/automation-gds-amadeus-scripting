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
    remarksElement: Array<any>;
    crypticCommands = Array<string>();
    deleteRemarksByIds = Array<string>();
    passiveSegmentElement: Array<any>;
    passiveSegmentGroup: Array<PassiveSegmentModel>;
    responseMessage: string;
    constructor() {
        this.deleteRemarksByIds = new Array<string>();
        this.crypticCommands = new Array<string>();
        this.remarksElement = new Array<any>();
    }


    clear() {
        this.deleteRemarksByIds.length = 0;
        this.crypticCommands.length = 0;
        this.remarksElement.length = 0;
    }

    BuildRemarks(remarkGroups: RemarkGroup[]) {
        this.remarksElement = new Array<any>();
        this.passiveSegmentElement = new Array<any>();

        remarkGroups.forEach(group => {
            if (group !== undefined && group.group !== '') {
                if (group.deleteRemarkByIds != null && group.deleteRemarkByIds.length > 0) {
                    group.deleteRemarkByIds.forEach(c => {
                        this.deleteRemarksByIds.push(c);
                    });
                }

                if (group.cryptics != null && group.cryptics.length > 0) {
                    group.cryptics.forEach(c => {
                        this.crypticCommands.push(c);
                    });
                }



                if (group.passiveSegments != null && group.passiveSegments.length > 0) {
                    group.passiveSegments.forEach(pas => {
                        this.passiveSegmentElement.push(this.addPassiveSegmentElement(pas));
                    });
                }


                if (group.remarks != null && group.remarks.length > 0) {
                    group.remarks.forEach(rem => {
                        if (rem.remarkType === 'FS') {
                            this.remarksElement.push(this.getFSRemarksElement(rem));
                        } else {
                            // let test = this.getRemarkElement(rem);
                            this.remarksElement.push(this.getRemarkElement(rem));
                        }

                    });
                }
            }


        });



    }

    getFSRemarksElement(remarkModel: RemarkModel) {
        const reference = {
            qualifier: 'OT',
            number: '1'
        };
        const elementManagementData = {
            reference,
            segmentName: 'FS'
        };

        const fareElement = {
            generalIndicator: 'S',
            passengerType: '',
            freetextLong: remarkModel.remarkText
        };

        return { elementManagementData, fareElement };

    }

    getRemarkElement(remarkModel: RemarkModel) {
        const reference = {
            qualifier: 'OT',
            number: '1'
        };
        const elementManagementData = {
            reference,
            segmentName: 'RM'
        };

        const remarks = {
            type: remarkModel.remarkType,
            category: remarkModel.category,
            freetext: remarkModel.remarkText
        };

        const miscellaneousRemark = {
            remarks
        };


        const temp = new Array<any>();
        if (remarkModel.relatedSegments) {
            remarkModel.relatedSegments.forEach(element => {
                const ref = {
                    qualifier: 'ST',
                    number: element
                };
                temp.push(ref);
            });
        }
        const referenceForDataElement = {
            reference: temp
        };

        // alert(JSON.stringify(referenceForDataElement));
        return { elementManagementData, miscellaneousRemark, referenceForDataElement };

    }

    // private segmentRelate(remarkModel: RemarkModel) {
    //     const reference = [];
    //     if (remarkModel.relatedSegments.length > 0) {
    //         remarkModel.relatedSegments.forEach(element => {
    //             const ref = {
    //                 qualifier: 'ST',
    //                 number: element
    //             };
    //             reference.push(ref);
    //         });
    //     }
    //     const referenceForDataElement = {
    //         reference
    //     };
    // }

    addPassiveSegmentElement(passiveSegmentmodel: PassiveSegmentModel) {

        const reference = {
            qualifier: 'SR',
            number: '1'
        };

        const elementManagementItinerary = {
            reference,
            segmentName: 'RU'
        };

        const boardPointDetail = {
            cityCode: passiveSegmentmodel.startPoint
        };
        const offPointDetail = {
            cityCode: passiveSegmentmodel.endPoint
        };
        const company = {
            identification: passiveSegmentmodel.vendor
        };

        const travelProductProduct = {
            depDate: passiveSegmentmodel.startDate,
            depTime: '0000',
            arrDate: passiveSegmentmodel.endDate,
            arrTime: '0000'
        };

        const travelProduct = {
            product: travelProductProduct,
            boardpointDetail: boardPointDetail,
            offpointDetail: offPointDetail,
            company
        };

        const relatedProduct = {
            quantity: '1',
            status: passiveSegmentmodel.status
            // quantitySpecified: true,
            // product: travelProductProduct
        };

        const messageActionBusiness = {
            function: '12'
        };

        const messageAction = {
            business: messageActionBusiness
        };

        const freeTextItineraryDetail = {
            subjectQualifier: '3',
            type: 'P19'
        };

        const freeTextItinerary = {
            freetextDetail: freeTextItineraryDetail,
            longFreetext: passiveSegmentmodel.freeText
        };

        const airAuxItinerary = {
            travelProduct,
            messageAction,
            relatedProduct,
            freetextItinerary: freeTextItinerary

        };

        return { elementManagementItinerary, airAuxItinerary };
        // var summary = {originDestinationDetails};
        // RemarklistModel.addRemark(summary);
        // alert(JSON.stringify(RemarklistModel.originDestinationDetails ))

    }

    sendCryptics() {
        this.crypticCommands.forEach(command => { smartScriptSession.send(command); });
    }


    deleteRemarks() {
        let deleteIds = '';
        this.deleteRemarksByIds.forEach(ids => { deleteIds += ids + ','; });
        if (deleteIds !== '') {

            deleteIds = deleteIds.slice(0, -1);
            smartScriptSession.send('XE' + deleteIds);
        }

    }


    async   sendRemarks() {
        const pnrActions = {
            optionCode: '0'
        };
        let dataElementsMaster;
        let originDestination;
        let originDestinationDetails;

        if (this.passiveSegmentElement.length > 0) {

            originDestination = {
                origin: '',
                destination: ''
            };

            originDestinationDetails = {
                originDestination,
                itineraryInfo: this.passiveSegmentElement
            };
        }

        if (this.remarksElement.length > 0) {
            dataElementsMaster = {
                marker1: '',
                dataElementsIndiv: this.remarksElement
            };
        }



        const remarkElements = { pnrActions, originDestinationDetails, dataElementsMaster };
        console.log(JSON.stringify(remarkElements));
        await smartScriptSession.requestService('ws.addMultiElement_v14.1', remarkElements).then(data => {
            this.responseMessage = 'Remarks Updated';
            smartScriptSession.send('RT');
            // alert(JSON.stringify(remarkElements));
        }, error => {
            this.responseMessage = JSON.stringify(error);
        });

    }

    async SubmitRemarks() {
        this.deleteRemarks();
        await this.sendCryptics();
        await this.sendRemarks();
        this.clear();
    }

}







