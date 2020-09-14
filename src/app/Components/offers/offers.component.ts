import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CRUDService } from '../../crud.service';
import { ViewItemComponent } from '../../Components/view-item/view-item.component';

export interface Offers{
  userId:string;
  name: string,
  image:string;
  size_small: number;
  size_medium: number;
  size_large: number;
  description: string;
  shop: string;
}

export interface User{
  user_name: string;
}

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {

  private offerItemArray: Offers[] = [];
  private isLoading: boolean;

  constructor(private modalController: ModalController, private fbService: CRUDService) { }

  ngOnInit() {
    this.isLoading = true;

    //Load Offers 
    this.fbService.GetAll('Sales').subscribe((data: Offers[]) => {
      for(let i = 0; i < data.length; i++){
        this.offerItemArray = [...data]

        this.fbService.GetById('Items', 'name', data[i].name).subscribe((item: Offers[]) => {
          this.offerItemArray[i].description = item[0].description;
          this.offerItemArray[i].image = item[0].image;
          this.offerItemArray[i].size_large = item[0].size_large;
          this.offerItemArray[i].size_medium = item[0].size_medium;
          this.offerItemArray[i].size_small = item[0].size_small;

          this.fbService.GetById('Users', 'user_id', this.offerItemArray[i].userId).subscribe((user: User[]) => {
            this.offerItemArray[i].shop = user[0].user_name;
          });

          this.fbService.GetImage(this.offerItemArray[i].image).then(img => {
            this.offerItemArray[i].image = img;
          });
        });
      }
    });
  
    //AFTER API CALL FINISHED
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  async SelectOffer(i){
    const modal = await this.modalController.create({
      component: ViewItemComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'userId': this.offerItemArray[i].userId,
        'name': this.offerItemArray[i].name,
        'image': this.offerItemArray[i].image,
        'size_small': this.offerItemArray[i].size_small,
        'size_medium': this.offerItemArray[i].size_medium,
        'size_large': this.offerItemArray[i].size_large,
        'description': this.offerItemArray[i].description,
        'shop': this.offerItemArray[i].shop
      }
    });

    return await modal.present();
  }
}
