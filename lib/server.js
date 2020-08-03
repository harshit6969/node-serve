const fs = require("fs");
const path = require('path');
const { createServer } = require("http");
const { Request } = require("./request");
const { Response } = require("./response");

function getResponseData(routes, req, res){
  if(!routes.has(req.path)) throw "Not found on server";
  const data = routes.get(req.path);
  if(typeof data == "function"){
    return data(req, res);
  }
  return data;
}

class Serve {
  constructor(opts) {
    this.getRoutes = new Map();
    this.postRoutes = new Map();
    this.putRoutes = new Map();
    this.deleteRoutes = new Map();
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleRequest(req, res) {
    switch (req.method) {
      case "GET":
        getResponseData(this.getRoutes, req, res);
        break;
      case "PUT":
        getResponseData(this.putRoutes, req, res);
        break;
      case "POST":
        getResponseData(this.postRoutes, req, res);
        break;
      case "DELETE":
        getResponseData(this.deleteRoutes, req, res);
        break;
      default:
        res.end("Not found");
        break;
    }
  }
  listen(port) {
    this.server = createServer(
      { IncomingMessage: Request, ServerResponse: Response },
      this.handleRequest
    );
    this.server.listen(port);
  }
  get(route, output) {
    this.getRoutes.set(route, output);
  }
  post(route, output) {
    this.postRoutes.set(route, output);
  }
  put(route, output) {
    this.putRoutes.set(route, output);
  }
  delete(route, output) {
    this.deleteRoutes.set(route, output);
  }
  serveStatic(route, filePath, output){
    const absPath = path.join(__dirname, '../') + filePath;
    if(!fs.existsSync(absPath)) throw new Error("Not found");
    const contents = fs.readFileSync(absPath);
    this.getRoutes.set(route, contents);
  }
}

exports.Serve = Serve;
