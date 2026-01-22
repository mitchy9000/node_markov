const fs = require("fs");
const axios = require("axios");
const MarkovMachine = require("./markov");

function generateText(text) {
  const mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

const type = process.argv[2];
const path = process.argv[3];

if (type === "file") {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${path}:`, err.message);
      process.exit(1);
    }
    generateText(data);
  });
}

else if (type === "url") {
  axios.get(path)
    .then(resp => generateText(resp.data))
    .catch(err => {
      console.error(`Error fetching URL ${path}:`, err.message);
      process.exit(1);
    });
}

else {
  console.error("Usage: node makeText.js file <path> OR url <url>");
  process.exit(1);
}
