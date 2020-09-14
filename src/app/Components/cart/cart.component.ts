import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';
import { Item } from '../dashboard/dashboard.component';

export interface CartItem{
  userId:string;
  name: string,
  shop:string;
  size_small: number;
  size_medium: number;
  size_large: number;
  cartId: string;
  image: string;
}

export interface Shop{
  user_name: string;
}

export interface SelectedItem{
  name: string;
  size_small: number;
  size_medium: number;
  size_large: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  @Input() userId: string;
  
  private cartItemArray: CartItem[];
  private itemPriceArray: SelectedItem[];
  private isLoading: boolean;
  private totalCartPrize: number;
  private selectedItemIndex: number;
  
  constructor(private modalController: ModalController, private globalService: GlobalService, private fbService: CRUDService) { }

  ngOnInit() {
    this.isLoading = true;
    this.totalCartPrize = 0;

    //Load Cart details
    this.fbService.GetById('Cart', 'userId', this.userId).subscribe((data: CartItem[]) => {
      this.cartItemArray = [...data];

      for(let i = 0; i < this.cartItemArray.length; i++){
        this.fbService.GetImage(this.cartItemArray[i].image).then(img => {
          this.cartItemArray[i].image = img;
        });
      }
    });

    //Load Item Prices
    this.fbService.GetAll('Items').subscribe((item: SelectedItem[]) => {
      this.itemPriceArray = [...item];
    });

    //AFTER API CALL FINISHED
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  DismissModel(){
    this.modalController.dismiss();
  }

  //QUANTITY
  CalculateTotalPricePerItem(small_quantity, medium_quantity, large_quantity, itemName){
    let index;
    for(let i = 0; i < this.itemPriceArray.length; i++){
      if(this.itemPriceArray[i].name == itemName){
        index = i;
        break;
      }
    }

    let productTotal = this.itemPriceArray[index].size_small * small_quantity + this.itemPriceArray[index].size_medium * medium_quantity + this.itemPriceArray[index].size_large * large_quantity;
    return productTotal;
  }

  ChangeProductQuantity(index, factor, type){
    let quantity;

    if(type == 0){
      quantity = this.cartItemArray[index].size_small;

      if(quantity < 1 && factor < 0){
        return;
      }
      else{
        quantity += factor;
        this.cartItemArray[index].size_small = quantity;
      }
    }
    else if(type == 1){
      quantity = this.cartItemArray[index].size_medium;

      if(quantity < 1 && factor < 0){
        return;
      }
      else{
        quantity += factor;
        this.cartItemArray[index].size_medium = quantity;
      }
    }
    else if(type == 2){
      quantity = this.cartItemArray[index].size_large;

      if(quantity < 1 && factor < 0){
        return;
      }
      else{
        quantity += factor;
        this.cartItemArray[index].size_large = quantity;
      }
    }
  }

  //REMOVE
  RemoveProduct(index){
    this.selectedItemIndex = index;
    this.globalService.CreateAlert("DELETE", "Are you sure you want to delete " + this.cartItemArray[index].name, "Confirm", "Cancel", this.CancelDelete, this.ConfirmDelete.bind(this));
  }

  CancelDelete(){
    console.log("Delete Canceled!");
  }

  ConfirmDelete(){
    this.fbService.DeleteById('Cart', 'cartId', this.cartItemArray[this.selectedItemIndex].cartId);

    let itemId: number = +this.selectedItemIndex;
    this.cartItemArray.splice(itemId, 1);

    this.globalService.cartCount--;
  }

  //PURCHASE
  CallPurchase(){
    this.globalService.CreateAlert("PURCHASE", "Are you sure you want to purchase all the items?", "Yes", "No", this.CancelPurchaseCallBack, this.ConfirmPurchaseCallBack.bind(this));
  }

  CancelPurchaseCallBack(){
    console.log("Purchase canceled!");
  }

  ConfirmPurchaseCallBack(){
    this.globalService.purchaseId = 1;

    this.SetSelectedProductProperty();

    this.globalService.homePageTitle = "PURCHASE";
    this.globalService.selectedHomeComponent = 4;

    this.modalController.dismiss();
  }

  SetSelectedProductProperty(){
    for(let i = 0; i < this.globalService.selectedProduct.length; i++){
      this.globalService.selectedProduct.pop();
    }

    let index;

    for(let i = 0; i < this.cartItemArray.length; i++){
      for(let j = 0; j < this.itemPriceArray.length; j++){
        if(this.itemPriceArray[j].name == this.cartItemArray[i].name){
          index = i;
          break;
        }
      }

      this.globalService.selectedProduct.push(
        {
          userId: this.cartItemArray[i].userId, 
          image: this.cartItemArray[i].image, 
          name: this.cartItemArray[i].name, 
          size_small: this.itemPriceArray[index].size_small,
          size_medium: this.itemPriceArray[index].size_medium, 
          size_large: this.itemPriceArray[index].size_large, 
          quantity:[
            this.cartItemArray[i].size_small, 
            this.cartItemArray[i].size_medium, 
            this.cartItemArray[i].size_large
          ]
        }
      );
    }
  }
}