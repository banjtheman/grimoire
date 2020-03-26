import { Component, OnInit } from '@angular/core';
import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'
import { ModalController, NavController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-conjure',
  templateUrl: './conjure.page.html',
  styleUrls: ['./conjure.page.scss'],
})
export class ConjurePage implements OnInit {

  public api_url = environment.api_url
  public spell_mode = "conjure"
  public conjure_type: any;
  public spells: any;
  public new_grim = [];
  public new_grim_name: any;
  public new_grim_desc: any;
  public spells_dict = {}
  public spells: any;


  constructor(private http: HttpClient, public magicService: MagicService, public navCtrl: NavController, public utilityService: UtilityService, public alertController: AlertController) { }

  ngOnInit() {
    this.getSpells()
  }

  inNewGrim(spell){
    var spell_key = spell["spell_type"]+"_"+spell["spell_name"]
    var index = this.new_grim.indexOf(spell_key)

    if (index == -1){
      return false
    } else {
      return true
    }

  }

  getSpells() {
    console.log("getting spells")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/get_spells"



    this.http.get(url, { headers: headers }).toPromise()
      .then((data) => { // Success

        console.log("got spells")

        this.spells = data["spells"]
        console.log(this.spells)

        //fill up spell_dict
        this.spells.forEach((spell) => {
          
          var spell_dict_key = spell["spell_type"]+"_"+spell["spell_name"]
          this.spells_dict[spell_dict_key] = spell

        });
        

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
        this.utilityService.presentModelAlert("Error try again")
      })



  }
  change_conjure_type(ctype) {
    this.conjure_type = ctype

  }

  removeFromGrim(spell){
    var spell_key = spell["spell_type"]+"_"+spell["spell_name"]
    var index = this.new_grim.indexOf(spell_key)
    this.new_grim.splice(index,1)
  }


  addToGrim(spell){
    var spell_key = spell["spell_type"]+"_"+spell["spell_name"]
    this.new_grim.push(spell_key)
  }

  createGrim(){

    console.log("Creating grim")

    //Send post request with spells to backend
    // POST formData to Server
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var grim_spells = []

    this.new_grim.forEach((spell) => { 
      grim_spells.push(this.spells_dict[spell])
    });


    var grim_data = {}
    grim_data["name"] = this.new_grim_name
    grim_data["value"] = this.new_grim_desc
    grim_data["spells"] = grim_spells

    var url = this.api_url + "/create_grim"
    console.log("calling this url: " + url);

    this.http.post(url, grim_data, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)
        this.showResults = true
        this.results = data

        //refresh grims
        //this.get_grims()

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
      })



  }

}
