export class ExceptionBase implements Error {
    name: string;
    message: string;
    toString() {
        return this.message;
    }
}
export class ArgumentNullException extends ExceptionBase {
    name: string = 'ArgumentNullException';
    message: string = 'Argument is null or empty';
    constructor(message?: string) {
        super();
        if (message) {
            this.message = message;
        }
    }
}