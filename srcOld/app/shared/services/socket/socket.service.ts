import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private name: string;
  private host: string = 'http://localhost:8080';
  private socket;

  constructor() {}

  sendMessage(message){
    this.socket.emit('create', message);

    return message;
  }

  getMessages() {
    this.socket = io(this.host);
  }

}
