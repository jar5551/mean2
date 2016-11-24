import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from '@angular/http';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  token: string;

  constructor(public http: Http) {
    this.token = localStorage.getItem('id_token');
  }

  /*private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }*/

  login(username, password): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/auth/login', JSON.stringify({username: username, password: password}),
      {headers: headers})
      .map(res => {
        let token = res.json() && res.json().token;

        if (token) {
          this.token = token;

          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

          return true;
        }

        return false;
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
