import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }
  public connect() {
    const socket = new SockJS(`http://localhost:8063/project-service/socket`);

    const stompClient = Stomp.over(socket);

    return stompClient;
  }
}
