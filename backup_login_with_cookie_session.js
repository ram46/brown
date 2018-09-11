var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const {OAuth2Client} = require('google-auth-library');


var cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'brown-session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const CLIENT_ID = '15484339292-sl85fv09m51i4q69ecfgtu392266fm4o.apps.googleusercontent.com'


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

app.get('/monitor', monitor);
app.get('/getServiceAddressesByPort', getServiceAddressesByPort);
app.post('/login', login);
app.get('/logout', logout);


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function restrict() {
}


function login(req, res, next) {
  var token = req.body.profile.token.id_token;
  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client(CLIENT_ID);

  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return userid

  }

  verify().then((userid) => {
    console.log('******** inside then ***** ', userid)
    if (!req.session.userid) {
      req.session.userid = userid
      res.end('created new session')
    }
    else {
      res.end('have a valid session')
    }

  })
}


function logout(req, res, next) {
  req.session = null
  res.send('session ended')

}



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
        var grouped_by_port = _.groupBy(JSON.parse(body), 'port')
        console.log(grouped_by_port)
        res.send(grouped_by_port)
    }
  })
}





var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

