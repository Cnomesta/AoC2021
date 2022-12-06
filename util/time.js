globalThis.timeScript = function time(input, number) {
  (() => {
    const begin = new Date(); // starts timer
    const output = input; // "partX" part that is currently being timed
    console.log("PART-", number, ":", "Out put info", output); //"output" === partX function return data (Befor c.log was used)
    const end = new Date() - begin; // ends timer
    console.info('Execution time: %dms', end); // time to finishing task
  })();
}