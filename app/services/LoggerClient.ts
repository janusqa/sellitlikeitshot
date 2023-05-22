export type TLogLevel = 'DEBUG' | 'ERROR' | 'WARN' | 'INFO';

export interface ILogger {
    start: () => void;
    log: (level: TLogLevel, data: unknown, timestamp: string) => void;
}

export type LoggerClientType = InstanceType<typeof LoggerClient>;

class LoggerClient {
    private readonly loggingService;

    constructor(loggingService: ILogger) {
        /* Initilize logger here */
        this.loggingService = loggingService;
    }

    public debug(event: unknown) {
        this.loggingService.log('DEBUG', event, new Date().toUTCString());
    }

    public warn(event: unknown) {
        this.loggingService.log('WARN', event, new Date().toUTCString());
    }

    public error(event: unknown) {
        this.loggingService.log('ERROR', event, new Date().toUTCString());
    }

    public info(event: unknown) {
        this.loggingService.log('INFO', event, new Date().toUTCString());
    }

    // This will be implemented in the discrete logging service
    // private log(level: TLogLevel, data: unknown) {
    //      console[level](JSON.stringify({ level, data, timestamp: new Date().toUTCString() }));
    // }
}

const create = (loggingService: ILogger) => new LoggerClient(loggingService);

export default create;
