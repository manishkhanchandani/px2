const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
var request = require('request');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get('/search.xml', function(req, res){
							console.log('q: ', req.query);
	let url = 'https://www.goodreads.com/search.xml?key='+req.query.key+'&q='+encodeURIComponent(req.query.q);
	console.log('url is ', url);
  	request(url, function (error, response, body) {
	  res.set('Content-Type', 'text/xml');
	  res.send(body);
	});
  
});

app.get('/book/isbn/:id', function(req, res){
	console.log('q2: ', req.query);
	let url = 'https://www.goodreads.com/book/isbn/'+req.params.id+'?key='+req.query.key;
	console.log('url2 is ', url);
  	request(url, function (error, response, body) {
	  res.set('Content-Type', 'text/xml');
	  res.send(body);
	});
  
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Project listening on ${port}`);