import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-cmp',
  template: require('./new-cmp.component.html'),
  //styleUrls: ['./new-cmp.component.scss']
  //styleUrls: [require('!style!css!sass!./new-cmp.component.scss')],

})
export class NewCmpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
