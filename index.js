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
			//decideMessage(sender, text)

			if (event.postback) {
				let text = JSON.stringify(event.postback)
				decideMessage(sender, text)
				continue
			}
		}
	}
	res.sendStatus(200)
})

function decideMessage(sender, text1) {
	let text = text1.toLowerCase()
	if (text.includes("hi") || text.includes("hello") ) {
		sendText(sender, "Hello, Hope you doing good, how can I  ")
		sendButtonMessage(sender, text)

	} else if (text.includes("help")) {

	} else {
		sendText(sender, "How can i help you ?")
	}
}

function sendButtonMessage(sender, text) {
	let messageData = {
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://www.messenger.com",
            "title":"Visit Messenger"
          }
        ]
      }
    }
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










