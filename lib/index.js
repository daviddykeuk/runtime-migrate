var MigrationSchema = require('./migrationSchema');
var count = 0;



function executeScript(script, done) {
    // does the version exist?
    MigrationSchema.findOne({ version: script.version }, function(err, doc) {
        if (doc || script.test && process.env.NODE_ENV !== 'test') {
            done(false);
        } else {
            script.script(done(true));
        }

    });
}

function moveNext(i, scripts, callback) {
    if (scripts[i]) {
        executeScript(scripts[i], function(run) {
            // put the version in the db
            if (run) {
                var v = new MigrationSchema();
                v.version = scripts[i].version;
                v.description = scripts[i].description;
                v.timestamp = new Date();
                v.script = scripts[i].script.toString();
                v.save(function() {
                    // increment the counters
                    i++;
                    count++;

                    // move along please
                    moveNext(i, scripts, callback);
                });
            } else {
                // increment the counter
                i++;

                // move along please
                moveNext(i, scripts, callback);

            }
        });
    } else {
        if (callback) {
            callback(count + ' script' + (count !== 1 ? 's have' : ' has') + ' been run, database @ version ' +
                scripts[i - 1].version + " (" + scripts[i - 1].description + ")");
        }
    }
}

module.exports = {
    // accepts and array of scripts and runs them in order if the version doesn't exist in the database
    migrate: function(scripts, callback) {
        if (scripts.length > 0) {
            moveNext(0, scripts, callback);
        } else {
            callback("No scripts found.");
        }
    }
};