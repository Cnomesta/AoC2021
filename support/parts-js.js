const fs = require("fs");

const array = fs
    .readFileSync(".txt", {
        encoding: "utf-8"
    })
    .replace(/\r/g, "")
    .split("\n\n")
    .filter((x) => Boolean(x))
    .map((x) => x);