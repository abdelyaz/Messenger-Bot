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

let token = "<YOUR_FACEBOOK_PAGE_TOKEN>"

// Facebook

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "<YOUR_VERIFY_TOKEN>") {
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
	if (text.includes("t-shirts")) {
		sendButtonTshirt(sender)
	} else if (text.includes("shoes")) {
		sendButtonShoes(sender)
	} else if (text.includes("stickers")) {
		sendButtonStickers(sender)
	}
	else {
		sendButtonMessage(sender, "Would you like to see :")
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
        "text": text,
        "buttons":[
          {
            "type":"postback",
						"title":"T-shirts",
						"payload":"t-shirts"
					},
					{
            "type":"postback",
						"title":"Shoes",
						"payload":"shoes"
					},
					{
            "type":"postback",
						"title":"Stickers",
						"payload":"stickers"
          }
        ]
      }
    }
	}
	sendRequest(sender, messageData)
}

function sendButtonTshirt(sender, text) {
	let messageData = {
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title": "We have the right t-shirts for all code lovers.",
            "image_url":"https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/26167488_139883043463219_5905871390861314564_n.jpg?_nc_cat=0&oh=87c6678977d536862c165456990810f7&oe=5BA635D3",
						"subtitle":"We have the right t-shirts for everyone.",
						"buttons":[
              {
                "type":"web_url",
                "url":"https://www.smile.eu/en",
                "title":"View Details"
							},{
                "type":"postback",
                "title":"Check Other Products",
                "payload":"other"
              }
						]
					}
        ]
      }
    }
	}
	sendRequest(sender, messageData)
}

function sendButtonShoes(sender, text) {
	let messageData = {
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title": "New arrival Shoes",
            "image_url":"https://www.dhresource.com/albu_793519722_00-1.0x0/new-arrival-casual-shoes-men-leisure-boat.jpg",
						"subtitle":"We have the right shoes for everyone.",
						"buttons":[
              {
                "type":"web_url",
                "url":"https://www.smile.eu/en",
                "title":"View Details"
							},{
                "type":"postback",
                "title":"Check Other Products",
                "payload":"other"
              }
						]
					}
        ]
      }
    }
	}
	sendRequest(sender, messageData)
}

function sendButtonStickers(sender, text) {
	let messageData = {
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title": "Awesome Stickers",
            "image_url":"https://ssli.ebayimg.com/images/g/xy8AAOSwyytaotXf/s-l1600.jpg",
						"subtitle":"We have the right stickers for everyone.",
						"buttons":[
              {
                "type":"web_url",
                "url":"https://www.smile.eu/en",
                "title":"View Details"
							},{
                "type":"postback",
                "title":"Check Other Products",
                "payload":"other"
              }
						]
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










