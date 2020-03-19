import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  form;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(null, { validators: [Validators.required] }),
      age: new FormControl(null, {validators: [Validators.required]}),
      gender: new FormControl(null, {validators: [Validators.required]}),
      education_completion_year: new FormControl(null, { validators: [Validators.required] }),
      census_region: new FormControl(null, { validators: [Validators.required] }),
      marital_status: new FormControl(null, { validators: [Validators.required] }),
      race: new FormControl(null, { validators: [Validators.required] }),
      employement_status: new FormControl(null, { validators: [Validators.required] }),
      insurance_coverage: new FormControl(null, { validators: [Validators.required] }),
      income_segment: new FormControl(null, { validators: [Validators.required] }),
      current_income: new FormControl(null, { validators: [Validators.required] }),
      health_status: new FormControl(null, { validators: [Validators.required] }),
      mental_health_status: new FormControl(null, { validators: [Validators.required] })
    });

    this.auth.getUser()
    .subscribe(result=> {
      console.log(result)
      this.form.patchValue({
        id: result.result.id,
        age: result.result.age,
        gender: result.result.gender,
        education_completion_year: result.result.education_completion_year,
        census_region: result.result.census_region,
        marital_status: result.result.marital_status,
        race: result.result.race,
        employement_status: result.result.employement_status,
        insurance_coverage: result.result.insurance_coverage,
        income_segment: result.result.income_segment,
        current_income: result.result.current_income,
        health_status: result.result.health_status,
        mental_health_status: result.result.mental_health_status
      })
    })
  }

}
