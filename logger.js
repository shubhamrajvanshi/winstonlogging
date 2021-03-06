var winston = require('winston')
var { combine,label,timestamp, printf ,prettyPrint} = winston.format

var myFormat = printf(info => {
    return `${info.timestamp}::[${info.label}] ${info.level}: ${info.message}`;
  });

var logger = function(module) {
    var path = module.filename.split('/').slice(-2).join('/');
    
    return winston.createLogger({
        level: 'info',
        
         format: combine(winston.format.colorize(),
             label({ label: path }),
            timestamp(),myFormat),
        transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
        ]
    });
}
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//   // 
//   if (process.env.NODE_ENV !== 'production') {
//     logger(module).add(new winston.transports.Console({
//         format: winston.format.combine(
//             winston.format.colorize({ all: true }),
//             winston.format.simple()  )
//     }));
//   }

  module.exports = logger