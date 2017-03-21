var migrator = require('runtime-migrate');
var mongoose = require('mongoose');

// import a schema
var exampleSchema = require('./exampleSchema');

// create an array of migrations
var migrations = [{
    version: "1.0.0",
    description: "Initial setup",
    script: function(done) {
        exampleSchema.insertMany([{
            "name": "Object one",
            "description": "Added on first version"
        }]).then(done);
    }
}, {
    version: "1.0.1",
    description: "Extra object",
    script: function(done) {
        exampleSchema.insertMany([{
            "name": "Object two",
            "description": "Added on next version"
        }]).then(done);
    }
}];

// connect to mongo
mongoose.connect("mongodb://localhost/exampleDB");

// execute the migrations
migrator.migrate(migrations, function(result) {
    console.log("Database migration result: %s", result)
});