/* eslint-disable no-param-reassign */
import { format as dateFormat } from 'date-fns';
import { SPLAT } from 'triple-beam';
import winston from 'winston';

const { Console, File } = winston.transports;
const { format } = winston;

// eslint-disable-next-line no-unused-vars
const custom = format((info, _opts) => {
	const date = dateFormat(new Date(), 'dd/MM HH:mm:ss');

	const message = info[SPLAT]
		? `${info.message} ${info[SPLAT].join(' ')}`
		: info.message;

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
			level: process.env.WINSTON_LEVEL,
			format: winston.format.combine(custom(), winston.format.simple())
		}),
		new File({
			filename: 'logs/warn.log',
			level: 'warn',
			format: winston.format.simple()
		})
	]
});

Logger.exceptions.handle(new File({ filename: 'logs/exceptions.log' }));

export { Logger };
