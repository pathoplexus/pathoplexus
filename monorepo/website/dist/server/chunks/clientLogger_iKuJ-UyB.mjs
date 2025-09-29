import axios from 'axios';

const getClientLogger = (instance = "client") => {
  const clientLogger = {
    log: async (log) => axios.post("/admin/logs.txt", log),
    error: async (message) => clientLogger.log({ level: "error", instance, message }),
    warn: async (message) => clientLogger.log({ level: "warn", instance, message }),
    info: async (message) => clientLogger.log({ level: "info", instance, message })
  };
  return clientLogger;
};

export { getClientLogger as g };
