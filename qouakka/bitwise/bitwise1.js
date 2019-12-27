/*
let val = 1;
console.log(val)
val = val << 1;
console.log(val)
*/
let bits = { v1: false, v2: true }

let bitsToInt = (...bits) => {
    let val = 0;
    if (bits) bits.forEach(bit => val = (val << 1) | bit);
    return val;
}

let val;
val = bitsToInt(bits.v1, bits.v2)
console.log(val)