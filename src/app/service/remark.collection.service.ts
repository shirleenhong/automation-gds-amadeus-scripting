import { Injectable  } from '@angular/core';
import { RemarkGroup } from '../models/remark.group.model';


@Injectable({
  providedIn: 'root',
})
export class RemarkCollectionService  {
    remarkCollection : Array<RemarkGroup>;
   

    constructor(){
        this.remarkCollection = new Array<RemarkGroup>();
       
    }

    ngOnInit() {
        this.remarkCollection = new Array<RemarkGroup>();
    }

  public  addUpdateRemarkGroup(remarkGroup: RemarkGroup){
        if  (this.remarkCollection.length>0){
            var look = this.remarkCollection.find(x=> x.group == remarkGroup.group);
            if (look!=null){
                var index = this.remarkCollection.indexOf(look);
                this.remarkCollection.splice(index, 1); 
            }
         
          }
            this.remarkCollection.push(remarkGroup);
  }



}