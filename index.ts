import { log } from "chalk-logging";

const status = {
  200: {
    message: "OK",
    method: "ok"
  },
  400: {
    message: "Bad Request",
    method: "bad"
  },
  401: {
    message: "Unauthorized",
    method: "notAuth"
  },
  403: {
    message: "Forbidden",
    method: "forbidden"
  },
  404: {
    message: "Not Found",
    method: "notFound"
  },
  408: {
    message: "Request Timeout",
    method: "timeout"
  },
  429: {
    message: "Too Many Requests",
    method: "limited"
  },
  500: {
    message: "Internal Server Error",
    method: "error"
  },
  503: {
    message: "Service Unavailable",
    method: "noService"
  },
  507: {
    message: "Insufficient Storage",
    method: "noStorage"
  }
}

export function codes() {
  return (req, res, next) => {
    function init(cb) {
      Object.keys(status).forEach(i => {
        Object.defineProperty(res, status[i].method, {
          enumerable: true,
          configurable: true,
          value: function(data, msg) {
            try {
              res.statusMessage = msg;
              res.status(i).json(data || null)
            } catch(err) {
              next(err)
            }
          },
          writable: true
        });
      })
      cb();
    }
    init(() => {
      next();
    })
  }
}

export function handleError(err: any) {
  if (!err.response) return;
  let res = err.resopnse;
  if (res.status >= 400 && res.status < 500) {
    log.warning(res.statusMessage);
  } else if (res.status >= 500) {
    log.error(res.statusMessage);
  }
}