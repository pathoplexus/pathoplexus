import winston from 'winston';

let _logger;
const getLogger = () => {
  if (_logger === void 0) {
    const logPath = "./log";
    const serverLogFile = `${logPath}/website.log`;
    const transports = [];
    {
      transports.push(new winston.transports.File({ filename: serverLogFile }));
    }
    transports.push(new winston.transports.Console());
    _logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports
    });
  }
  return _logger;
};
const getInstanceLogger = (instance) => {
  return {
    // Winston uses npm log levels by default
    error: (message) => getLogger().error(message, { instance }),
    warn: (message) => getLogger().warn(message, { instance }),
    info: (message) => getLogger().info(message, { instance }),
    http: (message) => getLogger().http(message, { instance }),
    verbose: (message) => getLogger().verbose(message, { instance }),
    debug: (message) => getLogger().debug(message, { instance }),
    silly: (message) => getLogger().silly(message, { instance })
  };
};

export { getInstanceLogger as g };
