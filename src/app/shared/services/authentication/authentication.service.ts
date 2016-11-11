import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  token: string;

  constructor(public http: Http) {
    this.token = localStorage.getItem('id_token');
  }

  login(username, password): Observable<boolean> {
    return this.http.post('/api/auth/login', JSON.stringify({username: username, password: password}))
      .map((response: Response) => {
        let token = response.json().token;

        if(token) {
          this.token = token;

          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

          return true;
        } else {
          return false;
        }
    })
  }


  /*login(username, password): Observable<boolean> {
    return this.http.post('/api/authenticate', JSON.stringify({username: username, password: password}))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }*/

}
