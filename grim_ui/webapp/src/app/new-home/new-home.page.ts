import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.page.html',
  styleUrls: ['./new-home.page.scss'],
})
export class NewHomePage implements OnInit {

  public api_url = environment.api_url


  constructor(private http: HttpClient,public magicService: MagicService, public navCtrl: NavController,public utilityService: UtilityService) { }

  ngOnInit() {
    //this.resetGrim()
  }

  resetGrim() {
    console.log("getting spells")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/reset_grim"



    this.http.get(url, { headers: headers }).toPromise()
      .then((data) => { // Success

        console.log("reset grim")

      }, (err) => {
        console.log("problem trying to reset");
        console.log(err);
        //this.utilityService.presentModelAlert("Error try again")
      })



  }

}
