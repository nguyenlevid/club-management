import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from 'src/app/_models/resetPassword';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    public resetPasswordForm: FormGroup;
    public showSuccess: boolean;
    public showError: boolean;
    public errorMessage: string;
    private _token: string;
    private _email: string;
    constructor(private accountService: AccountService, 
      private _route: ActivatedRoute) { }
    ngOnInit(): void {
      this.resetPasswordForm = new FormGroup({
        password: new FormControl('', [Validators.required,
          Validators.minLength(4), Validators.maxLength(8)]),
        confirm: new FormControl('', [Validators.required, this.matchValues('password')]),
      });
      this.resetPasswordForm.controls.password.valueChanges.subscribe(() => {
      this.resetPasswordForm.controls.confirmPassword.updateValueAndValidity();
      })

    
      this._token = this._route.snapshot.queryParams['token'];
      this._email = this._route.snapshot.queryParams['email'];
  }

    matchValues(matchTo: string): ValidatorFn {
      return (control: AbstractControl) => {
        return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
      }
    }

    validateControl = (controlName: string) => {
      return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
    }
    
    hasError = (controlName: string, errorName: string) => {
      return this.resetPasswordForm.controls[controlName].hasError(errorName)
    }
    
    resetPassword = (resetPasswordFormValue) => {
      this.showError = this.showSuccess = false;
    
      const resetPass = { ... resetPasswordFormValue };
      const resetPassDto: ResetPassword = {
        password: resetPass.password,
        confirmPassword: resetPass.confirm,
        token: this._token,
        email: this._email
      }
    
      this.accountService.resetPassword('account/resetpassword', resetPassDto)
      .subscribe(_ => {
        this.showSuccess = true;
      },
      error => {
        this.showError = true;
        this.errorMessage = error;
      })
    }

}
