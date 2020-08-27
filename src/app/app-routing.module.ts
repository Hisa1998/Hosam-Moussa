import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileModule } from "./profile-edit/profile.module";

const routes: Routes = [
  {
    path:"me", loadChildren: () => ProfileModule
  },
  {
    path : '',component:HomeComponent
  },
  
  {
    path : '**',redirectTo :''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy :PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
