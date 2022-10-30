
export default class BobException implements Error {
    constructor(message: string) {
        this.message = message;
        this.name = '';
        this.stack = 'undefined';
    }

    message: string;

    name: string;

    stack: string | undefined;
}