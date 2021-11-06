const fs = require("fs");
const readline = require("readline");
const process = require("process");
const path = require("path");
const { stdout } = require("process");

let filePath = path.join(__dirname, "test.txt");
let writableStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your text, please\n", (answer) => {
  rl.on("line", (input) => {
    if (input === "exit") {
      rl.close();
    }
  })
    .on("close", () => {
      stdout.write("Bye-Bye!");
    })
    .on("SIGINT", () => {
      rl.close();
    });
  writableStream.write(answer);
});
