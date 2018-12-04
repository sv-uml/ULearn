var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.set("port", (process.env.PORT || 3003));
app.use("/assets", express.static(path.join(__dirname, "dist")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.all("*", function(req, res, next) { res.sendFile(path.resolve(__dirname, "dist", "index.html")); });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(app.get("port"), function() {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});