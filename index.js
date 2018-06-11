'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

let token = "EAACbEnTwY1cBAOZBeeRZB7IVzKvmuqaZCjYVJGWjAIysXK1wlOSnDZC2b0f2JLi4sH06u9clDJDkT18pZAp6Y5mRyqdlzSaKLqHoUZCxDlphueq0dn3ZCnik0i82tksoOOS9tj0ukbRLor9msJF9V0TcOOMYEkv53H8traRIj376QZDZD"

// Facebook

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "blondiebytes") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			//sendText(sender, text.substring(0, 100) + ", how can i help you ?")
			decideMessage(sender, text)
		}
	}
	res.sendStatus(200)
})

function decideMessage(sender, text1) {
	let text = text1.toLowerCase()
	if (text) {
		sendText(sender, `Hello, how can I help you ?
1 - Do you want to buy a t-shirt ?
2 - Available Stock ?
3 - A T-shirt Price ?`)
	} else if (text.includes("buy")) {
		sendText(sender, "Would you please send us : Size, Color, Your name adn Shipping adress.")
	} else if (text.includes("available")) {
		sendText(sender, "We still have 3 T-Shirt")
	} else if (text.includes("price")) {
		sendText(sender, "T-shirt 1 : 19.96$ ")
	}
}


function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}
app.listen(app.get('port'), function() {
	console.log("running: port")
})










