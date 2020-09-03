import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ViewItemComponent } from '../../Components/view-item/view-item.component';

export interface Offers{
  id:string;
  name: string,
  image:string;
  quantity: number;
  size: string[];
  unitPrice: number[];
  description: string;
}

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {

  private offerItemArray: Offers[] = [];
  private isLoading: boolean;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.isLoading = true;

    //API CALL AND LOAD DATA HERE
    this.offerItemArray = [
      {id: "0", name: "Item 01", image: "assets/Images/Sale/Sale1.jpg", quantity: 1, size: ["small", "medium"], unitPrice: [100, 250], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"},
      {id: "1", name: "Item 02", image: "assets/Images/Sale/Sale2.jpg", quantity: 2, size: ["medium"], unitPrice: [80], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"},
      {id: "2", name: "Item 03", image: "assets/Images/Sale/Sale3.jpg", quantity: 1, size: ["small", "medium", "Large"], unitPrice: [36, 120, 360], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"},
      {id: "3", name: "Item 04", image: "assets/Images/Sale/Sale4.jpg", quantity: 3, size: ["small", "medium"], unitPrice: [94, 350], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"},
      {id: "4", name: "Item 05", image: "assets/Images/Sale/Sale5.jpg", quantity: 1, size: ["Large"], unitPrice: [123], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"}
    ];

    //AFTER API CALL FINISHED
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  async SelectOffer(id, name, image, size, unitPrice, description){
    const modal = await this.modalController.create({
      component: ViewItemComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': id,
        'name': name,
        'image': image,
        'size': size,
        'unitPrice': unitPrice,
        'description': description
      }
    });

    return await modal.present();
  }
}
