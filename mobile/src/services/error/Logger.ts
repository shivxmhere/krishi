export class Logger {
    static log(message: string) {
        console.log(`[LOG]: ${message}`);
    }

    static error(message: string, error: any) {
        console.error(`[ERROR]: ${message}`, error);
    }
}
