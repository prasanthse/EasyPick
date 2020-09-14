import { Component, OnInit, Input } from '@angular/core';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';

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

  private subTotal: number;
  private tax: number;
  private total: number;

  private fromCart: boolean;

  constructor(private global: GlobalService, private fbService: CRUDService) { }

  ngOnInit() {
    if(this.global.purchaseId == productInitType.direct){
      console.log("Direct Purchase");
      this.fromCart = false;
    }
    else if(this.global.purchaseId == productInitType.cart){
      console.log("Cart Purchase");
      this.fromCart = true;
    }
    else if(this.global.purchaseId == productInitType.api){
      console.log("API Purchase");
      this.fromCart = false;
    }

    this.subTotal = 0;
    this.global.shipping = 100;
    this.global.tax = 10;//Percentage

    this.SubTotal();
    this.CalculateTax();
    this.TotalAmount();
  }

  Purchase(){
    this.global.CreateAlert("PURCHASE", "Are you sure you want to purchase?", "Yes", "No", this.CancelPurchaseCallback, this.SuccessPurchaseCallback.bind(this));
  }

  CancelPurchaseCallback(){
    console.log("purchase canceled!");
  }

  SuccessPurchaseCallback(){
    this.global.PresentToast('Thank you for your Purchase!', 'success', 2000);

    for(let i = 0; i < this.global.selectedProduct.length; i++){
      this.global.selectedProduct.pop();
    }

    if(this.fromCart) this.fbService.DeleteAll('Cart');
    
    this.global.homePageTitle = 'HOME';
    this.global.selectedHomeComponent = 0;
  }

  SubTotal(){
    for(let i = 0; i < this.global.selectedProduct.length; i++){
      this.subTotal += this.global.selectedProduct[i].size_small * this.global.selectedProduct[i].quantity[0] + this.global.selectedProduct[i].size_medium * this.global.selectedProduct[i].quantity[1] + this.global.selectedProduct[i].size_large * this.global.selectedProduct[i].quantity[2];
    }
  }

  CalculateTax(){
    this.tax = (this.subTotal * this.global.tax) / 100;
  }

  TotalAmount(){
    this.total = this.subTotal + this.tax + this.global.shipping;
  }
}
