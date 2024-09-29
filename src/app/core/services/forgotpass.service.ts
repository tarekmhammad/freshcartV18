import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotpassService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/auth/';

  forgotpassword(userEmail: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}forgotPasswords`, userEmail);
  }

  resetCode(resetcode: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}verifyResetCode`, resetcode);
  }

  resetPassword(passValue: object): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}resetPassword`, passValue);
  }
}
