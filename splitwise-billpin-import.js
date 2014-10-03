var _ = require('lodash');
var optimist = require('optimist');
var prompt = require('prompt');

var schema = {
  properties: {
    file: {
      required: true,
      default: 'file.json'
    },
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
    var file = require(__dirname + '\\' + input.file);
    console.log(file.results[0]);
  }
});
