const port = 8081;
const { Serve } = require("../lib/server");
const server = new Serve();
server.get("/json", (req, res) => {
  res.toJson();
  res.send(200, { message: "This is a JSON response" });
});
server.listen(port);
