import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private name: string;
  private host: string = '/socket.io';
  socket:any = null;

  constructor() {}

  // Get items observable
  get(name: string): Observable<any> {
    this.name = name;
    let socketUrl = this.host + "/" + this.name;
    this.socket = io.connect(socketUrl);
    this.socket.on("connect", () => this.connect());
    this.socket.on("disconnect", () => this.disconnect());
    this.socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}" (${socketUrl})`);
    });

    // Return observable which follows "create" and "remove" signals from socket stream
    return Observable.create((observer: any) => {
      this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
      this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
      return () => this.socket.close();
    });
  }

  // Create signal
  create(name: string) {
    this.socket.emit("create", name);
  }

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
