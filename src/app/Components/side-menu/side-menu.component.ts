import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  private userName: string;
  private isShop: boolean;

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.userName = "Prasanth";
    this.isShop = true;
  }

  SelectMenu(title){
    this.global.homePageTitle = title;
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
