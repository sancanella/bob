import BobException from './bob-exception';

export default class NotFoundException extends BobException {
    constructor(entity: string) {
        super(`${entity} not found`);
    }
}
