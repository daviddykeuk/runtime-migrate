var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var exampleSchema = new Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('example', exampleSchema);