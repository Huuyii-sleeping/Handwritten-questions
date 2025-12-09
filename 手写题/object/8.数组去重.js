// set
function uniqueArrSet(arr) {
  return [...new Set(arr)];
}

// filter
function uniqueArrFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function uniqueArrReduce(arr) {
  return arr.reduce((accumulator, current) => {
    if (!accumulator.includes(current)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
}

const arr = [1, 2, 3, 4, 5, 6, 6, 6, 3, 2, 6];
console.log(uniqueArrReduce(arr));
