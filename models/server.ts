import express, { Application } from 'express';
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io'; 
import path from 'path';
import Sockets from './sockets';
import cors from 'cors';

interface ServerInterface {
    app: Application;
    server: HTTPServer;
    io: SocketIOServer; 
    port: number;
}

class Server implements ServerInterface {
    app: Application;
    server: HTTPServer;
    io: SocketIOServer;
    port: number;
    
    constructor() {
        this.app = express();
        this.port = 8080;

        // Http server
        this.server = new HTTPServer(this.app);

        // Configuracion de socket
        this.io = new SocketIOServer(this.server);
    }

    middlewares() {
        // desplegar directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')))

        // CORS
        this.app.use(cors())
    }

    configurarSockets () {
        new Sockets(this.io);
    }

    execute() {

        // Inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar server
        this.server.listen(this.port, () => {
            console.log(`Server corriendo en puerto: ${this.port}`);
        });
    }
}

export default Server;
