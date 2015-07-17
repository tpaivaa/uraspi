var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res, next) {
	res.send('<h2> uRaspi </h2>');
})

app.post('/login', urlencodedParser, function (req, res, next) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})


app.listen(process.env.NODEJS_PORT || 3000, function () {
	console.log('uraspi server running on port ' + (process.env.NODEJS_PORT || 3000));
});