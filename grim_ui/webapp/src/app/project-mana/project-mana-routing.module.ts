import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectManaPage } from './project-mana.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectManaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManaPageRoutingModule {}
