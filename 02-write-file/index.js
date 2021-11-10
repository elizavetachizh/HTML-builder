const fs = require("fs");

const path = require("path");
const { stdout, stdin, exit } = require("process");

const filePath = path.join(__dirname, "text.txt");
const writableStream = fs.createWriteStream(filePath);

stdout.write("Enter your text, please\n");
stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    close();
  }
  writableStream.write(data);
});
process.on("SIGINT", close);
function close() {
  stdout.write("Bye-Bye!");
  exit();
}
