const winston = require('winston');
const props = require('./properties');
const moment = require('moment');

if (props.get('log.level'))
	winston.level = props.get('log:level');
else
	winston.level = 'debug';

const log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return moment().format('MMM Do, h:mm:ss');
      },
      formatter: function(options) {
        return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

module.exports = log;