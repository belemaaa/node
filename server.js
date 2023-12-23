const os = require('os')
console.log(os.type())
console.log(os.hostname())
console.log(os.homedir())
console.log(os.version())

const path = require('path')
console.log(path.dirname(__filename))
console.log(__dirname)
console.log(__filename)

const math = require('./math')
const sum = math.add(2, 3)
console.log(sum)