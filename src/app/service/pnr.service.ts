import { Injectable } from '@angular/core';
import { R3NgModuleDef } from '@angular/compiler/src/render3/r3_module_compiler';

declare var PNR: any;

@Injectable({
  providedIn: 'root',
})
export class PnrService {
    pnrObj:any;
    isPNRLoaded=false;
    errorMessage="";
  
  constructor() { }



  async getPNR():Promise<void>{    
    this.pnrObj= new PNR();
        await  this.pnrObj.retrievePNR().then((res: any)=>{    
                this.isPNRLoaded=true;
                this.errorMessage="PNR Loaded Successfully";
            },(error: string)=>{                
                this.isPNRLoaded=false;
                this.errorMessage="Error:"+error;               
            });
  }

getCFLine() {
    if (this.isPNRLoaded){
        for (var rm of this.pnrObj.rmElements){
            if (rm.freeFlowText.indexOf("CF/-")==0){
                    return rm.freeFlowText;
            }
        }
        
    }
    return "";
}

getFSLineNumber(){
    if (this.isPNRLoaded){
        for (var rm of this.pnrObj.fsElements){
             return rm.elementNumber;
        }
    }  
    return "";
}


getPassengers(){
    if (this.isPNRLoaded){
        var passengers = [];

        for (var rm of this.pnrObj.nameElements){
            var  fname = rm.fullNode.enhancedPassengerData.enhancedTravellerInformation.otherPaxNamesDetails.givenName
            var lname = rm.fullNode.enhancedPassengerData.enhancedTravellerInformation.otherPaxNamesDetails.surname
            var fullname: any = fname + '-' + lname;
            var passenger =
            {
                firstname : fname,
                surname : lname,
                id : rm.elementNumber,
                fullname: fullname
            }
            passengers.push(passenger);
        }
    return passengers;
    }
    return new Array<string>();
}


getDestinationLine() {
    if (this.isPNRLoaded){
        for (var rm of this.pnrObj.rmElements){
            if (rm.freeFlowText.indexOf("DE/-")==0){
                    return rm.elementNumber;
            }
        }  
    }
    return "";
}




}