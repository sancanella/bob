import { NextFunction, Request, Response } from 'express';

export default function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    const dateString = () => new Date().toLocaleString();
    res.on('finish', () => {
        console.log(`${dateString()} | ${req.method} ${req.path} | ${res.statusCode} | ${req.ip} `);
    });

    return next();
}