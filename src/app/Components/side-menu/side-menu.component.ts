import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../global.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  @Input() menu: MenuController;

  constructor(private global: GlobalService) { }

  ngOnInit() {}

  SelectMenu(title, index){
    this.global.homePageTitle = title;
    this.global.selectedHomeComponent = index;
    this.menu.close();
  }

  CreateAlert(){
    this.global.CreateAlert("Logout", "Are you sure, you want to logout?", "Yes", "No", this.AlertCancelCallBack, this.AlertConfirmCallBack);
  }

  AlertCancelCallBack(){
    console.log('Cancel Alert');
  }

  AlertConfirmCallBack(){
    console.log('Confirm Alert');

    setTimeout(() => {
      this.global.NavigateWithoutParam('/login');
    }, 500);
  }
}
