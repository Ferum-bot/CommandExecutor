import {StreamLogger} from "../../core/handlers/stream-logger";

export class ConsoleLogger implements StreamLogger {

    private static instance: ConsoleLogger = new ConsoleLogger()

    public static getInstance(): ConsoleLogger {
        return this.instance
    }

    private constructor() { }

    public end(): void {
        console.info('Process finished!')
    }

    public error(...args: any[]): void {
        console.error(args)
    }

    public log(...args: any[]): void {
        console.log(args)
    }
}