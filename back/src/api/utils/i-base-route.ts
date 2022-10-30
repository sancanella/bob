import { Router } from 'express';

export interface IBaseRoute {

    prefix: string;

    router: Router;

    register(): void;

}