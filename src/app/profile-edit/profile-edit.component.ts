import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { startWith, map, timeInterval, timeout, timestamp } from 'rxjs/operators';

import { ProfileValidationServices } from "../profile-edit/profile-Validation.Services";
import { User } from "../shared/user.model";
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  myForm: FormGroup;
  skillsFormGroup: FormGroup;
 
  user: User;
  firstName:string = '';
  lastName:string= '';
  skill1:string = '';
  skill2:string = '';
  skill3:string = '' ;
 
  isClear = false; //clear alert control
  isSuccess = false;
 
  options: string[] = this.profileValidationServices.skillsList;
  filteredOptions1: Observable<String[]>;
  filteredOptions2: Observable<String[]>;
  filteredOptions3: Observable<String[]>;

  requiredErrMessage = "Error: You have to fill this field";
  minLeangthErrMessage = "Error: This must be more than 1 char";
  maxLeangthErrMessage = "Error: This must be less than 21 char";
  inValidNameErrMessage = "Error: the name must be without numbers or special char";
  uniqueSkillErrMessage = " You must choose 3 different Skills";
  notInListErrMessage = "Error: You must choose one of the list  ";

  constructor(private profileValidationServices: ProfileValidationServices) { }


  ngOnInit(): void {
    this.initForm();
 
 //option list for each control 
    let myControl1 = this.myForm.get('skills.skill1');
    let myControl2 = this.myForm.get('skills.skill2');
    let myControl3 = this.myForm.get('skills.skill3');

    this.filteredOptions1 = myControl1.valueChanges.pipe(
      startWith(''),
      map(name => this._filter(name, this.options))
    );
    this.filteredOptions2 = myControl2.valueChanges.pipe(
      startWith(''),
      map(name => this._filter(name, this.options))
    );
    this.filteredOptions3 = myControl3.valueChanges.pipe(
      startWith(''),
      map(name => this._filter(name, this.options))
    );
}

//Filters
private _filter(value: string, options): String[] {
  console.log(value)
  if (value) {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }}

  initForm() {
    this.user = JSON.parse(localStorage.getItem('myUser'))
    
    if (this.user) {
      this.firstName = this.user.firstName
      this.lastName = this.user.lastName
      this.skill1 = this.user.skills.skill1
      this.skill2 = this.user.skills.skill2
      this.skill3 = this.user.skills.skill3
    }

    this.myForm = new FormGroup({
      'firstName': new FormControl(this.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]+$')]),
      'lastName': new FormControl(this.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]+$')]),
      'skills': new FormGroup(
        {
          'skill1': new FormControl(this.skill1, [Validators.required, this.profileValidationServices.validateSkillsList.bind(this.profileValidationServices)]),
          'skill2': new FormControl(this.skill2, [Validators.required, this.profileValidationServices.validateSkillsList.bind(this.profileValidationServices)]),
          'skill3': new FormControl(this.skill3, [Validators.required, this.profileValidationServices.validateSkillsList.bind(this.profileValidationServices)]),
        }, this.profileValidationServices.validateUniqueSkills.bind(this.profileValidationServices))})
  }



  //buttons Functions 
  onClear() {
    this.isClear = true;
  }

  onConfirmClear(comfirmed: boolean) {
    if (comfirmed) {
      localStorage.clear()
      this.myForm.reset()
    }
    this.isClear = false;
  }

  onSubmit() {
    let myUser = JSON.stringify(this.myForm.value)
    localStorage.setItem('myUser', myUser)
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 2000)
  }

//Validation Error Messages Functions
  isRequired(fieldName) {
    if (this.myForm.get(fieldName).errors?.required && this.myForm.get(fieldName).touched) {
      return true;
    }
    return false;
  }
  isMinlength(fieldName) {
    if (this.myForm.get(fieldName).errors?.minlength) {
      return true;
    }
    return false;
  }
  isMaxlength(fieldName) {
    if (this.myForm.get(fieldName).errors?.maxlength) {
      return true;
    }
    return false;
  }
  isInList(fieldName) {
    if (this.myForm.get(fieldName).errors?.notInList && !this.isRequired(fieldName) && this.myForm.get(fieldName).touched) {
      return true;
    }
    return false;
  }
  isInvalidName(fieldName) {
    if (this.myForm.get(fieldName).errors?.pattern) {
      console.log(this.myForm.get(fieldName).errors);
      return true;
    }
    return false;
  }
}

