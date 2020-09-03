import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  public userName: string;
  public password: string;

  constructor(private global: GlobalService) { }

  ngOnInit() {}

  Login(){
    //API Call for login
    if(this.userName == "prasanth" && this.password == "123"){
      this.global.userName = "Prasanth";
      this.global.userId = "123";
      this.global.isShop = true;
      this.global.isGuest = false;

      this.userName = "";
      this.password = "";
  
      this.global.PresentToast("Login Success!", "success", 2000);
      this.global.NavigateWithoutParam('/home');
    }
    else{
      this.global.PresentToast("Incorrect username or password", "danger", 2000);
    }
  }
}