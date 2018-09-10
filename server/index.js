var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var _ = require('underscore')
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var session = require('express-session')

var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    port: 3306,
    user: 'session_test',
    password: 'password',
    database: 'session_test'
};


var sessionStore = new MySQLStore(options);


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

app.get('/monitor', monitor);

app.get('/getServiceAddressesByPort', getServiceAddressesByPort);

app.post('/login', login);






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


// function verify_IDToken(token) {
//   return new Promise((resolve, reject ) => {
//     const {OAuth2Client} = require('google-auth-library');
//     const client = new OAuth2Client('964221102096-7fq0ldg3srrav3bqpe6hurmgqj5hkvm9.apps.googleusercontent.com');
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: '964221102096-7fq0ldg3srrav3bqpe6hurmgqj5hkvm9.apps.googleusercontent.com',
//     });
//   });
// }


const CLIENT_ID = '15484339292-sl85fv09m51i4q69ecfgtu392266fm4o.apps.googleusercontent.com'

// const CLIENT_ID = '15484339292-sl85fv09m51i4q69ecfgtu392266fm4o.apps.googleusercontent.com'

function verify_IDToken(token, cb) {

  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client(CLIENT_ID);

  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // console.log(userid)
    if (userid) cb(null, userid)
    else cb('not found', null)

    }
    verify()
}


// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  key: 'brown_session',
  secret: 'keyboard cat',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { name:'brown', secure: false }
}))



function login(req, res) {
  // console.log(req)
  var id_token = req.body.profile.token.id_token
  if (id_token) {
    verify_IDToken(id_token, (err, userid) => {
      // console.log('**********')
      // console.log(err, userid)
      if (userid)
        console.log('ABSCCDS ' + userid)
        req.session.regenerate(function(err) {
        req.session.user = userid;

        console.log('writing cookie')
        console.log(res.cookie)

        res.cookie('brwon', 'cookieValue')
      })
    })
  }
  // res.send('hit the /login route')
}


var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

