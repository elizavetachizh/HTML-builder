const http = require("http");
const fs = require("fs");
const path = require("path");
const { template } = require("handlebars");

http
  .createServer(function (request, response) {
    fs.readFile(
      path.join(__dirname, "template.html"),
      "utf8",
      function (error, data) {
        let header = fs.readFile(
          path.join(__dirname, "components", "header.html"),
          "utf-8",
          (err, data) => {
            fs.writeFile(
              path.join(__dirname, "components", "header.html"),
              "utf-8",
              (err, data) => {
                data;
              }
            );
          }
        );
        data = data
          .replace("{{header}}", header)
          .replace(
            "{{articles}}",
            path.join(__dirname, "components", "articles.html")
          )
          .replace(
            "{{footer}}",
            path.join(__dirname + "/components" + "/footer.html")
          );
        response.writeHead(300, { "Content-Type": "text/html" });
        response.end(data);
      }
    );
  })
  .listen(3000);
