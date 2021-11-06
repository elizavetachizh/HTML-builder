const fs = require("fs");
const path = require("path");
fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.error(err);
    }

    for (let file of files) {
      if (path.extname(file.name) === ".css" && file.isFile()) {
        fs.readFile(path.join(__dirname, "styles", file.name), (err, files) => {
          if (err) {
            console.error(err);
          }
          let contentFiles = files;
          fs.writeFile(
            path.join(__dirname, "bundle.css"),
            contentFiles,
            (err) => {
              if (err) console.error(err);

              console.log("файл успешно перезаписан");
            }
          );
        });
      }
    }
  }
);
