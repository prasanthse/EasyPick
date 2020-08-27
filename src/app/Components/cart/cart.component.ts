import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface CartItem{
  id:string;
  name: string,
  image:string;
  quantity: number;
  size: string;
  unitPrice: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  @Input() userId: string;
  
  cartItemArray: CartItem[];
  private isLoading: boolean;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.isLoading = true;

    //API CALL AND LOAD DATA HERE
    this.cartItemArray = [
      {id: "0", name: "Item 01", image: "assets/Images/Cart/C1.jpg", quantity: 1, size: "medium", unitPrice: 100},
      {id: "1", name: "Item 02", image: "assets/Images/Cart/C2.jpg", quantity: 2, size: "medium", unitPrice: 80},
      {id: "2", name: "Item 03", image: "assets/Images/Cart/C3.jpg", quantity: 1, size: "medium", unitPrice: 36},
      {id: "3", name: "Item 04", image: "assets/Images/Cart/C4.png", quantity: 3, size: "medium", unitPrice: 94},
      {id: "4", name: "Item 05", image: "assets/Images/Cart/C5.png", quantity: 1, size: "medium", unitPrice: 123}
    ];

    //AFTER API CALL FINISHED
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  DismissModel(){
    this.modalController.dismiss();
  }

  CalculateTotalPricePerItem(){

  }
}