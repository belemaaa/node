const fs = require('fs')

fs.readFile('./files/testfile.txt', (err, data) => {
    if (err) throw err
    console.log(data.toString())
})