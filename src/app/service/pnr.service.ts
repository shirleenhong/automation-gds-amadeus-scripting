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




}