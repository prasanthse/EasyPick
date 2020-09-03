import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  isInLoginForm = true;

  constructor(private global: GlobalService) { }

  ngOnInit() {
  }

  CheckUserLoginFormStatus(status){
    this.isInLoginForm = status;
  }

  VisitAsGuest(){
    this.global.userName = "Guest";
    this.global.userId = "123";
    this.global.isShop = false;
    this.global.isGuest = true;

    this.global.NavigateWithoutParam('/home');
  }
}
