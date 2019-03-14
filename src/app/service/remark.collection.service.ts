import { Injectable, OnInit } from '@angular/core';
import { RemarkGroup, PassiveSegmentGroup } from '../models/remark.group.model';



@Injectable({
  providedIn: 'root',
})
export class RemarkCollectionService implements OnInit{
    remarkCollection : Array<RemarkGroup>;
    passiveSegmentCollection : Array<PassiveSegmentGroup>;

    constructor(){
        this.remarkCollection = new Array<RemarkGroup>();
        this.passiveSegmentCollection = new Array<PassiveSegmentGroup>();
    }

    ngOnInit() {
        this.remarkCollection = new Array<RemarkGroup>();
        this.passiveSegmentCollection = new Array<PassiveSegmentGroup>();

    }

  public  addUpdateRemarkGroup(remarkGroup: RemarkGroup){
        if  (this.remarkCollection.length>0){
            var look = this.remarkCollection.find(x=> x.group == remarkGroup.group);
            if (look!=null){
                look = remarkGroup;
            }else {
                this.remarkCollection.push(remarkGroup);
            }
        }
        else {
            this.remarkCollection.push(remarkGroup);
        }
    }

    public  addUpdatePassiveSegmentGroup(passiveSegmentGroup: PassiveSegmentGroup){
        if  (this.passiveSegmentCollection.length>0){
            var look = this.passiveSegmentCollection.find(x=> x.group == passiveSegmentGroup.group);
            if (look!=null){
                look = passiveSegmentGroup;
            }else {
                this.passiveSegmentCollection.push(passiveSegmentGroup);
            }
        }
        else {
            this.passiveSegmentCollection.push(passiveSegmentGroup);
        }
    }






}