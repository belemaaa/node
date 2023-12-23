const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'files', 'testfile.txt'), 'utf-8', (err, data) => {
    if (err) throw err
    console.log(data)
})

const write_data = "This is a write operation task"
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), write_data, (err) => {
    if (err) throw err
    console.log('Write operation complete')
})

const append_data = "\nAppending content to file"
fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), append_data, (err) => {
    if (err) throw err
    console.log('Append operation complete')
})


// exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`Uncaught errors: ${err}`)
    process.exit(1)
})

console.log(path.join(__dirname, 'files', 'testfile.txt'))