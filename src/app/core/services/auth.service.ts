import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/auth/';
  userInfo: any;
  register(data: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signup`, data);
  }
  login(data: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signin`, data);
  }
  decodeUser(): void {
    const encode = localStorage.getItem('etoken');
    if (encode != null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;

    }
  }
}
