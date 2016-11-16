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
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/auth/login', JSON.stringify({username: username, password: password}),
      {headers: headers})
      .map(res => {


        let token = res.json() && res.json().token;


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
        //res.json().token
      });
  }


  logout(): void {
    // clear token remove user from local storage to log user out
    this.http.get('/api/auth/logout')
      .subscribe(res => {
        console.log(res);
      });
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
