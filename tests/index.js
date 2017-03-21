var migrator = require('../lib');
var demand = require('must');

describe('runtime-migrate', function() {
    it('should exist', function() {
        demand(migrator).to.exist();
    });
});