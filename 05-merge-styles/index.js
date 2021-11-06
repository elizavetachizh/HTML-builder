//const fs = require("fs");

const { readdir, writeFile, readFile, appendFile } = require("fs");
const path = require("path");
writeFile(path.join(__dirname, "bundle.css"), "", (err) => {
  if (err) {
    console.error(err);
  }
});
readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  // каждый эл-т массива будет объект, который показывает всю инфу и все свои свойства
  (err, files) => {
    if (err) {
      console.error(err);
    }
    for (let file of files) {
      if (file.isFile() && path.extname(file.name) === ".css") {
        readFile(path.join(__dirname, "styles", file.name), (err, data) => {
          if (err) {
            console.error(err);
          }
          //используем appendFile что бы файл не перезаписывался(), а именноЗАПИСЫВАЛСЯ, то есть дополнялся данными.
          appendFile(path.join(__dirname, "bundle.css"), data, (err) => {
            if (err) console.error(err);

            console.log("файл успешно добавлен");
          });
        });
      }
    }
  }
);
