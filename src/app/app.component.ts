import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
  }

}

// JSON Web Tokens

// It contains data in a json format
// It is a safeway to represent a set of information between two parties
// JWT is just a string and it is composed of 3 parts - header.payload.signature

// header consists of two parts - type of token(JWT), hashing algorithm used
// payload component of JWT is the data that is stored inside the web token
// In this example the server creates the userid stored inside the payload
// signature is used to verify the token
// https://jwt.io/ -- JWT website

// jsonwebtoken package

//To generate a new token, we use sign method passing the payload and secret key and any options if required
//jwt.sign(payload, secretOrPrivateKey, [options,callback])
//token is sent as response to the frontend and same token is sentback to server with sub-sequent request

//To verify the token 
//jwt.verify(token, secretOrPrivateKey, [options,callback])
