'use strict'

const fs = require('fs')

module.exports = path =>
{
	const content = fs.readFileSync(path).toString()
	const match = content.match(/(.+) (.+)/g)
	const keyMap = {}

	for (const a of match)
	{
		const [user, key] = a.split(' ')
		keyMap[key] = user
	}

	return keyMap
}