import { Component, OnInit } from '@angular/core';
import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-cast',
  templateUrl: './view-cast.page.html',
  styleUrls: ['./view-cast.page.scss'],
})
export class ViewCastPage implements OnInit {


  dtOptions: DataTables.Settings = {};


  constructor(private http: HttpClient, public magicService: MagicService, public navCtrl: NavController, public utilityService: UtilityService, public alertController: AlertController) { }

  ngOnInit() {

    if (this.magicService.isBlank){
      console.log("return")
      window.location.href = "/";
    }

  }

}
