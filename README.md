# Messenger-Bot

Messenger-Bot is a chatbot for facebook messenger created with Node.js

## Getting Started

Clone the project and install the dependencies with : 

```
npm install
```

### Prerequisites

* [Node.js](https://nodejs.org/en/) - Open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side
* [npm](https://www.npmjs.com/) - Package manager for the JavaScript programming language
* [Heroku](https://heroku.com) - Cloud platform to deploy your project


## Deployment

Deploy your app using terminal: 

```
git init
git add .
git commit -m "Fisrt commit"
heroku create
git push heroku master
```

### Installing

1 - Install all dependencies :

```
npm install
```
  
2 - Go to [Facebook for Developers](https://developers.facebook.com/) and Add New App
3 - Set up Messenger
4 - Token Generation : select your facebook page and copy token generated and paste it in *index.js* 

```
let token = "<YOUR_FACEBOOK_PAGE_TOKEN>"
```

5 - Setup Webhooks :

* Callback URL : your heroku app link where you deployed your ChatBot app
* Verify Token : enter your custom token and make sure is the same in *index.js* 

```
<YOUR_VERIFY_TOKEN>
```
* Subscription Fields, select :

```
messages
messaging_postbacks
messaging_optins
message_deliveries
```
Then Verify and Save

6 - Change the app Status from 'In Development'  to 'Live'


## Running the tests

Send any message to your facebook page where you set your chatbot and enjoy talking to your robot.


### Go further

In this app I used only Postback Button and Generic Template, you can customize the Bot's answears using [Facebook Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api/)


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Abdelkader EL YAZIDI** - *Front-End developer* - [Abdelyaz](https://github.com/abdelyaz)
