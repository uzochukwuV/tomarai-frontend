import { io, Socket } from "socket.io-client";

class RealSocket {
  private socket: Socket;
  private listeners: Record<string, Array<(data: any) => void>> = {};
  private connected = false;
  private intervalIds: Record<string, number> = {};

  constructor(url: string) {
    
    this.socket = io(url, { 
      transports: ["websocket", "polling"],  // Try websocket first
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,  // Longer delay
      timeout: 10000  // Longer timeout
    });


    
    // Built-in connect/disconnect handling
    this.socket.on("connect", () => {
      this.connected = true;
      console.log("Connected to socket"); 
      this.socket.emit("get_market_metrics");
      this.socket.emit("get_market_prediction");
      this.socket.emit("get_trading_signals", {
        token_id: "4015",
        symbol: "AVAX"
      });
      
      this.trigger("connect", null);
    });

    this.socket.on("disconnect", (reason) => {
      this.connected = false;
      console.log("Socket disconnected. Reason:", reason);
      this.trigger("disconnect", null);
    });

    // Generic listener wrapper
    this.socket.onAny((event: string, data: any) => {
      this.trigger(event, data);
    });
  }

  private trigger(event: string, data: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(fn => fn(data));
    }
  }

  public on(event: string, callback: (data: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: (data: any) => void): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
    }
  }

  public connect(): void {
    if (!this.connected) {
      this.socket.connect();
    }
  }
  public requestMarketMetrics(): void {
    if (this.connected) {
      console.log("Requesting market metrics...");
      // this.socket.emit('get_market_metrics');
    } else {
      console.warn("Socket not connected. Cannot request market metrics.");
    }
  }

  public disconnect(): void {
    if (this.connected) {
      this.socket.disconnect();
    }

    // clear intervals if you add any timed tasks later
    Object.values(this.intervalIds).forEach(clearInterval);
    this.intervalIds = {};
  }

  public isConnected(): boolean {
    return this.connected;
  }
}

const socket = new RealSocket("ws://localhost:5000");

export default socket;

