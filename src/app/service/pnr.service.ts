import { Injectable } from '@angular/core';

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
    
   // alert("getpnrrm" + JSON.stringify(this.pnrObj.rmElements));
   /// alert("getpnranme" + JSON.stringify(this.pnrObj.nameElements));
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

getNameElements() {
    if (this.isPNRLoaded){
        for (var rm of this.pnrObj.nameElements){
            console.log(rm);
        }
       // alert("name" + JSON.stringify(this.pnrObj.nameElements));
    }
      // alert("namename" + JSON.stringify(this.pnrObj.nameElements));
    console.log(JSON.stringify(this.pnrObj.nameElements));
      //alert("namerm" + JSON.stringify(this.pnrObj.rmElements));
    return "";
    
}

getPassengers(){
    if (this.isPNRLoaded){
        var passengers = new Array<string>();
        for (var rm of this.pnrObj.nameElements){
            passengers.push(rm);
        }
    return passengers;
    }
    return new Array<string>();
}




}