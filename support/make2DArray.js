function emptyArray(length) {
    var arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = emptyArray.apply(this, args);
    }

    return arr;
}

function make(width, height) {
    let array = emptyArray(height, width, 1);
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            array[x][y] = '.';
        }
    }
    return array;
}