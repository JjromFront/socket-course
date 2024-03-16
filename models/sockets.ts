import { Server as SocketIOServer, Socket } from 'socket.io';

interface SocketsInterface {
    io: SocketIOServer;
}

class Sockets implements SocketsInterface {
    io: SocketIOServer;

    constructor(io: SocketIOServer) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On Connection
        this.io.on('connection', (socket: Socket) => {
            // Escuchar evento: mensaje-to-server
            socket.on("mensaje-to-server", (data: any[]) => {
                console.log(data);
                this.io.emit('mensaje-from-server', data);
            });
        });
    }
}

export default Sockets;
