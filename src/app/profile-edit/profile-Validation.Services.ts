import { Injectable } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from "@angular/forms";
@Injectable({
    providedIn: 'root',
})
export class ProfileValidationServices {
     skillsList :string[] = [
        'Java', "C++", "python",
        "Matlab", "Git", "VsCode",
        'Data structures', 'Communication skills'];
     myCurrentSkills :FormGroup
        constructor(){
        
     };

    validateSkillsList(control: AbstractControl) {

        if (this.skillsList.indexOf(control.value) === -1) {
          
            return { 'notInList': true };

        }

        else {
            return null;
        }


    }
    
    validateUniqueSkills(control: AbstractControl)
     {
         let skills =control.value;

         if (skills.skill1 ==skills.skill2 || skills.skill1 ==skills.skill3  ||skills.skill2 ==skills.skill3  )
         {
             return {'notUnique' :true}
             

         }
         return null

     
  
     }
}