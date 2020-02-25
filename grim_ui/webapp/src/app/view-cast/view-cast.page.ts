import { Component, OnInit } from '@angular/core';
import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { environment } from '../../environments/environment';
@Component({
  selector: 'app-view-cast',
  templateUrl: './view-cast.page.html',
  styleUrls: ['./view-cast.page.scss'],
})
export class ViewCastPage implements OnInit {


  dtOptions: DataTables.Settings = {};
  public api_url = environment.api_url


  constructor(private http: HttpClient, public magicService: MagicService, public navCtrl: NavController, public utilityService: UtilityService, public alertController: AlertController) { }

  ngOnInit() {

    if (this.magicService.isBlank){
      console.log("return")
      window.location.href = "/";
    }

  }

  exportToFlask() {
    console.log("Exporting to Flask ")


    //Send post request with spells to backend
    // POST formData to Server
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });



    var url = this.api_url + "/export_flask"
    console.log("calling this url: " + url);

    this.http.post(url, this.magicService['Data']['curr_cast'], { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)


        //refresh casts
        // this.file_name = data["file_name"]

        // this.modalController.dismiss({
        //   'file_upload': this.file_upload,
        //   'file_name': this.file_name,
        // });

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
      })





  }

  

}
