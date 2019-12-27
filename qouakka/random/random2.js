let int = (max, min, include) => {
    let imax = max || 0
    let imin = min || 0;
    let ret;
    //return 
    if (include) {
        if (include.min && include.max) {
            // [min, max] - OK.
            ret = imin + Math.floor(Math.random() * (imax - imin + 1));
        }
        else if (!include.min && include.max) {
            // (min, max] - OK.
            ret = imin + Math.ceil(Math.random() * (imax - imin));
        }
        else if (include.min && !include.max) {
            // [min, max) - OK.
            ret = imin + Math.floor(Math.random() * (imax - imin));
        }
        else {
            // (min, max) - OK.
            ret = imin + Math.ceil(Math.random() * (imax - imin - 1));
        }
    }
    else {
        // default [min, max]
        ret = imin + Math.floor(Math.random() * (imax - imin + 1));
    }
    return ret
}

let run = (min, max, num_tests, opt) => {
    let obj = {}
    // init counter(s)
    for (let i = min; i <= max; i++) obj['v' + i.toString()] = 0;
    // loop
    for (let i = 0; i < num_tests; i++) {
        let rd;
        rd = int(max, min, opt)
        // init counter if not exists
        if (!obj['v' + rd.toString()]) obj['v' + rd.toString()] = 0;
        // increase counter value
        obj['v' + rd.toString()]++;
    }
    return obj;
}

//console.log('random (max):', int(2))
//console.log('random (max, min):', int(2, 1))

let min = 10;
let max = 15;
let num_tests = 10000;

let opt;
opt = { min: true, max: true }
//console.log('default:', int())
//console.log('max:', int(max))
//console.log('max, min:', int(max, min))
console.log('max, min:', int(max, min, opt))

let obj;
opt = undefined; // default
obj = run(min, max, num_tests, opt)
console.log('default [min, max]', obj)

opt = { min: true, max: true }
obj = run(min, max, num_tests, opt)
console.log('[min, max]', obj)

opt = { min: false, max: true }
obj = run(min, max, num_tests, opt)
console.log('(min, max]', obj)

opt = { min: true, max: false }
obj = run(min, max, num_tests, opt)
console.log('[min, max)', obj)

opt = { min: false, max: false }
obj = run(min, max, num_tests, opt)
console.log('(min, max)', obj)

