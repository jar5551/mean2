import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: require('./login.component.html'),
  styles: [require('./login.component.scss').toString()]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
