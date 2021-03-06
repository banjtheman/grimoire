import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'



@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.page.html',
  styleUrls: ['./project-home.page.scss'],
})
export class ProjectHomePage implements OnInit {

  public project: any;

  constructor(public magicService: MagicService, public navCtrl: NavController,public utilityService: UtilityService) { }

  ngOnInit() {
    this.project = this.magicService["Data"]["curr_project"]
    console.log(this.project)
  }


}
