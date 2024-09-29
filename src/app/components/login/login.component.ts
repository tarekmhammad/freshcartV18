import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  errMsg: string = '';
  isLoading: boolean = false;

  // loginForm: FormGroup = this._FormBuilder.group(
  //   {
  //     name: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(20),
  //       ],
  //     ],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: [
  //       '',
  //       [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9_@]{6,}$/)],
  //     ],
  //     rePassword: [''],
  //     phone: [
  //       '',
  //       [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
  //     ],
  //   },
  //   { validators: [this.confirmPassword] } as FormControlOptions
  // );

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z0-9_@]{6,}$/),
    ]),
  });

  handleForm(): void {
    const userData = this.loginForm.value;
    this.isLoading = true;
    if (this.loginForm.valid === true) {
      this._AuthService.login(userData).subscribe({
        next: (response: any) => {
          localStorage.setItem('etoken', response.token);
          this._AuthService.decodeUser();
          this.isLoading = false;
          this._Router.navigate(['/home']);
          // console.log(response);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
