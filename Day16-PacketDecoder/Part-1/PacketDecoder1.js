const fs = require("fs");

const transmission = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")

function part1() {
    let input = transmission;
    let bin = "";
    for (let i = 0; i < input.length; i++) {
        bin += parseInt(input[i], 16).toString(2).padStart(4, '0');
    }
    let verSum = 0;
    let parsePacket = (str) => {
        verSum += parseInt(str.slice(0, 3), 2);
        let type = parseInt(str.slice(3, 6), 2);
        let spLength;
        let value = [];
        if (type == 4) {
            let ol = 6;
            let num = "";
            while (str[ol] == '1') {
                num += str.slice(ol + 1, ol + 5);
                ol += 5;
            }
            num += str.slice(ol + 1, ol + 5);
            return [ol + 5, parseInt(num, 2)];
        } else {
            let ltID = str[6];
            if (ltID == '0') {
                let length = parseInt(str.slice(7, 22), 2);
                let cnt = 0;
                while (cnt < length) {
                    let packet = parsePacket(str.slice(22 + cnt));
                    cnt += packet[0];
                    value.push(packet[1]);
                }
                spLength = 22 + length;
            } else {
                let length = parseInt(str.slice(7, 18), 2);
                let cnt = 18;
                for (let i = 0; i < length; i++) {
                    let packet = parsePacket(str.slice(cnt));
                    cnt += packet[0];
                    value.push(packet[1]);
                }
                spLength = cnt;
            }
            switch (type) {
                case 0:
                    return [spLength, value.reduce((a, b) => a + b)];
                case 1:
                    return [spLength, value.reduce((a, b) => a * b)];
                case 2:
                    return [spLength, value.reduce((a, b) => Math.min(a, b))];
                case 3:
                    return [spLength, value.reduce((a, b) => Math.max(a, b))];
                case 5:
                    return [spLength, (value[0] > value[1]) ? 1 : 0];
                case 6:
                    return [spLength, (value[0] < value[1]) ? 1 : 0];
                case 7:
                    return [spLength, (value[0] == value[1]) ? 1 : 0];
            }
        }
    }
    let res = parsePacket(bin);
    return verSum;
}

(() => {
    const begin = new Date(); // starts timer
    const output = part1(); // "partX" part that is currently being timed
    console.log("PART-1:", "Added version number of all packets:", output); //"output" === partX function return data (Befor c.log was used)
    const end = new Date() - begin; // ends timer
    console.info('Execution time: %dms', end); // time to finishing task
})();

//console.log(part1());
// let res = parsePacket(bin);
// console.log(verSum);
//return res[1];