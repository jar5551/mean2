// This file contains the main class as well as the necessary
// decorators for creating the `Chat` component

/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';

import {ChatService} from './chat.service';

import {SocketService} from '../shared/services/socket'

import {HTTP_PROVIDERS} from '@angular/http';


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
  providers: [...HTTP_PROVIDERS, ChatService],
  directives: [],
  pipes: []
})
export class Chat {

  private messages: Array<Chat> = [];

  constructor(public ChatService: ChatService) {
    console.log('Chat constructor go!');

    ChatService.getAll()
      .subscribe((res) => {
        this.messages = res;
      });
  }
}
