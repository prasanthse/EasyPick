import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { LoginModalComponent } from '../../Components/login-modal/login-modal.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  @Input() menu: MenuController;

  constructor(private global: GlobalService, private modalController: ModalController) { }

  ngOnInit() {}

  SelectMenu(title, index){
    this.global.homePageTitle = title;
    this.global.selectedHomeComponent = index;
    this.menu.close();
  }

  CreateAlert(){
    this.global.CreateAlert("Logout", "Are you sure, you want to logout?", "Yes", "No", this.AlertCancelCallBack, this.AlertConfirmCallBack.bind(this));
  }

  AlertCancelCallBack(){
    console.log('Cancel Alert');
  }

  AlertConfirmCallBack(){
    console.log('Confirm Alert');

    setTimeout(() => {
      this.menu.close();
      this.global.NavigateWithoutParam('');
    }, 500);
  }

  async Login(){
    const modal = await this.modalController.create({
      component: LoginModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'menu': this.modalController
      }
    });

    return await modal.present();
  }
}