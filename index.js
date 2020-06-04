const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
const requestIp = require('request-ip');

app.use(requestIp.mw())
app.use((req, res) =>
{
	console.log(req.clientIp)
	res.send('Killin found you ' + req.clientIp)
})

server.listen(process.env.PORT || 3000)

// const keys = require('./whitelist.json')
// // const game = 'data:application/x-shockwave-flash;base64,' + fs.readFileSync('./client/client.swf').toString('base64')


// // app.use(cors())

// app.get('/bmmClient.swf', (req, res) =>
// {
// 	// const { k } = req.query
// 	// if (!keys.hasOwnProperty(k)) return res.status(400).send('👁️')
// 	// res.send(game)
// 	res.sendFile(path.join(__dirname + '/client/bmmClient.swf'))
// })

// app.get('/script', (req, res) =>
// {
// 	res.sendFile(path.join(__dirname + '/client/client.js'))
// })

// app.get('/style', (req, res) =>
// {
// 	res.sendFile(path.join(__dirname + '/client/style.css'))
// })

// app.get('/ip', (req, res) =>
// {
// 	res.send(req.ips)
// })

// server.listen(process.env.PORT || 3000)


// console.log(keys)
