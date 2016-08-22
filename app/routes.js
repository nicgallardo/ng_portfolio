var Visitors = require('./models/visitors');

function getVisitors(res) {
    Visitors.find(function (err, visitor) {
        if (err) {
          res.send(err);
        }
        res.json(visitor);
    });
};

module.exports = function (app) {

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
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
