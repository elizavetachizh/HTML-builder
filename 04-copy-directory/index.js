const fs = require("fs");
const path = require("path");
fs.rm(
  path.join(__dirname, "files-copy"),
  //force <boolean> Когда true, исключения будут игнорироваться, если pathне существует. По умолчанию: false .
  //recursive <boolean> Если true, выполнить рекурсивное удаление. В рекурсивном режиме операции повторяются в случае сбоя. По умолчанию: false .
  //fs.rm Асинхронно удаляет файлы и каталоги (по образцу стандартной rm утилиты POSIX ). Обратному вызову завершения не передаются никакие аргументы, кроме возможного исключения.
  { recursive: true, force: true },
  (err) => {
    if (err) {
      return console.error(err);
    }
    fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return;
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
  }
);
