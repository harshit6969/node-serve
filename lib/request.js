const { IncomingMessage } = require("http");
const { URL } = require("url");

const HOST = "https://example.org/";

class Request extends IncomingMessage {
  get queryParams() {
    const url = new URL(this.url, HOST);
    return Object.fromEntries(url.searchParams);
  }
  get path() {
    const url = new URL(this.url, HOST);
    return url.pathname;
  }
  get body() {}
}

exports.Request = Request;
