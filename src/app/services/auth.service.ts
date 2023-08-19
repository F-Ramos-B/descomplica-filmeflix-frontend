import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { Login } from '../models/login';
import { Usuario } from '../models/usuario';
import { BaseService } from './base.service';



@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  nameToken: string = 'jwttoken';
  usuario: Usuario;

  URL = this.BASE_URL + '/auth';

  constructor(private router: Router, protected override http: HttpClient, public jwtHelper: JwtHelperService) { super(http); }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.nameToken);
    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    const isTokenExpired = this.jwtHelper.isTokenExpired(token || undefined);

    if (isTokenExpired) {
      this.clearToken();
    }

    return isTokenExpired;
  }

  getUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    return this.usuario;
  }

  setUsuario(usuario: Usuario) {
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  auth(email: string, senha: string): Observable<Login> {
    return this.http.post<Login>(this.URL + '/login', { email, senha });
  }

  getToken(): string {
    return localStorage.getItem(this.nameToken) || '';
  }

  setToken(token: string) {
    localStorage.setItem(this.nameToken, token);
  }

  logout() {
    this.clearToken();
    this.router.navigate(['login']);
  }

  clearToken() {
    localStorage.removeItem(this.nameToken);
    localStorage.removeItem('user');
  }
}
