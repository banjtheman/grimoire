import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-grim-view',
  templateUrl: './grim-view.page.html',
  styleUrls: ['./grim-view.page.scss'],
})
export class GrimViewPage implements OnInit {
  public grim: any;
  public api_url = environment.api_url
  public streamlit_url = environment.streamlit_url
  public showTest = false

  constructor(public magicService: MagicService, public navCtrl: NavController,public utilityService: UtilityService,private http: HttpClient) { }

  ngOnInit() {
    if (this.magicService.isBlank){
      console.log("return")
      window.location.href = "/";
    }


    this.grim = this.magicService["Data"]["curr_grim"]
  }

  getSpellImage(spell){
    let possible_path = "../../assets/spell_images/"+spell["spell_type"]+"/"+spell["spell_name"]+".png"
    return possible_path
  }

  ionViewDidEnter(){
    this.castTestGrim(this.grim)
  }

  castTestGrim(grim){
    console.log("Going to test cast grim " + grim["name"])


    //Send post request with spells to backend
    // POST formData to Server
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });


    var url = this.api_url + "/launch_test_grim"
    console.log("calling this url: " + url);

    this.http.post(url, grim, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)
        this.showTest = true
        //open new url
        //window.open(this.streamlit_url, '_blank');
      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
      })
  }


  castGrim(grim){
    console.log("Going to cast grim " + grim["name"])


    //Send post request with spells to backend
    // POST formData to Server
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });


    var url = this.api_url + "/launch_grim"
    console.log("calling this url: " + url);

    this.http.post(url, grim, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)
        //open new url
        window.open(this.streamlit_url, '_blank');
      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
      })
  }

}
