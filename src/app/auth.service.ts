import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = "http://localhost:3000/api/register"
  private loginURL = "http://localhost:3000/api/login"

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.registerURL, user)
  }

  loginUser(user) {
    return this.http.post<any>(this.loginURL, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token') //The two marks(!!) gives the boolean value of the expression
  }

  getToken() {
    return localStorage.getItem('token')
  }
  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/events'])
  }

}
