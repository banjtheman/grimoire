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
  public mana_sources: any;
  public current_source = null;


  public pipeline: any;
  public grims: any;
  public projects: any;

  //pipeline vars
  public spell_tomb = {}

  constructor(private http: HttpClient, public magicService: MagicService, public navCtrl: NavController,public utilityService: UtilityService, private file_writer: File,public alertController: AlertController) { }

  ngOnInit() {
    this.project = this.magicService["Data"]["curr_project"]
    console.log(this.project)
    this.getSources()
    this.get_grims()
  }


  getSources() {
    console.log("getting mana sources")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/get_project_mana?project_name="+this.project["name"]



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

  change_mana_type(mtype){
    this.mana_type=mtype

  }


  set_pipeline(val){
    this.pipeline = val
  }

  set_source(val){
    this.current_source = val
    this.spell_tomb["mana_location"] = "mana/"+val["file_name"]
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

  cast_grim(grimID){
    console.log("Going to cast grimID: "+grimID)
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
    
    
    
        var url = this.api_url + "/cast_grim?project_name="+this.project["name"]
        console.log("calling this url: " + url);
    
        this.http.post(url, spells, { headers: headers }).toPromise()
          .then((data) => { // Success
            console.log(data)
            this.mana = data
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



    var url = this.api_url + "/add_csv_mana_source?project_name="+this.project["name"]
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

  clearQueue(){
    if (this.uploader.queue.length >= 1){
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
