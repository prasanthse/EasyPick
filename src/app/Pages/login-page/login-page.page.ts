import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  isInLoginForm = true;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  CheckUserLoginFormStatus(status){
    this.isInLoginForm = status;
  }

  async PresentToast(messsage) {
    const toast = await this.toastController.create({
      message: messsage,
      color: "warning",
      duration: 2000,
    });
    toast.present();
  }

  Login(){
    this.PresentToast("Login Success!");
  }

  SignUp(){
    this.PresentToast("Registered Successfully!");
  }
}
