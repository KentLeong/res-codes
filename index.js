"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.codes = void 0;
var chalk_logging_1 = require("chalk-logging");
var status = {
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
};
function codes() {
    return function (req, res, next) {
        function init(cb) {
            Object.keys(status).forEach(function (i) {
                Object.defineProperty(res, status[i].method, {
                    enumerable: true,
                    configurable: true,
                    value: function (data, msg) {
                        try {
                            res.statusText = msg;
                            res.status(i).json(data || null);
                        }
                        catch (err) {
                            next(err);
                        }
                    },
                    writable: true
                });
            });
            if (req.query) {
                var query = "";
                for (var q in req.query) {
                    query += q + ": " + req.query[q];
                }
                var query = query.slice(0, -1);
                Object.defineProperty(req, "stringQ", {
                    enumerable: true,
                    configurable: true,
                    value: query
                });
            }
            cb();
        }
        init(function () {
            next();
        });
    };
}
exports.codes = codes;
function handleError(err) {
    var res = err.response;
    if (!res)
        return;
    if (res.status && res.status >= 400 && res.status < 500) {
        chalk_logging_1.log.warning(res.statusText);
    }
    else if (res.status >= 500) {
        chalk_logging_1.log.error(res.statusText);
    }
}
exports.handleError = handleError;
