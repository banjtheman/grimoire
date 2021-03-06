import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectHomePageRoutingModule } from './project-home-routing.module';

import { ProjectHomePage } from './project-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectHomePageRoutingModule
  ],
  declarations: [ProjectHomePage]
})
export class ProjectHomePageModule {}
