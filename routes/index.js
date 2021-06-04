const https = require('https');
var express = require('express');
const { google } = require('googleapis');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const got = require('got');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/https', function(request, res){
  const options = {
    hostname: 'example.com',
    port: 443,
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
    },
  };

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.end();

  res.send('HTTPS req sent, check console logs');
});

router.get('/got', function(req, res){
(async () => {
  const { body } = await got('https://example.com', {
    request: (url, options, callback) => {
      console.log(url.href); // , options
      return https.request(url, options, callback);
    },
    throwHttpErrors: false,
  });

  console.log(body);
})();

  res.send('GOT req sent, check console logs');
});



module.exports = router;
