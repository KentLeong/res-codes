import { mongo } from "../league-inhouse-client/server/module";

function errors(code, data, message) {
  let msg = ": "+message || "";
  let status = {
    status: code || null,
    message: codes[code]+msg || null,
    data: data || null
  }
  return status
}

const codes = {
  // 1xx
  101: "Information is given",

  // 2xx
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritive Information",
  204: "No Content",
  205: "Rest Content",
  206: "Partial Content",

  // 3xx
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "Unused",
  307: "Temporarly Redirected",

  //4xx
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-url Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  418: "ImATeapot",
  421: "Missdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Unordered Collection",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",

  //5xx
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required"
}

export default errors;