const { ServerResponse } = require("http");
const { URL } = require("url");

const HOST = "https://example.org/";

class Response extends ServerResponse {
  toJson() {
    this.setHeader("Content-Type", "application/json");
  }
  toHtml(){
    this.setHeader("Content-Type", "text/html");
  }
  send(statusCode, body) {
    this.writeHead(statusCode);
    let response = body;
    if(typeof body == "object"){
        response = JSON.stringify(body);
    }
    this.end(response);
  }
}

exports.Response = Response;
