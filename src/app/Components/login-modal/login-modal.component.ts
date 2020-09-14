import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';

export interface UserInfo{
  user_Id: string,
  user_name: string,
  shop: boolean
}

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

  constructor(private global: GlobalService, public auth: AngularFireAuth, private fbService: CRUDService) { }

  ngOnInit() {
    this.category = "customer";
    this.isShop = false;
  }

  async Login(){
    try{
      let emailFormat = this.userName + "@easypick.com";
      const response = await this.auth.signInWithEmailAndPassword(emailFormat, this.password);

      this.global.userName = this.userName;
      this.global.userId = response.user.uid;
      this.global.isGuest = false;

      this.fbService.GetById('Users', 'user_id', response.user.uid).subscribe((res: UserInfo[]) => {
        this.global.isShop = res[0].shop;
      });

      //API CALL FOR CART COUNT
      this.fbService.GetById('Cart', 'userId', this.global.userId).subscribe(data => {
        this.global.cartCount = data.length;
      });
      
      this.userName = "";
      this.password = "";
  
      this.global.PresentToast("Login Success!", "success", 2000);
      this.Close();
    }
    catch(err){
      console.dir(err);

      if(err.code == "auth/user-not-found") this.global.PresentToast("Incorrect username or password", "danger", 2000);
      else if (err.code == "auth/wrong-password") this.global.PresentToast("Incorrect password!", "danger", 2000);
      else if(err.code == "auth/network-request-failed") this.global.PresentToast("Network disconnected!", "danger", 2000);
      else if(err.code == "auth/argument-error") this.global.PresentToast("Password must be a valid", "danger", 2000);
    }
  }

  SelectCategory(status){
    this.isShop = status;
  }

  async SignUp(){
    if(this.registerUserName == undefined || this.registerUserName.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Fill User name field", "danger", 2000);
    }
    else if(this.registerPasswordOne == undefined || this.registerPasswordOne.replace(/\s/g, "").length <= 0 || this.registerPasswordTwo == undefined || this.registerPasswordTwo.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Fill all the Password Fields", "danger", 2000);
    }
    else{
      if(this.registerPasswordOne == this.registerPasswordTwo){
        try{
          let emailFormat = this.registerUserName + "@easypick.com";
          const response = await this.auth.createUserWithEmailAndPassword(emailFormat, this.registerPasswordOne);

          let data = {
            user_id: response.user.uid,
            user_name: this.registerUserName,
            shop: this.isShop
          };

          //STORE DATA
          this.fbService.Add('Users', data);

          this.global.userName = this.registerUserName;
          this.global.userId = response.user.uid;
          this.global.isShop = this.isShop;
          this.global.isGuest = false;

          //RESET
          this.registerUserName = "";
          this.registerPasswordOne = "";
          this.registerPasswordTwo = "";

          this.global.PresentToast("Register Success!", "success", 2000);
          this.Close();
        }
        catch(err){
          console.dir(err);

          if(err.code == "auth/weak-password") this.global.PresentToast("Password should be atleat 6 characters", "danger", 2000);
          else if(err.code == "auth/network-request-failed") this.global.PresentToast("Network disconnected!", "danger", 2000);
          else if(err.code == "auth/email-already-in-use") this.global.PresentToast("Already Registered!", "danger", 2000);
        }
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
