import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public homePageTitle: string;
  public selectedHomeComponent: number;

  constructor(private toastController: ToastController, private router: Router, private alertController: AlertController) { }

  //TOAST
  async PresentToast(messsage, color, time) {

    const toast = await this.toastController.create({
      message: messsage,
      color: color,
      duration: time,
      position: 'bottom'
    });

    toast.present();
  }

  //NAVIGATION
  public NavigateWithoutParam(path){
    this.router.navigate([path]); 
  }

  //ALERT
  async CreateAlert(header, message, positiveText, negativeText, CancelCallBack, ConfirmCallBack) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: negativeText,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            CancelCallBack();
          }
        }, {
          text: positiveText,
          handler: () => {
            ConfirmCallBack();
          }
        }
      ]
    });

    await alert.present();
  }
}
