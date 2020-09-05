import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  public userName: string;
  public password: string;

  constructor(private global: GlobalService, public auth: AngularFireAuth) { }

  ngOnInit() {}

  async Login(){
    try{
      let emailFormat = this.userName + "@easypick.com";
      const response = await this.auth.signInWithEmailAndPassword(emailFormat, this.password);

      console.log(response)

      this.global.userName = "Prasanth";
      this.global.userId = "123";
      this.global.isShop = true;
      this.global.isGuest = false;
      
      this.userName = "";
      this.password = "";
  
      this.global.PresentToast("Login Success!", "success", 2000);
      this.global.NavigateWithoutParam('/home');
    }
    catch(err){
      console.dir(err);
      if(err.code == "auth/user-not-found"){
        this.global.PresentToast("Incorrect username or password", "danger", 2000);
      }
      else if (err.code == "auth/wrong-password"){
        this.global.PresentToast("Incorrect password!", "danger", 2000);
      }
    }
  }
}