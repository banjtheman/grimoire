import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //should get from env
  public api_url = "http://localhost:9000"
  public health: any;

  constructor(private http: HttpClient, public modalController: ModalController, public loadingCtrl: LoadingController, public alertController: AlertController) {



    this.healthCheck()

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


  healthCheck() {
    console.log("health check")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/health"



    this.http.get(url, { headers: headers }).toPromise()
    .then((data) => { // Success
      console.log(data)
      this.health = data

    }, (err) => {
      console.log("ok we should back out");
      console.log(err);
      this.presentModelAlert("Error try again")
    })



  }

}
