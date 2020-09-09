import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';
import { CartComponent } from '../../Components/cart/cart.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  private isSideMenuOpen: any;

  constructor(
    private menu: MenuController, 
    private global: GlobalService, 
    private modalController: ModalController,
    private fbService: CRUDService
  ) { }

  ngOnInit() {
    this.isSideMenuOpen = false;
    
    this.global.homePageTitle = "HOME";
    this.global.selectedHomeComponent = 0;

    if(this.global.isGuest){  
      this.global.cartCount = 0;
    }
    else{
      //API CALL FOR CART COUNT
      this.fbService.GetById('Cart', 'userId', this.global.userId).subscribe(data => {
        this.global.cartCount = data.length;
      });
    }
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
    });

    return await modal.present();
  }
}
