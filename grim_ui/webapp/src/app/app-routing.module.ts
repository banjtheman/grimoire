import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'new-home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'new-project',
    loadChildren: () => import('./new-project/new-project.module').then( m => m.NewProjectPageModule)
  },
  {
    path: 'project-home',
    loadChildren: () => import('./project-home/project-home.module').then( m => m.ProjectHomePageModule)
  },
  {
    path: 'project-mana',
    loadChildren: () => import('./project-mana/project-mana.module').then( m => m.ProjectManaPageModule)
  },
  {
    path: 'view-cast',
    loadChildren: () => import('./view-cast/view-cast.module').then( m => m.ViewCastPageModule)
  },
  {
    path: 'new-home',
    loadChildren: () => import('./new-home/new-home.module').then( m => m.NewHomePageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'grim-view',
    loadChildren: () => import('./grim-view/grim-view.module').then( m => m.GrimViewPageModule)
  },
  {
    path: 'conjure',
    loadChildren: () => import('./conjure/conjure.module').then( m => m.ConjurePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
