'use strict'


console.log('%cmemento mori', 'background:#000000;color:#DDDDDD')


// general

const src = 'https://ultra-mechs.herokuapp.com/game'
const game = document.querySelector('#game')


const getBlob = src =>
{
	return fetch(src)
		.then(response => response.blob())
		.then(blob => URL.createObjectURL(blob))
		.catch(console.error);
}


game.data = await getBlob(src)


// function httpGet(theUrl)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }
// // const dataURLtoFile = (dataurl, filename) =>
// // {
// // 	const arr = dataurl.split(',')
// // 	const mime = arr[0].match(/:(.*?);/)[1]
// // 	const bstr = atob(arr[1])
// // 	let n = bstr.length
// // 	const u8arr = new Uint8Array(n)
		
// // 	while (n--) u8arr[n] = bstr.charCodeAt(n)
	
// // 	return new File([u8arr], filename, { type: mime })
// // }

// // //Usage example:
// // var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt')
// // console.log(file)