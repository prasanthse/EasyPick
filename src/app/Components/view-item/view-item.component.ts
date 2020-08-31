import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';

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

  constructor(private modalController: ModalController, private global: GlobalService) { }

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
      this.global.cartCount++;
      this.global.PresentToast("Added to Cart!", "success", 2000);
    }
    else{
      this.global.PresentToast("Please select minimum one size", "danger", 2000);
    }
  }

  SelectItemSizes(val){
    if(!this.selectedArray[val]) this.selectedArray[val] = true;
    else this.selectedArray[val] = false;
  }

  Purchase(){

  }
}
