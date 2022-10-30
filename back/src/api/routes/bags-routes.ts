import { IBaseRoute } from 'api/utils/i-base-route';
import BackOfficeService  from '../../domain/services/back-office-service';
import express, { NextFunction, Response } from 'express';
import { param, validationResult,body } from 'express-validator';
import InvalidParamException from '../../domain/errors/invalid-param-exception';

export class BagRoutes implements IBaseRoute {

    public readonly prefix = '/bag';

    public readonly router = express.Router();

    private backOfficeService;

    constructor() {
        this.backOfficeService = BackOfficeService;
    }

    public register() {

        this.router.get('/', async (req: any, res: Response, next: NextFunction) => {
            try {
                const bagInfo = await this.backOfficeService.getBagInfo()
                res.json(bagInfo);
            } catch (e) {
                next(e);
            }
        });


        this.router.post('/',
        body("Name").isString().notEmpty() ,
        body("Bags").isNumeric(),
         async (req: any, res: Response, next: NextFunction) => {
            try {
                const validate = validationResult(req)
                if(!validate.isEmpty()) throw new InvalidParamException(validate.array()[0].param ?? "")
                const bagInfo = await this.backOfficeService.createBagInfo(req.body)
                res.json(bagInfo);
            } catch (e) {
                next(e);
            }
        });


        this.router.put('/:id',
        param("id").isMongoId(),
        body("Name").isString().notEmpty() ,
        body("Bags").isNumeric(),
         async (req: any, res: Response, next: NextFunction) => {
            try {
                const validate = validationResult(req)
                if(!validate.isEmpty()) throw new InvalidParamException(validate.array()[0].value)
                const { id } = req.params
                const bagInfo = await this.backOfficeService.updateBagInfo(id,req.body)
                res.json(bagInfo);
            } catch (e) {
                next(e);
            }
        });

        this.router.delete('/:id',
        param("id").isMongoId()
        ,async (req: any, res: Response, next: NextFunction) => {
            try {
                const validate = validationResult(req)
                if(!validate.isEmpty()) throw new InvalidParamException(validate.array()[0].value)
                const { id } = req.params
                const bagInfo = await this.backOfficeService.deleteBagInfo(id)
                res.status(bagInfo ? 200 : 400).send()
            } catch (e) {
                next(e);
            }
        });


    }
}