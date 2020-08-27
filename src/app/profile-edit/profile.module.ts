import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule  } from "@angular/material/button";
import { CommonModule } from '@angular/common';


import { ProfileEditComponent } from './profile-edit.component';
import { AlertComponent } from '../shared/alert/alert.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ 
    AlertComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule
  ],
  exports :[ ProfileEditComponent],

})
export class ProfileModule { }
