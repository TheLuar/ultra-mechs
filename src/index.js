'use strict'


// Packages

const express = require('express')
const path = require('path')
const sha256 = require('./utils/sha256')


// General

const app = express()
const keys = []


// functions

const init = () =>
{
	const whitelist = process.env.WL ? JSON.parse(process.env.WL) : require('./whitelist.json')

	keys.push(...whitelist.map(([user, pass]) => sha256(user + pass)))

	app.listen(process.env.PORT || 3000)
}

const isASCII = str => /^[\x00-\x7F]*$/.test(str)


// Routes
// app.use(express.static('public'))
// app.use()

app.get('/enter', (req, res) =>
{
	if (!req.query.key) return res.send('')
	
	const key = Buffer.from(req.query.key, 'base64').toString()

	if (!isASCII(key)) return res.send('Do not waste your time.')

	const hash = sha256(key)

	if (!keys.includes(hash)) return res.send('?')
	
	const entry = Buffer.from(key + ',' + new Date().getTime()).toString('base64')

	res.send('$' + entry)
})

app.get('/utils', (req, res) =>
{
	res.sendFile(path.resolve(__dirname, 'client', 'utils.js'))
})

app.get('/script', (req, res) =>
{
	res.sendFile(path.resolve(__dirname, 'client', 'script.js'))
})

app.get('/style', (req, res) =>
{
	res.sendFile(path.resolve(__dirname, 'client', 'style.css'))
})


// start

init()
