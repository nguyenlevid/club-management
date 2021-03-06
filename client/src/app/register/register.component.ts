import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService,
      private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -1);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      team: ['tech'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: ['male'],
      // password: ['', [Validators.required,
      //   Validators.minLength(4), Validators.maxLength(8)]],
      // confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    })

    // this.registerForm.controls.password.valueChanges.subscribe(() => {
    //   this.registerForm.controls.confirmPassword.updateValueAndValidity();
    // })
  }

  // matchValues(matchTo: string): ValidatorFn {
  //   return (control: AbstractControl) => {
  //     return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
  //   }
  // }
  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/');
      this.toastr.success("Member created successfully");
    }, error => {
      this.validationErrors = error;
    })
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
