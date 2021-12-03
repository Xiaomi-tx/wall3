const fs = require("fs");
const path =require("path");

const readFiles = () => {
  let dirArray = [];
  let count = 0;
  let fileArr = fs.readdirSync(__dirname);
  fileArr.forEach(file => {
    let statInfo = fs.statSync(path.resolve(__dirname, file));
    if (statInfo.isDirectory()) {
      dirArray.push({from : `./src/${file}`, to: `./${file}`});
    }
  })
  return dirArray;
}

module.exports = readFiles;
