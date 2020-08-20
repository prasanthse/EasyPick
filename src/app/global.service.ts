import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private toastController: ToastController, private router: Router) { }

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
}
