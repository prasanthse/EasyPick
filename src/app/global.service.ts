import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

export interface Product{
  userId:string;
  name: string,
  image:string;
  size_small: number;
  size_medium: number;
  size_large: number;
  quantity: number[];
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public userName: string;
  public userId: string;
  public isShop: boolean;
  public isGuest: boolean;

  public homePageTitle: string;
  public selectedHomeComponent: number;
  public cartCount: number;
  public appVersion: string;

  public categoryName: string;

  public selectedProduct: Product[] = [];
  public purchaseId: number;

  public shipping: number;
  public tax: number;

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

  public NavigateWithParam(path, test){
    this.router.navigate([path, test]); 
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
