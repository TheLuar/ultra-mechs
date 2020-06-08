'use strict'


const express = require('express')
const path = require('path')


const app = express()


app.listen(process.env.PORT || 3000)

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
