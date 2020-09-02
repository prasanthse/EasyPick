import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { ViewItemComponent } from '../../Components/view-item/view-item.component';

export interface Product{
  id: string;
  name: string;
  image: string;
  size: string[];
  unitPrice: number[];
  description: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  private itemArray: Product[];
  private isLoading: boolean;

  constructor(private global: GlobalService, private modalController: ModalController) { }

  ngOnInit() {
    this.isLoading = true;

    //API CALL AND LOAD DATA HERE
    this.itemArray = [
      {id: "0", name: "Item 01", image: "assets/Images/Recommendations/R1.jpg", size: ["small", "large"], unitPrice: [255, 550], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"},
      {id: "1", name: "Item 02", image: "assets/Images/Recommendations/R2.jpg", size: ["small", "medium"], unitPrice: [255, 388], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"},
      {id: "2", name: "Item 03", image: "assets/Images/Recommendations/R3.jpg", size: ["large"], unitPrice: [550], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"},
      {id: "3", name: "Item 04", image: "assets/Images/Recommendations/R4.jpg", size: ["medium", "large"], unitPrice: [388, 550], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"},
      {id: "4", name: "Item 05", image: "assets/Images/Recommendations/R5.jpg", size: ["small", "medium", "large"], unitPrice: [255, 388, 550], description: "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application"}
    ];

    //AFTER API CALL FINISHED
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  async ViewItem(id, name, image, size, unitPrice, description){
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

  DismissModel(){
    this.modalController.dismiss();
  }
}
