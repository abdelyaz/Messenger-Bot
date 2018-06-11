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
			decideMessage(sender, text)
			//sendText(sender, text.substring(0, 100) + ", how can i help you ?")
		}

		if (event.postback) {
			let text = JSON.stringify(event.postback)
			decideMessage(sender, text)
			continue
		}
	}
	res.sendStatus(200)
})

function decideMessage(sender, text1) {
	let text = text1.toLowerCase()
	if (text.includes("hi")) {
		sendText(sender, "Hello !!")
	} else {
		sendText(sender, "Whaat ??")
		sendRequest(sender, "What is you favorite season ?")
	}
}


function sendText(sender, text) {
	let messageData = {text: text}
	sendRequest(sender, messageData)
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
            "type":"postback",
						"title":"Test 1",
						"payload":"Test 1"
					},
					{
            "type":"postback",
						"title":"Test 2",
						"payload":"Test 2"
          }
        ]
      }
    }
	}
	sendRequest(sender, messageData)
}

function sendRequest(sender, messageData) {
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










