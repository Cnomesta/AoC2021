const fs = require('fs');

const array = fs 
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((x) => Boolean(x))
    .map((x) => parseInt(x));

    let output = 0

    for (var i = 0; i < 2000; i++){
        let curr = array[i]
        let comp = array[i + 1]
        if (curr < comp){
            output ++;
        }
        console.log(i, output)
    }