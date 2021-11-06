const fs = require("fs");
const path = require("path");
// The firs tway
const rr = fs.createReadStream(path.join(__dirname, "text.txt"), "utf-8");
rr.on("readable", () => {
  console.log(`readable: ${rr.read()}`);
});

//the second way
fs.readFile(path.join(__dirname, "text.txt"), "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

//three way
const { stdout } = require("process");
const input = fs.createReadStream(path.join(__dirname, "text.txt"), "utf-8");
input.on("data", (data) => {
  stdout.write(data);
});
