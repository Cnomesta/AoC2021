const fs = require('fs');

const array = fs 
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((x) => Boolean(x))
    .map((x) => parseInt(x));

let output = 0

for (var i = 0; i < 2000; i++){
    let first = array[i];
    let second = array[i + 1];
    let third = array[i + 2];
    let forth = array[i + 1];
    let fifth = array[i + 2];
    let sixth = array[i + 3];

    let curr = first + second + third;
    let next = forth + fifth + sixth;

    //let curr = array[i]
    //let comp = array[i + 1]
    if (curr < next){
        output ++;
    }
    console.log(i, output)
}