const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
// set port we are running our server on in dev or when we deploy it somewhere
// 3500 is locally

app.use('/', express.static(path.join(__dirname, '/public')))
// __dirname : global variable that node.js understand --> look inside current folder we are in
// We are telling express to find static file or image that we run on the server

app.use('/', require('./routes/root'))

app.all('*', (req,res)=> {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message : "404 Not Found, lol lol"})
    } else {
        res.type('txt').send('404 Not Found Lol hehe')
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))