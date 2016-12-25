import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
  private name: string;
  private host: 'http://localhost';
  socket: SocketIOClient.Socket;

  constructor() { }

}
