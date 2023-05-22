import create, { type ILogger, type TLogLevel } from './LoggerClient';

class ConsoleLogger implements ILogger {
    public start() {
        // Not implemented
    }

    public log(level: TLogLevel, data: unknown, timestamp: string) {
        console.log(JSON.stringify({ level, data, timestamp }));
    }
}

export default create(new ConsoleLogger());
