import express, { Application, NextFunction, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

import loggingMiddleware from './middleware/logging-middleware';
import errorMiddleware from './middleware/error-middleware';
import { IBaseRoute } from './utils/i-base-route';
import { BagRoutes } from './routes/bags-routes';
import DbConnection from '../data/db-connection';
import { Server } from 'http';

config()

export class App {
    private readonly port: number = Number(process.env.PORT) || 8080;

    private app: Application;
    private cb?: Function;
    private server?: Server;

    constructor() {
        this.app = express();
    }

    public async start(cb?: Function) {
        this.cb = cb;
        try {
            await DbConnection.load();
            this.configureCors();
            this.configureBodyParser();
            this.initializeControllers();
            this.initializeErrorHandler();
        } catch (error) {
            console.error(error);
        }
    }

    private configureCors() {
        this.app.use(cors());
    }

    private configureBodyParser() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers() {
        this.app.use(loggingMiddleware);

        const allRoutes: Array<IBaseRoute> = [
            new BagRoutes(),
        ];

        for (const route of allRoutes) {
            route.register();
            this.app.use(route.prefix, route.router);
        }

        this.app.get('/health', async (req: any, res: Response, next: NextFunction) => {
            res.send('OK');
        });

        this.app.get('*', (req, res) => {
            res.status(404).send({
                code: 404,
                message: `${req.method} ${req.path} not found`,
            });
        });

        this.initPort();
    }

    private initPort() {
        this.server = this.app.listen(this.port, () => {
            console.log(`⚡ App is listening on port ${this.port} ! ⚡`);
            if(this.cb) this.cb()
        });
    }


    private initializeErrorHandler() {
        this.app.use(errorMiddleware);
    }

    public stop() {
        this.server?.close()
    }

}

async function runApp() {
    const app = new App();
    await app.start();
}

if (require.main === module) {
    runApp();
}