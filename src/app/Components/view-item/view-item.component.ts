import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';
import { PopOverComponent } from '../pop-over/pop-over.component';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
  @Input() userId: string;
  @Input() name: string;
  @Input() image: string;
  @Input() size_small: number; 
  @Input() size_medium: number; 
  @Input() size_large: number; 
  @Input() description: string; 
  @Input() shop: string; 

  private selectedArray: boolean[] = [];
  private disableStock: boolean[] = [];
  private selectedQuantity: number[] = [];

  constructor(
    private modalController: ModalController, 
    private global: GlobalService, 
    private popoverController: PopoverController,
    private fbService: CRUDService
  ) { }

  ngOnInit() {
    for(let i = 0; i < this.selectedArray.length; i++){
      this.selectedArray.pop();
    }

    for(let i = 0; i < 3; i++){
      this.selectedArray.push(false);
      this.disableStock.push(true);
      this.selectedQuantity.push(0);
    }

    if(this.size_small != 0) this.disableStock[0] = false;
    if(this.size_medium != 0) this.disableStock[1] = false;
    if(this.size_large != 0) this.disableStock[2] = false;
  }

  DismissModel(){
    this.modalController.dismiss();
  }

  AddToCart(){
    let check = false;

    for(let i = 0; i < this.selectedArray.length; i++){
      if(this.selectedArray[i]){
        check = true;
        break;
      }
    }

    if(this.global.userId == '123'){
      this.global.PresentToast("Please Login to use your cart", "warning", 2000);
    }
    else{
      if(check){
        let cartObj = {
          userId: this.global.userId,
          name: this.name,
          shop: this.shop,
          size_small: this.SelectedSizeWithQuantity(0),
          size_medium: this.SelectedSizeWithQuantity(1),
          size_large: this.SelectedSizeWithQuantity(2),
          cartId: this.global.userId + "_" + this.name,
          image: this.image
        }
  
        this.fbService.Add('Cart', cartObj);
  
        this.global.cartCount++;
        this.global.PresentToast("Added to Cart!", "success", 2000);
  
        this.DismissModel();
      }
      else{
        this.global.PresentToast("Please select minimum one size", "danger", 2000);
      }
    }
  } 

  SelectItemSizes(val){
    if(!this.selectedArray[val]){
      //this.PresentPopover();
      this.selectedArray[val] = true;
      this.selectedQuantity[val] = 1;
    }
    else{
      this.selectedArray[val] = false;
      this.selectedQuantity[val] = 0;
    }
  }

  Purchase(){
    let check = false;

    for(let i = 0; i < this.selectedArray.length; i++){
      if(this.selectedArray[i]){
        check = true;
        break;
      }
    }

    if(check){
      this.global.purchaseId = 0;

      this.SetSelectedProductProperty();

      this.global.homePageTitle = "PURCHASE";
      this.global.selectedHomeComponent = 4;

      this.modalController.dismiss();
    }
    else{
      this.global.PresentToast("Please select minimum one size", "danger", 2000);
    }
  }

  async PresentPopover() {
    const popover = await this.popoverController.create({
      component: PopOverComponent,
      cssClass: 'my-custom-class',
    });

    return await popover.present();
  }

  SelectedSizeWithQuantity(i){
    if(this.selectedArray[i]){
      return 1;
    }
    else{
      return 0;
    }
  }

  SetSelectedProductProperty(){
    for(let i = 0; i < this.global.selectedProduct.length; i++){
      this.global.selectedProduct.pop();
    }

    this.global.selectedProduct.push(
      {userId: this.userId, image: this.image, name: this.name, size_small: this.size_small, size_medium: this.size_medium, size_large: this.size_large, quantity:this.selectedQuantity}
    );
  }
}