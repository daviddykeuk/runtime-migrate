# runtime-migrate [![Build Status](https://secure.travis-ci.org/daviddykeuk/runtime-migrate.png?branch=master)](https://travis-ci.org/daviddykeuk/runtime-migrate)

Makes mongo database migrations at runtime with versioning.

## Install

```bash
npm install --save runtime-migrate
```

## Usage
runtime-migrate will run scripts on a mongo database if they have not been executed before when your app starts, to achieve this follow the steps below.

Create a schema
```javascript
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var exampleSchema = new Schema({
    name: String,
    description: String,
});
```

Create a migration script
```javascript
var migrations = [{
    version: "1.0.0",
    description: "Initial setup",
    script: function(done) {
        exampleSchema.insertMany([{
            "name": "Object one",
            "description": "Added on first version"
        }]).then(done);
    }
}];
```

Execute the migrations at runtime
```javascript
var migrator = require('runtime-migrate');

// connect to mongo
mongoose.connect("mongodb://localhost/exampleDB");

// execute the migrations
migrator.migrate(migrations, function(result) {
    console.log("Database migration result: %s", result)
});
```

## Examples

See `examples/` for different use cases.

## License

MIT
