import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: require('./app.component.html'),
  //styles: [require('./app.component.css')]
  //styleUrls: [require('!style!css!sass!./app.component.scss')],
  styles: [require('./app.component.scss').toString()]

})
export class AppComponent {
  title = 'app works!';
}
