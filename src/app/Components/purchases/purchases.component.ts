import { Component, OnInit, Input } from '@angular/core';

import { GlobalService } from '../../global.service';

enum productInitType{
  direct,
  cart,
  api
}

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent implements OnInit {

  private shipping: number;

  constructor(private global: GlobalService) { }

  ngOnInit() {
    if(this.global.purchaseId == productInitType.direct){
      console.log(this.global.selectedProduct)
    }
    else if(this.global.purchaseId == productInitType.cart){

    }
    else if(this.global.purchaseId == productInitType.api){

    }

    this.shipping = 10;
  }

  Purchase(){

  }

  SubTotal(){
    return 500;
  }

  CalculateTax(){
    return 5;
  }

  TotalAmount(){
    return this.SubTotal() + this.CalculateTax() + this.shipping;
  }
}
