import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCastPage } from './view-cast.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCastPageRoutingModule {}
