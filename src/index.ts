/* eslint-disable no-param-reassign */
import { format as dateFormat } from 'date-fns';
import { SPLAT } from 'triple-beam';
import winston from 'winston';

const { Console, File } = winston.transports;
const {
	format,
	format: { combine, simple }
} = winston;

const formatSplat = (splat: string[]) => {
	return splat
		.map(value => {
			if (typeof value === 'object') {
				return JSON.stringify(value);
			} else {
				return String(value);
			}
		})
		.join(' ');
};

// eslint-disable-next-line no-unused-vars
const custom = format((info, _opts) => {
	const date = dateFormat(new Date(), 'dd/MM HH:mm:ss');
	const splat = info[SPLAT] ? formatSplat(info[SPLAT]) : [];

	const message = `${info.message} ${splat}`;

	if (info.level === 'info') {
		// Setting level to blue and message to green
		info.level = `\u001b[0m[\u001b[95m\u001b[1m${info.level.toUpperCase()}\x1b[37m\u001b[0m]`;
		info.message = `\x1b[30m\u001b[1m${date.toString()}\x1b[37m\u001b[0m \u001b[95m\u001b[1m${message}\u001b[0m`;
	} else if (info.level === 'error') {
		// Setting level and message to red
		info.level = `\u001b[0m[\u001b[31m\u001b[1m${info.level.toUpperCase()}\x1b[37m\u001b[0m]`;
		info.message = `\x1b[30m\u001b[1m${date.toString()}\x1b[37m\u001b[0m \u001b[31m\u001b[1m${message}\u001b[0m`;
	} else if (info.level === 'warn') {
		// Setting level and message to yellow
		info.level = `\u001b[0m[\u001b[33m\u001b[1m${info.level.toUpperCase()}\x1b[37m\u001b[0m]`;
		info.message = `\x1b[30m\u001b[1m${date.toString()}\x1b[37m\u001b[0m \u001b[33m\u001b[1m${message}\u001b[0m`;
	} else {
		// Setting level and message to white
		info.level = `\u001b[0m[\u001b[94m\u001b[1m${info.level.toUpperCase()}\x1b[37m\u001b[0m]`;
		info.message = `\x1b[30m\u001b[1m${date.toString()}\x1b[37m\u001b[0m \u001b[94m\u001b[1m${message}\u001b[0m`;
	}

	return info;
});

const Logger = winston.createLogger({
	transports: [
		new Console({
			level: process.env.WINSTON_LEVEL || 'debug',
			format: combine(custom(), simple())
		}),
		new File({
			filename: 'logs/warn_errors.log',
			level: 'warn',
			format: winston.format.simple()
		})
	]
});

Logger.exceptions.handle(new File({ filename: 'logs/exceptions.log' }));

export { Logger };
