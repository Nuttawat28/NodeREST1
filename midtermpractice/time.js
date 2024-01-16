function digitalclock(time) {
    min = Math.floor(time/60);
    hour = Math.floor(min/60);
    clock = (hour + ':' + min + '');
    return clock;
}

console.log(digitalclock(5025));
console.log(digitalclock(61201));
console.log(digitalclock(87000));