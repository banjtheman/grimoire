import { Component, OnInit } from '@angular/core';
import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { File } from '@ionic-native/file/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-project-mana',
  templateUrl: './project-mana.page.html',
  styleUrls: ['./project-mana.page.scss'],
  providers: [File]
})
export class ProjectManaPage implements OnInit {

  public mana_type: any;
  public uploader: FileUploader = new FileUploader({});
  public api_url = environment.api_url
  public project: any
  public mana: any;
  public casts: any;
  public mana_sources: any;
  public current_source = null;


  public pipeline: any;
  public grims: any;
  public projects: any;
  public results: any
  public showResults = false
  public showCasts = false

  public spell_mode = "cast"
  public conjure_type: any;
  public spells: any;
  public new_grim = [];
  public new_grim_name: any;
  public new_grim_desc: any;
  public spells_dict = {}

  dtOptions: DataTables.Settings = {};

  //pipeline vars
  public spell_tomb = {}

  constructor(private http: HttpClient, public magicService: MagicService, public navCtrl: NavController, public utilityService: UtilityService, private file_writer: File, public alertController: AlertController) {

    this.dtOptions = {
      pageLength: 20
    };
   }

   segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.spell_mode = ev["detail"]["value"]
    console.log(this.spell_mode)
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

    var url = this.api_url + "/create_grim?project_name=" + this.project["name"]
    console.log("calling this url: " + url);

    this.http.post(url, grim_data, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)
        this.showResults = true
        this.results = data

        //refresh grims
        this.get_grims()

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
      })



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

  removeFromGrim(spell){
    var spell_key = spell["spell_type"]+"_"+spell["spell_name"]
    var index = this.new_grim.indexOf(spell_key)
    this.new_grim.splice(index,1)
  }

  addToGrim(spell){
    var spell_key = spell["spell_type"]+"_"+spell["spell_name"]
    this.new_grim.push(spell_key)
  }

  ngOnInit() {
    if (this.magicService.isBlank){
      console.log("return")
      window.location.href = "/";
    }


    this.project = this.magicService["Data"]["curr_project"]
    console.log(this.project)
    this.getSources()
    this.get_grims()
    this.get_spells()
    this.getCasts()
  }

  viewCast(cast){
    console.log("viewing cast")
    console.log(cast)

    //change to cast page, set current cast to cast
    this.magicService["Data"]["curr_cast"] = cast
    this.navCtrl.navigateForward("/view-cast");

  }


  getCasts() {
    console.log("getting casts")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/get_casts?project_name=" + this.project["name"]



    this.http.get(url, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)
        this.casts = data["casts"]
        console.log(this.casts)

        // $('#cast_table').DataTable().clear();
        // $('#cast_table').DataTable().destroy();
        this.showCasts = true
        // $('#cast_table').DataTable().draw()

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
        this.utilityService.presentModelAlert("Error try again")
      })



  }


  getSources() {
    console.log("getting mana sources")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/get_project_mana?project_name=" + this.project["name"]



    this.http.get(url, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)
        this.mana_sources = data["sources"]
        console.log(this.mana_sources)

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
        this.utilityService.presentModelAlert("Error try again")
      })



  }

  change_mana_type(mtype) {
    this.mana_type = mtype

  }

  change_conjure_type(ctype) {
    this.conjure_type = ctype

  }


  set_pipeline(val) {
    this.pipeline = val
  }

  set_source(val) {
    this.current_source = val
    console.log(val)
    this.spell_tomb["mana_location"] = "mana/" + val["file_name"]
  }

  get_grims() {
    console.log("getting grims")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/get_grims"



    this.http.get(url, { headers: headers }).toPromise()
      .then((data) => { // Success

        this.grims = data["grims"]
        console.log(this.grims)

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
        this.utilityService.presentModelAlert("Error try again")
      })



  }

  get_spells() {
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

  cast_grim(grimID) {
    console.log("Going to cast grimID: " + grimID)
    console.dir(this.grims[grimID])
    console.log("Got this spell tomb")
    console.dir(this.spell_tomb)

    //We want to update grim with the new spell tomb
    let spells = this.grims[grimID]

    //update the first spell inputs with new data
    spells["spells"][0]["spell_inputs"] = this.spell_tomb


    console.log("Here is updated spell tomb")
    console.dir(spells)

    //Send post request with spells to backend
    // POST formData to Server
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });



    var url = this.api_url + "/cast_grim?project_name=" + this.project["name"]+"&mana="+this.current_source["file_name"]
    console.log("calling this url: " + url);

    this.http.post(url, spells, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)
        this.showResults = true
        this.results = data

        //refresh casts
        this.getCasts()
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



  upload() {



    let files = this.getFiles();

    console.log(files);

    console.log(files[0].type)
    if (files[0].type != "text/csv") {
      this.presentAlert()
      return;
    }

    let formData = new FormData();
    formData.append('somekey', 'some value') // Add any other data you want to send

    files.forEach((file) => {
      formData.append('file_data', file.rawFile, file.name)
    });

    console.log(formData)

    // POST formData to Server
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });



    var url = this.api_url + "/add_csv_mana_source?project_name=" + this.project["name"]
    console.log("calling this url: " + url);

    this.http.post(url, formData, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data)
        this.mana = data
        // this.file_name = data["file_name"]

        // this.modalController.dismiss({
        //   'file_upload': this.file_upload,
        //   'file_name': this.file_name,
        // });

        this.getSources()

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
      })



  }
  //File upload functions!!!
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Must upload valid csv file',
      buttons: ['OK']
    });

    await alert.present();
  }

  clearQueue() {
    if (this.uploader.queue.length >= 1) {
      this.uploader.queue[0].remove()
    }

  }

  getFiles(): FileLikeObject[] {

    return this.uploader.queue.map((fileItem) => {
      console.log(fileItem)
      return fileItem.file;
    });
  }


  submitCSV() {
    console.log("uploading file")
    this.upload()
    console.log("upload finished")
  }

}
