import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileModule } from "./profile-edit/profile.module";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path:"me", component:ProfileEditComponent
    //loadChildren: () => ProfileModule
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
