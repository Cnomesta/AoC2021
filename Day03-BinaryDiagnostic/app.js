require('../util/time')
require('../util/fsPull')

const array = singleDepth('input.txt');

function getCount(array) {
    const zero = Array(array[0].length).fill(0);
    const one = Array(array[0].length).fill(0);
    for (const set of array) {
        const bits = [...set];
        bits.forEach((bit, index) => {
            if (bit === "0") { zero[index]++; }
            else { one[index]++; }
        });
    }
    return [zero, one];
}

function part1() {
    const [zero, one] = getCount(array);
    let gr = "";
    let er = "";
    for (let i = 0; i < array[0].length; i++) {
        if (one[i] > zero[i]) { gr += 1; er += 0 }
        else { gr += 0; er += 1; }
    }
    let res = 0;
    res = parseInt(gr, 2) * parseInt(er, 2);
    return res;
}

function part2() {
    let mF = "";
    let lF = "";
    let res = 0;
    let mostFilterd = [...array];
    let leastFilterd = [...array];
    let zerozero = getCount(array)[0]
    let zeroone = getCount(array)[1]
    let onezero = getCount(array)[0]
    let oneone = getCount(array)[1];
    for (let i = 0; mostFilterd.length >= 1 || leastFilterd.length >= 1; i++) {
        let most = "1";
        let least = "0";
        if (zerozero[i] > zeroone[i]) { least = "1"; }
        if (onezero[i] > oneone[i]) { most = "0"; }
        mostFilterd = mostFilterd.filter((set) => set[i] === most);
        leastFilterd = leastFilterd.filter((set) => set[i] === least);
        if (mostFilterd.length === 1) { mF = mostFilterd[0]; }
        if (leastFilterd.length === 1) { lF = leastFilterd[0]; }
        if (leastFilterd.length >= 1) { zerozero = getCount(leastFilterd)[0]; zeroone = getCount(leastFilterd)[1] }
        if (mostFilterd.length >= 1) { onezero = getCount(mostFilterd)[0]; oneone = getCount(mostFilterd)[1] }
    }
    res = parseInt(mF, 2) * parseInt(lF, 2);
    return res;
}

timeScript(part1(), 1)
timeScript(part2(), 2)