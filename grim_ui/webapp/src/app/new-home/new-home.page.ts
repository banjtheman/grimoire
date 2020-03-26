import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MagicService } from '../services/magic.service'
import { UtilityService } from '../utility.service'

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.page.html',
  styleUrls: ['./new-home.page.scss'],
})
export class NewHomePage implements OnInit {

  constructor(public magicService: MagicService, public navCtrl: NavController,public utilityService: UtilityService) { }

  ngOnInit() {
  }

}
