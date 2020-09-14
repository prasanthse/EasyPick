import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';
import { ViewItemComponent } from '../../Components/view-item/view-item.component';

export interface Product{
  userId: string;
  name: string;
  image: string;
  description: string;
  size_small: number;
  size_medium: number;
  size_large: number;
  shop: string;
}

export interface User{
  user_name: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  private itemArray: Product[];
  private isLoading: boolean;

  constructor(private global: GlobalService, private modalController: ModalController, private fbService: CRUDService) { }

  ngOnInit() {
    this.isLoading = true;

    //API CALL AND LOAD DATA HERE
    this.fbService.GetById('Items', 'category', this.global.categoryName).subscribe((data: Product[]) => {
      this.itemArray = [...data];

      for(let i = 0; i < this.itemArray.length; i++){
        this.fbService.GetImage(this.itemArray[i].image).then(img => {
          this.itemArray[i].image = img;
        });

        this.fbService.GetById('Users', 'user_id', this.itemArray[i].userId).subscribe((user: User[]) => {
          this.itemArray[i].shop = user[0].user_name;
        });
      }
    });

    //AFTER API CALL FINISHED
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  async ViewItem(i){
    const modal = await this.modalController.create({
      component: ViewItemComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'userId': this.itemArray[i].userId,
        'name': this.itemArray[i].name,
        'image': this.itemArray[i].image,
        'size_small': this.itemArray[i].size_small,
        'size_medium': this.itemArray[i].size_medium,
        'size_large': this.itemArray[i].size_large,
        'description': this.itemArray[i].description,
        'shop': this.itemArray[i].shop
      }
    });

    return await modal.present();
  }

  DismissModel(){
    this.modalController.dismiss();
  }
}
