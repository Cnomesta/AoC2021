function count(array) {
    let a = [],
        b = [],
        arr = [...array],
        prev;
    arr.sort();
    for (let element of arr) {
        if (element !== prev) {
            a.push(element);
            b.push(1);
        } else ++b[b.length - 1];
        prev = element;


    }
    return [a, b];
}