import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgotpassService } from '../../core/services/forgotpass.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  constructor(
    private _ForgotpassService: ForgotpassService,
    private _Router: Router
  ) {}
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  userMsg: string = '';

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  resetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });
  newPass: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z0-9_@]{6,}$/),
    ]),
  });

  forgetPass(): void {
    let userEma = this.forgetForm.value;
    this.email = userEma.email;
    this._ForgotpassService.forgotpassword(userEma).subscribe({
      next: (response) => {
        // console.log(response);
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        console.log(err);
        this.userMsg = err.error.message;
      },
    });
  }
  resetTheCode(): void {
    let reserC = this.resetCode.value;
    this._ForgotpassService.resetCode(reserC).subscribe({
      next: (response) => {
        // console.log(response);
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
    });
  }
  newPassword(): void {
    let retPass = this.newPass.value;
    retPass.email = this.email; // add property named email

    this._ForgotpassService.resetPassword(retPass).subscribe({
      next: (response) => {
        // console.log(response);
        if (response.token) {
          localStorage.setItem('etoken', response.token);
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
    });
  }
}
