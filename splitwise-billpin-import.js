var _ = require('lodash');
var optimist = require('optimist');
var prompt = require('prompt');

var schema = {
  properties: {
    dryRun: {
      type: 'boolean',
      default: true
    }
  }
};
prompt.override = optimist.argv;
prompt.start();

prompt.get(schema, function(err, input) {
  if (input.dryRun) {
    console.log('dry run');
  }
});
