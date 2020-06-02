'use strict'


const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')


const app = express()
const server = http.createServer(app)


const keys = require('./whitelist.json')
const game = 'data:application/x-shockwave-flash;base64,' + fs.readFileSync('./client/client.swf').toString('base64')


server.listen(process.env.PORT || 3000)

app.get('/game', (req, res) =>
{
	// const { k } = req.query
	// if (!keys.hasOwnProperty(k)) return res.status(400).send('👁️')
	// res.send(game)
	res.sendFile(path.join(__dirname + '/client/client.swf'))
})

app.get('/script', (req, res) =>
{
	res.sendFile(path.join(__dirname + '/client/client.js'))
})

app.get('/style', (req, res) =>
{
	res.sendFile(path.join(__dirname + '/client/style.css'))
})

console.log(keys)
