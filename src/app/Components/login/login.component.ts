import { Component, OnInit } from '@angular/core';

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  public userName: string;
  public password: string;

  constructor(private global: GlobalService, public auth: AngularFireAuth, private fbService: CRUDService) { }

  ngOnInit() {}

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
      
      this.userName = "";
      this.password = "";
  
      this.global.PresentToast("Login Success!", "success", 2000);
      this.global.NavigateWithoutParam('/home');
    }
    catch(err){
      console.dir(err);

      if(err.code == "auth/user-not-found") this.global.PresentToast("Incorrect username or password", "danger", 2000);
      else if (err.code == "auth/wrong-password") this.global.PresentToast("Incorrect password!", "danger", 2000);
      else if(err.code == "auth/network-request-failed") this.global.PresentToast("Network disconnected!", "danger", 2000);
      else if(err.code == "auth/argument-error") this.global.PresentToast("Password must be a valid", "danger", 2000);
    }
  }
}