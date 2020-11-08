import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/special'])
          //return console.log(res);
        },
        err => console.log(err)
      )
    //console.log(this.loginUserData);
  }
}


//Working of Login API

//login button calls loginUser() method
//In the loginUser() method, we call loginUser Service(Authservice) passing in loginUserData
//LoginUser Service makes an http call to the backend api(loginURL)
//This API returns the loginUser details as the response
//This response is then sent asyncronously to the method calling the service 
//In the component we subscribe to the service and then get the response and we log that to the console