import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { ModalController, NavController } from '@ionic/angular';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { File } from '@ionic-native/file/ngx';

import { NewProjectPage } from '../new-project/new-project.page'
import { environment } from '../../environments/environment';

import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'

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



  constructor(public magicService: MagicService , public navCtrl: NavController, private http: HttpClient, private file_writer: File, public modalController: ModalController, public loadingCtrl: LoadingController, public alertController: AlertController, public utilityService: UtilityService) {

    this.healthCheck()
    this.getProjects()
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
      this.utilityService.presentModelAlert("Error try again")
    })



  }
  async deleteProjectAlertConfirm(project) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete Project?',
      animated: true,
      cssClass: "alertbox",
      mode: "ios",
      message: project["name"] + " will be deleted!!!",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteProject(project)
          }
        }
      ]
    });

    await alert.present();
  }

  deleteProject(project) {
    console.log("delete project")

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var url = this.api_url + "/delete_project?project_name="+project["name"]



    this.http.delete(url, { headers: headers }).toPromise()
    .then((data) => { // Success
      console.log(data)
      this.utilityService.presentModelAlert("Project Deleted")
      this.getProjects()

    }, (err) => {
      console.log("ok we should back out");
      console.log(err);
      this.utilityService.presentModelAlert("Error try again")
    })



  }

  async newProject() {
    console.log('New Project clicked');

    const modal = await this.modalController.create({
      component: NewProjectPage
    });
    modal.onDidDismiss().then((data) => {
      this.getProjects()
    })

    return await modal.present();
  }

  viewProject(project) {
    console.log("going to project page")
    this.magicService["Data"]["curr_project"] = project
    this.navCtrl.navigateForward("/project-mana")
    
  }


  getProjects() {
    console.log("getting projects")

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
      this.utilityService.presentModelAlert("Error try again")
    })



  }

  keys(obj) {
    return Object.keys(obj); // good old javascript on the rescue
  }
  
  values(obj) {
    return Object.values(obj); // good old javascript on the rescue
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
      this.utilityService.presentModelAlert("Error try again")
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



}
