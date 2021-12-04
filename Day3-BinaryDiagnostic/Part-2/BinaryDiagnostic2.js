const fs = require('fs');

const array = fs 
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((x) => Boolean(x));

const length = array[0].length;

function getCount(array){
    const zero = Array(length).fill(0);
    const one = Array(length).fill(0);
    
    for (const set of array) {
        const bits = [... set];
        bits.forEach((bit, index) => {
            if (bit === "0") {
                zero[index]++;
            } else {
                one[index]++;
            }
        });
    }
    return{zero, one};
}

function part1 () {
    const {zero, one} = getCount(array);
    let gr = ""; // Most Common
    let er = ""; // Least Common
    
    for (let i = 0; i < length - 1; i++) {
        let bit = 0;
        if (one[i] > zero[i]) {
            bit = 1;
        }
        gr += bit;
        er += bit === 1 ? 0 : 1;
    }
    
    console.log(parseInt(gr, 2) * parseInt(er, 2));
}
part1();

function getOxyRate(array, index = 0) {
    const {zero, one} = getCount(array);
    let most = "1";
    if (zero[index]> one[index]){
        most = "0"
    }
    const filterd = array.filter((set) => set[index] === most);
    if(filterd.length === 1) {
        return filterd[0];
    }
    return getOxyRate(filterd, index+1)
}

function getCO2Rate(array, index = 0) {
    const {zero, one} = getCount(array);
    let least = "0";
    if (zero[index]> one[index]){
        least = "1"
    }
    const filterd = array.filter((set) => set[index] === least);
    if(filterd.length === 1) {
        return filterd[0];
    }
    return getCO2Rate(filterd, index+1)
}

function part2() {
    const oxyR = getOxyRate(array);
    const CO2R = getCO2Rate(array);
    console.log(parseInt(oxyR, 2), parseInt(CO2R, 2))
    console.log(parseInt(oxyR, 2) * parseInt(CO2R, 2))
}
part2();