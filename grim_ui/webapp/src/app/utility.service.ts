import { Injectable } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public navCtrl: NavController, private http: HttpClient, public modalController: ModalController, public loadingCtrl: LoadingController, public alertController: AlertController) { }


  navURL(loc){
    this.navCtrl.navigateForward(loc)
  }

  async presentModelAlert(error) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Computing...'
    });
    await loading.present();
  }

  async dismissLoading() {
    this.loadingCtrl.dismiss()
  }
}
