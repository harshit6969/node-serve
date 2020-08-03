const fs = require("fs");
const port = 8081;
const { Serve } = require("../lib/server");
const server = new Serve();

server.get("/login", (req, res) => {
  const path = __dirname + "/public/index.html";
  console.log(path);
  if (!fs.existsSync(path)) {
    res.writeHead(500);
    res.end("Not found");
  } else {
    const contents = fs.readFileSync(path);

    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(contents);
  }
});

server.listen(port);
