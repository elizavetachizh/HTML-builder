const path = require("path");
const {
  mkdir,
  readdir,
  readFile,
  createReadStream,
  writeFile,
  appendFile,
  copyFile,
} = require("fs");

mkdir(
  path.join(__dirname, "project-dist"),
  { recursive: true },
  function (err) {
    if (err) {
      console.error(err);
      return;
    }
  }
);

let dataTemplate = createReadStream(
  path.join(__dirname, "template.html"),
  "utf-8"
);
readdir(path.join(__dirname, "components"), "utf-8", (err, data) => {
  for (let i = 0; i < data.length; i++) {
    readFile(path.join(__dirname, "components", data[i]), (err, dataart) => {
      if (i == dataart.length - 1) {
        dataTemplate.on("data", (chunk) => {
          let template = chunk;

          let index = path.basename(data[i]).lastIndexOf(".");

          let nameWithoutExtension = path.basename(data[i]).slice(0, index);

          template = template.replace(`{{${nameWithoutExtension}}}`, dataart);

          writeFile(
            path.join(__dirname, "project-dist", "index.html"),
            template,
            (err) => {}
          );
        });
      }
    });
  }
});

//третий пункт

writeFile(path.join(__dirname, "project-dist", "style.css"), "", (err) => {
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
          appendFile(
            path.join(__dirname, "project-dist", "style.css"),
            data,
            (err) => {
              if (err) console.error(err);
            }
          );
        });
      }
    }
  }
);

//4 пункт
mkdir(
  path.join(__dirname, "project-dist", "assets"),
  { recursive: true },
  (err) => {}
);
readdir(path.join(__dirname, "assets"), (err, files) => {
  for (let i = 0; i < files.length; i++) {
    mkdir(
      path.join(__dirname, "project-dist", "assets", files[i]),
      { recursive: true },
      (err) => {}
    );
    readdir(
      path.join(__dirname, "assets", files[i]),
      { withFileTypes: true },
      (err, filedata) => {
        for (let j = 0; j < filedata.length; j++) {
          readFile(path.join(__dirname, "assets", files[i]), (err, data) => {
            data = filedata[j].name;

            copyFile(
              path.join(__dirname, "assets", files[i], data),
              path.join(__dirname, "project-dist", "assets", files[i], data),

              (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              }
            );
          });
        }
      }
    );
  }
});
