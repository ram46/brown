var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var _ = require('underscore')
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

app.get('/monitor', monitor);

app.get('/getServiceAddressesByPort', getServiceAddressesByPort);
/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function monitor(req,res) {
  request('http://localhost:9001/getMicroservices', (error, response, body) => {
    if (error) res.send('Error while getting microservices')
    else res.send(body)
  })
}


function getServiceAddressesByPort(req, res) {
    request('http://localhost:9001/getMicroservices', (error, response, body) => {
    if (error) res.send('Error while getting microservices')
    if(body) {
        console.log('************ in side getAllServiceAddresses ')

        var grouped_by_port = _.groupBy(JSON.parse(body), 'port')
        console.log(grouped_by_port)
        res.send(grouped_by_port)
    }
  })
}


function restrict() {
// code here if cookie is verified
  // next()
// else redirect to login page
}

function getItems(req, res) {
  // req.params.id
}


function getProducts(arg, restrict, cb) {

}


function login(username, password) {
  // req.body
}


function signup() {

}

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

