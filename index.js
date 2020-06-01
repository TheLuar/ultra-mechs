'use strict'


const express = require('express')
const http = require('http')
const fs = require('fs')


const app = express()
const server = http.createServer(app)


const keys = require('./whitelist.json')
const game = 'data:application/x-shockwave-flash;base64,' + fs.readFileSync('./client.swf').toString('base64')


// console.log(keys)

server.listen(process.env.PORT || 3000)

app.get('/', (req, res) =>
{
	const { k } = req.query
	if (!keys.hasOwnProperty(k)) return res.status(400).send('👁️')
	res.send('Accessing as ' + keys[k])
})
