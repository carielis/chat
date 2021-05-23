import socketIOClient from "socket.io-client"
import { WSUrl } from "./api"

export class Socket {
  private static instance : any

  private constructor() {}

  public static getInstance(): any {
    if (!Socket.instance) {
      Socket.instance = socketIOClient(WSUrl,{reconnection: true,transports: ["websocket"]})
    }

    return Socket.instance
  }
}

export const WS = Socket.getInstance()