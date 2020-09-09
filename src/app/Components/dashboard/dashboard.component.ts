import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private isAdd: boolean;
  private isDelete: boolean;
  private isUpdate: boolean;
  private isSale: boolean;
  private isRecommendation: boolean;

  constructor() { }

  ngOnInit() {
    this.SetBodySateChange(true, false, false, false, false);
  }

  SegmentChanged(ev: any){
    switch(ev.detail.value){
      case '0':
        this.SetBodySateChange(true, false, false, false, false);
        break;
      case '1':
        this.SetBodySateChange(false, true, false, false, false);
        break;
      case '2':
        this.SetBodySateChange(false, false, true, false, false);
        break;
      case '3':
        this.SetBodySateChange(false, false, false, true, false);
        break;
      case '4':
        this.SetBodySateChange(false, false, false, false, true);
        break;
    }
  }

  SetBodySateChange(addCond, deleteCond, updateCon, saleCond, recommentedCond){
    this.isAdd = addCond;
    this.isDelete = deleteCond;
    this.isUpdate = updateCon;
    this.isSale = saleCond;
    this.isRecommendation = recommentedCond;
  }
}
