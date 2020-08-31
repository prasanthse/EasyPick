import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GlobalService } from '../../global.service';
import { ModalController } from '@ionic/angular';

import { CartComponent } from '../../Components/cart/cart.component';
import { ViewItemComponent } from '../../Components/view-item/view-item.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  private isSideMenuOpen: any;
  private cartCount: number;

  private testSize: string[] = ["small", "medium", "large"];
  private testPrice: number[] = [255, 388, 550];

  constructor(
    private menu: MenuController, 
    private global: GlobalService, 
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.isSideMenuOpen = false;
    
    this.global.homePageTitle = "HOME";
    this.global.selectedHomeComponent = 0;

    //API CALL FOR CART COUNT
    this.global.cartCount = 5;
  }

  HandleSideMenu() {
    if(!this.isSideMenuOpen){
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }
    else{
      this.menu.close();
    }
  }

  SideMenuResetProperty(){
    this.isSideMenuOpen = false;
  }

  SideMenuActiveProperty(){
    this.isSideMenuOpen = true;
  }

  async OpenCart() {
    const modal = await this.modalController.create({
      component: CartComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'userId': "ABC123"
      }
      // component: ViewItemComponent,
      // cssClass: 'my-custom-class',
      // componentProps: {
      //   'id': "ABC123",
      //   'name': "Lipstick",
      //   'image': "assets/Images/Recommendations/R1.jpg",
      //   'size': this.testSize,
      //   'unitPrice': this.testPrice,
      //   'description': "Many colors and types of lipstick exist. Some lipsticks are also lip balms, to add both color and hydration. Although the name originally applied to the baton (stick) of material, within a tubular container, usually around 10mm in diameter and 50mm in length the term now generally relate to the material itself, regardless of method of application."
      // }
    });

    return await modal.present();
  }
}
