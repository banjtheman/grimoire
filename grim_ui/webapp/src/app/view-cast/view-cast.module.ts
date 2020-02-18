import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCastPageRoutingModule } from './view-cast-routing.module';

import { ViewCastPage } from './view-cast.page';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTablesModule,
    ViewCastPageRoutingModule
  ],
  declarations: [ViewCastPage]
})
export class ViewCastPageModule {}
