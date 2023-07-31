// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// Create database
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/learning_mongo';
// Create server
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Server running at http://localhost:%s', port);
});
// Create routes
app.get('/', function(req, res) {
    res.send('<h1>Express Works</h1>');
});
// Create GET route for /comments
app.get('/comments', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);
            // Get collection of comments
            var collection = db.collection('comments');
            // Get all comments
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    res.send(err);
                }
                else if (result.length) {
                    res.send(result);
                }
                else {
                    res.send('No documents found');
                }
                // Close connection
                db.close();
            });
        }
    });
});
// Create GET route for /comments/:id
app.get('/comments/:id', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);
            // Get collection of comments
            var collection = db.collection('comments');
            // Get comment by id
            collection.findOne({
                _id: mongodb.ObjectId(req.params.id)
            }, function(err, result) {
                if (err) {
                    res.send(err);
                }
                else if (result) {
                    res.send(result);
                }
                else {
                    res.send('No document found');
                }
                // Close connection
                db.close();
            });
        }
    });
});
// Create POST route for /comments
app.post('/comments', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable