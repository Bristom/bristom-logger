const { Logger } = require('../dist');

const object = { 123: 'testando' };
try {
	Logger.debug('MESSAGE');
	Logger.warn('WARNING');
	Logger.error('ERROR');
	Logger.debug('1', 2, 3, object);
} catch (error) {
	process.exit(1);
}
