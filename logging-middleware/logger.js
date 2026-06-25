const LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
const isBrowser = typeof window !== "undefined";

function log(levelStr, context, message, meta = {}) {
  const entry = { timestamp: new Date().toISOString(), level: levelStr, context, message };
  if (Object.keys(meta).length) entry.meta = meta;
  const out = JSON.stringify(entry);
  if (isBrowser) {
    levelStr === "ERROR" ? console.error(out) : levelStr === "WARN" ? console.warn(out) : console.log(out);
  } else {
    levelStr === "ERROR" ? process.stderr.write(out + "\n") : process.stdout.write(out + "\n");
  }
}

export function createLogger(context) {
  return {
    debug: (msg, meta) => log("DEBUG", context, msg, meta),
    info:  (msg, meta) => log("INFO",  context, msg, meta),
    warn:  (msg, meta) => log("WARN",  context, msg, meta),
    error: (msg, meta) => log("ERROR", context, msg, meta),
  };
}
