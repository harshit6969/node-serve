const fs = require("fs");
const path = require('path')
const { createServer } = require("http");
const { Request } = require("./request");
const { Response } = require("./response");

function getResponseData(routes, path, req, res){
  if(!routes.has(path)) throw "Not found on server";
  const data = routes.get(path);
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
        getResponseData(this.getRoutes, req.path, req, res);
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
  get(route, fn) {
    // if (typeof fn != "function")
    //   throw new TypeError(`Expected function. Got: ${typeof fn}`);
    this.getRoutes.set(route, fn);
  }
  post() {
    // if (typeof fn != "function")
    //   throw new TypeError(`Expected function. Got: ${typeof fn}`);
    this.postRoutes.set(route, fn);
  }
  put() {
    // if (typeof fn != "function")
    //   throw new TypeError(`Expected function. Got: ${typeof fn}`);
    this.putRoutes.set(route, fn);
  }
  delete() {
    // if (typeof fn != "function")
    //   throw new TypeError(`Expected function. Got: ${typeof fn}`);
    this.deleteRoutes.set(route, fn);
  }

  serveStatic(route, filePath, fn){
    const absPath = path.join(__dirname, '../') + filePath;
    if(!fs.existsSync(absPath)) throw new Error("Not found");
    const contents = fs.readFileSync(absPath);
    this.getRoutes.set(route, contents);
  }
}

exports.Serve = Serve;
