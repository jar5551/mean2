/**
 * Created by jarek on 11/11/2016.
 */
import {Component} from '@angular/core';

import {AuthenticationService} from './../shared/services/authentication';

@Component({
  // HTML tag for specifying this component
  selector: 'login',
  // Let Angular 2 know about `Http` and `TodoService`
  providers: [AuthenticationService],
  template: require('./login.compoment.html')
})

export class Login {
  constructor(private authenticationService: AuthenticationService) {
    console.log('login page!')
  }

  login() {
    this.authenticationService.login('jarek', 'password')
      .subscribe((res) => {
        console.log(res);
      })
  }
}