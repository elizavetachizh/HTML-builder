const fs = require("fs");
const path = require("path");
const { stdout } = process;

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (err, files) => {
    files.forEach((file) => {
      let output = "";
      if (!file.isDirectory()) {
        fs.stat(
          path.join(__dirname, "secret-folder", file.name),
          (err, stats) => {
            if (err) console.log(err);
            else {
              output +=
                path.basename(file.name, path.extname(file.name)) +
                " - " +
                path.extname(file.name).slice(1) +
                " - " +
                stats.size / 1000 +
                "kb" +
                "\n";
              stdout.write(output);
            }
          }
        );
      }
    });
  }
);
