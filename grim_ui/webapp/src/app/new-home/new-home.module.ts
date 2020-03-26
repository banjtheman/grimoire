import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewHomePageRoutingModule } from './new-home-routing.module';

import { NewHomePage } from './new-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewHomePageRoutingModule
  ],
  declarations: [NewHomePage]
})
export class NewHomePageModule {}
