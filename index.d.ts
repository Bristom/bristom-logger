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
	(message: string, callback: LogCallback): BaseLogger;
	(message: string, meta: any, callback: LogCallback): BaseLogger;
	(message: string, ...meta: any[]): BaseLogger;
	(message: any): BaseLogger;
	(infoObject: object): BaseLogger;
}

declare namespace Logger {
	let silent: boolean;
	let format: Logform.Format;
	let levels: Config.AbstractConfigSetLevels;
	let level: string;
	let transports: Transport[];
	let exceptions: ExceptionHandler;
	let profilers: object;
	let exitOnError: Function | boolean;
	let defaultMeta: any;

	// for cli and npm levels
	let error: LeveledLogMethod;
	let warn: LeveledLogMethod;
	let help: LeveledLogMethod;
	let data: LeveledLogMethod;
	let info: LeveledLogMethod;
	let debug: LeveledLogMethod;
	let prompt: LeveledLogMethod;
	let http: LeveledLogMethod;
	let verbose: LeveledLogMethod;
	let input: LeveledLogMethod;
	let silly: LeveledLogMethod;

	// for syslog levels only
	let emerg: LeveledLogMethod;
	let alert: LeveledLogMethod;
	let crit: LeveledLogMethod;
	let warning: LeveledLogMethod;
	let notice: LeveledLogMethod;

	let query: (
		options?: QueryOptions,
		callback?: (err: Error, results: any) => void
	) => any;
	let stream: (options?: any) => NodeJS.ReadableStream;
	let add: (transport: Transport) => BaseLogger;
	let remove: (transport: Transport) => BaseLogger;
	let clear: () => BaseLogger;
	let startTimer: () => Profiler;
	let profile: (id: string | number) => BaseLogger;
	let configure: (options: LoggerOptions) => void;
	let child: (options: Object) => BaseLogger;
}
