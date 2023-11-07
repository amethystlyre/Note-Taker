//Copied from Week 11-Express\01-Activities\28-Stu_Mini-Project\Develop\helpers\fsUtils.js and modified

const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readDB = util.promisify(fs.readFile);

//Write new notes into database
const writeDB = (dbFile, notes) =>
  fs.writeFile(dbFile, JSON.stringify(notes, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${dbFile}`)
  );


module.exports = { readDB, writeDB};