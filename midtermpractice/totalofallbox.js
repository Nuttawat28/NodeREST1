function sum(...args) {
    let sum = 0;
    for (let arg of args) sum += arg;
    return sum;
}


let x = sum(4, 9, 16, 25, 29, 100, 66, 77);
totalVolume([4, 2, 4], [3, 3, 3], [1, 1, 2], [2, 1, 1])
totalVolume([2, 2, 2], [2, 1, 1])
totalVolume([1, 1, 1])
