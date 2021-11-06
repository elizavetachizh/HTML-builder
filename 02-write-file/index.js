const fs = require("fs");
const readline = require("readline");
const process = require("process");
const path = require("path");

const { stdout } = require("process");
//Создать экземпляр readline.Interface

//
// const contect = "test";
// fs.writeFile("2test.txt", contect, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   //файл записан успешно
// });

// process.stdin.on("data", (data) => {
//   fs.appendFile(path.join(__dirname, "2test.txt"), data.toString(), (err) => {
//     if (err) throw err;
//   });

let filePath = path.join(__dirname, "test.txt");
let writableStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Type your text\n", (answer) => {
  rl.on("line", (input) => {
    if (input === "exit") {
      rl.close();
    }
  })
    .on("close", () => {
      stdout.write("Bye");
    })
    .on("SIGINT", () => {
      rl.close();
    });
  writableStream.write(answer);
});
