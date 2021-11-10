const fs = require("fs");
path = require("path");

// read directory 'secret-folder'
fs.readdir(
  path.join(__dirname, "/secret-folder"),
  { withFileTypes: true },
  (err, files) => {
    // getting data the "secret folder" data directory
    if (err) throw err;
    for (let i = 0; i < files.length; i++) {
      // 4.check object - it is file?
      if (files[i].isFile()) {
        fs.stat(
          path.join(__dirname, "/secret-folder/", files[i].name),
          (err, stats) => {
            if (err) throw err;

            let nameWithoutExtension = path.extname(files[i].name).slice(1);

            // output data in console
            console.log(
              `${path.basename(
                files[i].name,
                path.extname(files[i].name)
              )} - ${nameWithoutExtension} - ${stats.size} B`
            );
          }
        );
      }
    }
  }
);
