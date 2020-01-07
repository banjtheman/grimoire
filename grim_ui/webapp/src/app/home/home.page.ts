import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { ModalController, NavController } from '@ionic/angular';

import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { File } from '@ionic-native/file/ngx';

import { NewProjectPage } from '../new-project/new-project.page'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [File]
})
export class HomePage {

  //should get from env
  public api_url = environment.api_url
  public health: any;

  public projectName: any;
  public mana_type: any;

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public mana: any;
  public pipeline: any;
  public grims: any;
  public projects: any;

  //pipeline vars
  public spell_tomb = {}



  constructor(private http: HttpClient, private file_writer: File, public modalController: ModalController, public loadingCtrl: LoadingController, public alertController: AlertController) {



    this.healthCheck()
    this.get_grims()
    this.getProjects()

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
      this.health = data["healthy"]

    }, (err) => {
      console.log("ok we should back out");
      console.log(err);
      this.presentModelAlert("Error try again")
    })



  }

  async newProject() {
    console.log('New Project clicked');

    const modal = await this.modalController.create({
      component: NewProjectPage
    });
    return await modal.present();



  }


  getProjects() {
    console.log("gettign projects")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/get_projects"



    this.http.get(url, { headers: headers }).toPromise()
    .then((data) => { // Success
      console.log(data)
      this.projects = data["projects"]
      console.log(this.projects)

    }, (err) => {
      console.log("ok we should back out");
      console.log(err);
      this.presentModelAlert("Error try again")
    })



  }

  keys(obj) {
    return Object.keys(obj); // good old javascript on the rescue
  }
  
  values(obj) {
    return Object.values(obj); // good old javascript on the rescue
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
      this.presentModelAlert("Error try again")
    })



  }


  createProject() {
    console.log("create project")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/create_project?project_name="+this.projectName



    this.http.get(url, { headers: headers }).toPromise()
    .then((data) => { // Success
      console.log(data)
      //this.health = data["healthy"]

    }, (err) => {
      console.log("ok we should back out");
      console.log(err);
      this.presentModelAlert("Error try again")
    })



  }


  addManaSource() {
    console.log("add mana source")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/add_mana_source?project_name="+this.projectName



    this.http.get(url, { headers: headers }).toPromise()
    .then((data) => { // Success
      console.log(data)
      //this.health = data["healthy"]

    }, (err) => {
      console.log("ok we should back out");
      console.log(err);
      this.presentModelAlert("Error try again")
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



    var url = this.api_url + "/add_csv_mana_source?project_name="+this.projectName
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

      }, (err) => {
        console.log("ok we should back out");
        console.log(err);
      })



  }

  clearQueue(){
    if (this.uploader.queue.length >= 1){
      this.uploader.queue[0].remove()
    }
    
  }

  set_pipeline(val){
    this.pipeline = val
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
    
    
    
        var url = this.api_url + "/cast_grim?project_name="+this.projectName
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



  getFiles(): FileLikeObject[] {
    
    return this.uploader.queue.map((fileItem) => {
      console.log(fileItem)
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  reorderFiles(reorderEvent: CustomEvent): void {
    let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  submitCSV() {
    console.log("uploading file")
    this.upload()
    console.log("upload finished")
  }

}
