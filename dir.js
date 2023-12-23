const fs = require('fs')
const path = require('path')

// fs.rename(path.join(__dirname, 'dr.js'), (path.join(__dirname, 'dir.js')), (err) => {
//     if (err) throw err
//     console.log('name updated')
// })

if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err
        console.log('New directory created')
    })
}

if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err
        console.log('New directory deleted')
    })
}