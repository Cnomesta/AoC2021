let maxOcc = {
    Poly: null,
    occured: 0
};
for (let k = 0; k < newPoly.length; k++) {
    const res = newPoly.reduce((acc, el) => {
        acc[el] = acc[el] ? acc[el] + 1 : 1;
        if (acc[el] > maxOcc.occured) {
            maxOcc = {
                Poly: el,
                occured: acc[el]
            };
        }
        return acc;
    }, {});
}
console.log(maxOcc);