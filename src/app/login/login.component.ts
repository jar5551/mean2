/**
 * Created by jarek on 11/11/2016.
 */

import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './../shared/services/authentication';



@Component({
  // HTML tag for specifying this component
  selector: 'login',
  // Let Angular 2 know about `Http` and `TodoService`
  providers: [AuthenticationService],
  template: require('./login.compoment.html')
})

export class Login {

  loginData = {
    login: '',
    password: ''
  };

  error: string;

  constructor(private authenticationService: AuthenticationService) {
    console.log('login page!')
  }

  login() {
    this.authenticationService.login(this.loginData.login, this.loginData.password)
      .subscribe((res) => {
          console.log(res);
          /*if (res === true) {
            // login successful
            this.router.navigate(['/']);
          } else {
            // login failed
            this.error = 'Niepoprawne dane logowania';
          }*/
        },
        (err) => {
          this.error = 'Niepoprawne dane logowania';
          console.log('err', err);
        })

  }

  claerLoginError() {
    this.error = '';
  }
}