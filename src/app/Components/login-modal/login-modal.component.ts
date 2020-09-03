import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {

  @Input() menu: ModalController;

  //Login
  public userName: string;
  public password: string;

  //Signup
  private registerUserName: string;
  private registerPasswordOne: string;
  private registerPasswordTwo: string;
  private isShop: boolean;
  private category: any;

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.category = "customer";
    this.isShop = false;
  }

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
      this.Close();
    }
    else{
      this.global.PresentToast("Incorrect username or password", "danger", 2000);
    }
  }

  SelectCategory(status){
    this.isShop = status;
  }

  SignUp(){
    if(this.registerUserName == undefined || this.registerUserName.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Fill User name field", "danger", 2000);
    }
    else if(this.registerPasswordOne == undefined || this.registerPasswordOne.replace(/\s/g, "").length <= 0 || this.registerPasswordTwo == undefined || this.registerPasswordTwo.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Fill all the Password Fields", "danger", 2000);
    }
    else{
      if(this.registerPasswordOne == this.registerPasswordTwo){
        //API Call for login
        this.global.userName = this.registerUserName;
        this.global.userId = "123";
        this.global.isShop = this.isShop;
        this.global.isGuest = false;

        //RESET
        this.registerUserName = "";
        this.registerPasswordOne = "";
        this.registerPasswordTwo = "";
        
        this.global.PresentToast("Register Success!", "success", 2000);
        this.Close();
      }
      else{
        this.global.PresentToast("Passwords are not matching", "danger", 2000);
      }
    }
  }

  Close(){
    this.menu.dismiss();
  }
}
