const { Logger } = require('../dist');

try {
	Logger.debug('MESSAGE');
	Logger.warn('WARNING');
	Logger.error('ERROR');
} catch (error) {
	process.exit(1);
}
