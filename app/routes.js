var Visitors = require('./models/visitors');
var Twitter = require('twitter');

function getVisitors(res) {
    Visitors.find(function (err, visitor) {
        if (err) {
          res.send(err);
        }
        res.json(visitor);
    });
};

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const getTweets = function(res){
  var params = {screen_name: 'fullstacknic'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error) console.log(error)
    if (!error) {
      console.log("tweets",tweets);
      res.json(tweets);
    }
  });
};

module.exports = function (app) {

    app.get('/api/twitter', function (req, res) {
      getTweets(res);
    });

    // app.get('/api/resume', function (req, res) {
    //   res.json('../../resume.pdf');
    // });

    app.get('/api/visitors', function (req, res) {
      getVisitors(res);
    });

    app.post('/api/visitors', function (req, res) {
      console.log("posted : ", req);
        Visitors.create({
            name: req.body.name,
        }, function (err, todo) {
            if (err)res.send(err);
            getVisitors(res);
        });
    });

    app.delete('/api/visitors/:visitorId', function (req, res) {
        Visitors.remove({
            _id: req.params.visitorId
        }, function (err, todo) {
            if (err) res.send(err);
            getVisitors(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('/*', function (req, res) {
      res.sendFile('index.html', { root: './public' })
      // res.sendFile(__dirname + '/public/index.html'); // old way
    });
};
