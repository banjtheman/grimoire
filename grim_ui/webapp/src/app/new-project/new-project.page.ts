import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
//import { AuthService } from '../services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { UtilityService } from '../utility.service'


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {

  public desc: any;
  public name: any;

  constructor(private navParams: NavParams, private http: HttpClient, private modalCtrl: ModalController,public utilityService: UtilityService) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  moveFocus(nextElement) {
    nextElement.setFocus();
  }


  createProjectAction() {
    console.log('New Project clicked');


    //var teamId = localStorage.getItem('teamId');
    //var accessToken = localStorage.getItem('access_token');
    //var creator = localStorage.getItem('curr_email');

    var projectData = {
      name: this.name,
      desc: this.desc,
    };

    var url = environment.api_url + "/create_project"
    console.log("calling CREATE project");
    this.postCall(projectData, url);
  }


  postCall(postData, url) {
    console.log("Sending a post request")

    //var id_token = localStorage.getItem('id_token')
    //let token = "Bearer " + id_token

    //"Authorization": token
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });


    this.http.post(url, postData, { headers: headers }).toPromise()
      .then((data) => { // Success
        console.log(data);
        if (data["error"]) {
          console.log("Graceful error")
          this.utilityService.presentModelAlert(data["error"])
          return
        }
        this.modalCtrl.dismiss();

      }, (err) => {
        console.log(err);
      });
  }

}
