import BobException from './bob-exception';

export default class InvalidParamException extends BobException {
    constructor(field: string, error?: string) {
        if (error) {
            super(`Invalid value for ${field}: ${error}`);
        } else {
            super(`Invalid value for ${field}`);
        }
    }
}
