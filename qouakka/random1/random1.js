let random = (array) => {
    let ret;
    if (array && array.length > 0) {
        let len = array.length;
        ret = array[Math.floor(Math.random() * len)]
    }
    return ret;
}

let items = [
    { name: 'P1', age: 10},
    { name: 'P2', age: 20},
    { name: 'P3', age: 30},
    { name: 'P4', age: 40},
    { name: 'P5', age: 50},
    { name: 'P6', age: 60},
    { name: 'P7', age: 70},
    { name: 'P8', age: 90},
    { name: 'P9', age: 90}
]
let rand1 = random(items)
console.log('random item:', rand1)

let obj = {}
items.map(item => item.name).forEach(name => obj[name] = 0)

for (let i = 0; i < 10000; i++) {
    let rd = random(items)
    obj[rd.name]++;
}

console.log(obj)