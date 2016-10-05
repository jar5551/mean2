import {Injectable} from 'angular2/core';
import * as io from 'socket.io-client';

@Injectable()
export class Socket {

  socket:any = null;

  constructor() {}


  private connect() {
    console.log('Connected');

    // Request initial list when connected
    this.socket.emit("list");
  }

  // Handle connection closing
  private disconnect() {
    console.log('Disconnected from');
  }
}
