const fs = require("fs");
const path = require("path");
fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("Данная папка существует");
  }
});
fs.readdir(path.join(__dirname, "files"), (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  for (let i = 0; i < files.length; i++) {
    fs.copyFile(
      path.join(__dirname, "files", files[i]),
      path.join(__dirname, "files-copy", files[i]),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Файл из папки успешно скопирован");
      }
    );
  }
});
