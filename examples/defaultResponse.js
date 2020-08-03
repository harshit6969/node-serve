const port = 8081;
const { Serve } = require("../lib/server");
const server = new Serve();
server.get("/main", (req, res) => {
  res.end("Done");
});

server.listen(port);
