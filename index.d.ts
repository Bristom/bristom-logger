import { Logger as BaseLogger } from 'winston';

declare module Logger {
	interface Logger extends BaseLogger {}
}
