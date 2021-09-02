import {
	ExceptionHandler,
	LogEntry,
	Logform,
	Logger as BaseLogger,
	LoggerOptions,
	Profiler,
	QueryOptions
} from 'winston';
import * as Config from 'winston/lib/winston/config';
import Transport from 'winston-transport';

type LogCallback = (
	error?: any,
	level?: string,
	message?: string,
	meta?: any
) => void;
interface LeveledLogMethod {
	(message: string, callback: LogCallback): Logger;
	(message: string, meta: any, callback: LogCallback): Logger;
	(message: string, ...meta: any[]): Logger;
	(message: any): Logger;
	(infoObject: object): Logger;
}

declare class Logger {
	silent: boolean;
	format: Logform.Format;
	levels: Config.AbstractConfigSetLevels;
	level: string;
	transports: Transport[];
	exceptions: ExceptionHandler;
	profilers: object;
	exitOnError: Function | boolean;
	defaultMeta?: any;

	// for cli and npm levels
	error: LeveledLogMethod;
	warn: LeveledLogMethod;
	help: LeveledLogMethod;
	data: LeveledLogMethod;
	info: LeveledLogMethod;
	debug: LeveledLogMethod;
	prompt: LeveledLogMethod;
	http: LeveledLogMethod;
	verbose: LeveledLogMethod;
	input: LeveledLogMethod;
	silly: LeveledLogMethod;

	// for syslog levels only
	emerg: LeveledLogMethod;
	alert: LeveledLogMethod;
	crit: LeveledLogMethod;
	warning: LeveledLogMethod;
	notice: LeveledLogMethod;

	query(
		options?: QueryOptions,
		callback?: (err: Error, results: any) => void
	): any;
	stream(options?: any): NodeJS.ReadableStream;

	startTimer(): Profiler;
	profile(id: string | number, meta?: LogEntry): BaseLogger;

	configure(options: LoggerOptions): void;

	child(options: Object): BaseLogger;

	isLevelEnabled(level: string): boolean;
	isErrorEnabled(): boolean;
	isWarnEnabled(): boolean;
	isInfoEnabled(): boolean;
	isVerboseEnabled(): boolean;
	isDebugEnabled(): boolean;
	isSillyEnabled(): boolean;

	new(options?: LoggerOptions): BaseLogger;
}
