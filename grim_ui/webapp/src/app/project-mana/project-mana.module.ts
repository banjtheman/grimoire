import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectManaPageRoutingModule } from './project-mana-routing.module';

import { ProjectManaPage } from './project-mana.page';
import { FileUploadModule } from 'ng2-file-upload';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTablesModule,
    FileUploadModule,
    ProjectManaPageRoutingModule
  ],
  declarations: [ProjectManaPage]
})
export class ProjectManaPageModule {}
