var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var migrationsSchema = new Schema({
    version: String,
    timestamp: Date,
    description: String,
    script: String
});

module.exports = mongoose.model('_db_migrations', migrationsSchema);