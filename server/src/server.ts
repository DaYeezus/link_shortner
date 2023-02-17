import express from 'express'
import {notFoundHandler, serverErrorHandler} from "./middlewares/error-handlers";
import helmet from 'helmet';
import morgan from 'morgan';
import {Server} from "http"
export class ExpressServer {
    private readonly server :express.Application
    constructor() {
        this.server = express();
        this.configureServer(this.server)
        this.configureControllers(this.server)
        this.configureMiddleWares(this.server)
        this.start(this.server)
        this.stop(this.server)
    }
    private configureServer(server:express.Application) {
        server.use(express.json())
        server.use(express.urlencoded({extended:true}))
        server.use(helmet())
        server.use(morgan('dev'))
    }
    private configureControllers(server:express.Application) {
        // attachControllers( , server)
    }
    private configureMiddleWares(server:express.Application) {
        server.all("*" , notFoundHandler)
        server.use(serverErrorHandler)
    }
    private start(server:express.Application) :void {
        server.listen(3000, () => {
            console.log("Server is running on port 3000")
        })

    }

    private stop(server:express.Application) :void {
        ["SIGINT", "SIGTERM"].forEach(signal => {
            process.on(signal, () => {
                console.log('Program closed on signal ' + signal)
                process.exit(0)
            })
        })

    }
    public getServer() :express.Application {
        return this.server
    }
}
export default ExpressServer
