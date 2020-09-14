import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  private userName: string;
  private passwordOne: string;
  private passwordTwo: string;
  private isShop: boolean;
  private category: any;

  constructor(private global: GlobalService, public auth: AngularFireAuth, private fbService: CRUDService) { }

  ngOnInit() {
    this.category = "customer";
    this.isShop = false;
  }

  SelectCategory(status){
    this.isShop = status;
  }

  async SignUp(){
    if(this.userName == undefined || this.userName.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Fill User name field", "danger", 2000);
    }
    else if(this.passwordOne == undefined || this.passwordOne.replace(/\s/g, "").length <= 0 || this.passwordTwo == undefined || this.passwordTwo.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Fill all the Password Fields", "danger", 2000);
    }
    else{
      if(this.passwordOne == this.passwordTwo){

        try{
          let emailFormat = this.userName + "@easypick.com";
          const response = await this.auth.createUserWithEmailAndPassword(emailFormat, this.passwordOne);

          let data = {
            user_id: response.user.uid,
            user_name: this.userName,
            shop: this.isShop
          };

          //STORE DATA
          this.fbService.Add('Users', data);

          this.global.userName = this.userName;
          this.global.userId = response.user.uid;
          this.global.isShop = this.isShop;
          this.global.isGuest = false;
          this.global.cartCount = 0;

          //RESET
          this.userName = "";
          this.passwordOne = "";
          this.passwordTwo = "";
          
          this.global.PresentToast("Register Success!", "success", 2000);
          this.global.NavigateWithoutParam('/home');
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
}