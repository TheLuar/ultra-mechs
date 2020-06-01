'use strict'


const express = require('express')
const http = require('http')
const fs = require('fs')
const genKeys = require('./utils/genKeys')


const app = express()
const server = http.createServer(app)


const keys = genKeys('./whitelist.txt')
const game = 'data:application/x-shockwave-flash;base64,' + fs.readFileSync('./client.swf').toString('base64')


server.listen(3000)

app.get('*', (req, res) =>
{
	const { k } = req.query
	if (!keys.hasOwnProperty(k)) return res.status(400).send('👁️')
	res.send('Accessing as ' + keys[k])
})
