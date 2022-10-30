import BobException from '../../domain/errors/bob-exception';
import InvalidParamException from '../../domain/errors/invalid-param-exception';
import NotFoundException from '../../domain/errors/not-found-exception';
import { NextFunction, Request, Response } from 'express';

export default function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    const status = 500;
    const message = 'Internal server error';

    if (error instanceof BobException) {
        if (error instanceof InvalidParamException) {
            const status = 400;
            response
                .status(status)
                .send({
                    status,
                    message: error.message,
                });
        } else if (error instanceof NotFoundException) {
            const status = 404;
            response
                .status(status)
                .send({
                    status,
                    message: error.message,
                });
        }  else {
            console.log('Error when mapping error class to HTTP error');
            console.log(error);
            response
                .status(status)
                .send({
                    status,
                    message,
                });
        }
    }  else if (error instanceof SyntaxError){
        const status = 400;
        response
            .status(status)
            .send({
                status,
                message: 'JSON Formatting Error',
            });
    } else {
        console.log('Unhandled error');
        console.log(error);
        response
            .status(status)
            .send({
                status,
                message,
            });
    }

    return next(error);
}