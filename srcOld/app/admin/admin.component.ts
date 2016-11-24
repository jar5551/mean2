/**
 * Created by jarek on 09/11/2016.
 */
import {Component} from "@angular/core";
@Component({
  selector: 'admin',
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./admin.component.html'),
  // Load our main `Sass` file into our `Chat` component
  styleUrls: [require('!style!css!sass!./admin.component.scss')],
  //providers: [...HTTP_PROVIDERS, ChatService],
  directives: [],
  pipes: []
})

export class Admin {
  constructor() {

    console.log('Admin constructor go!');


  }
}