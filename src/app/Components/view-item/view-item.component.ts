import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { PopOverComponent } from '../pop-over/pop-over.component';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() image: string;
  @Input() size: string[];
  @Input() unitPrice: number[]; 
  @Input() description: string;

  private selectedArray: boolean[] = [];
  private selectedSizes: string[] = [];
  private selectedPrices: number[] = [];

  constructor(private modalController: ModalController, private global: GlobalService, private popoverController: PopoverController) { }

  ngOnInit() {
    for(let i = 0; i < this.selectedArray.length; i++){
      this.selectedArray.pop();
    }

    for(let i = 0; i < this.size.length; i++){
      this.selectedArray.push(false);
    }
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

    if(check){
      //Need to Call API
      this.SetSelectedProductProperty();

      this.global.cartCount++;
      this.global.PresentToast("Added to Cart!", "success", 2000);
    }
    else{
      this.global.PresentToast("Please select minimum one size", "danger", 2000);
    }
  }

  SelectItemSizes(val){
    if(!this.selectedArray[val]){
      this.PresentPopover();
      this.selectedArray[val] = true;
    }
    else{
      this.selectedArray[val] = false;
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

  SelectedSizeAndPrice(){

    for(let i = 0; i < this.selectedSizes.length; i++){
      this.selectedSizes.pop();
      this.selectedPrices.pop();
    }

    for(let i = 0; i < this.selectedArray.length; i++){
      if(this.selectedArray[i]){
        this.selectedSizes.push(this.size[i]);
        this.selectedPrices.push(this.unitPrice[i]);
      }
    }
  }

  SetSelectedProductProperty(){
    for(let i = 0; i < this.global.selectedProduct.length; i++){
      this.global.selectedProduct.pop();
    }

    this.SelectedSizeAndPrice();

    this.global.selectedProduct.push(
      {id: this.id, image: this.image, name: this.name, size: this.selectedSizes, unitPrice: this.selectedPrices, quantity: [1]}
    );
  }
}