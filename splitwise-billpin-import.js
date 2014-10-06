var _ = require('lodash');
var optimist = require('optimist');
var prompt = require('prompt');

var schema = {
  properties: {
    consumerKey: {
      required: true
    },
    consumerSecret: {
      required: true
    },
    friendId: {
      required: true
    }
  }
};
prompt.override = optimist.argv;
prompt.start();

prompt.get(schema, function(err, input) {
  var file = require(__dirname + '\\friend.json');
  var some = _.first(file.results, 20);
  _.each(some, function(tx) {
    console.log('----------------------------------')
    console.log('Who Paid: ' + tx.sender.name);
    console.log('Who Owes: ' + tx.receiver.name);
    console.log('Amount: ' + tx.amount);
    console.log('Description: ' + tx.message);
    console.log('Date: ' + tx.happenedAt.iso.substring(0, tx.happenedAt.iso.indexOf('T')));
    console.log(tx.receiver.name + ' owes ' + tx.sender.name + ' $' + tx.amount + ' for ' + tx.message + ' on ' + tx.happenedAt.iso.substring(0, tx.happenedAt.iso.indexOf('T')));
  });
});
