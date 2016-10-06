// This file contains the main class as well as the necessary
// decorators for creating the `Chat` component

/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';

import {SocketService} from '../shared/services/socket'

/*
 * Chat
 * Component
 */
@Component({
  selector: 'chat',
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./chat.component.html'),
  // Load our main `Sass` file into our `Chat` component
  styleUrls: [require('!style!css!sass!./chat.component.scss')],
  providers: [],
  directives: [],
  pipes: []
})
export class Chat {

  constructor(
  ) {}
}
