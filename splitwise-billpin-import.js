var _ = require('lodash');
var OAuth = require('oauth');
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
    accessToken: {
      required: true
    },
    accessSecret: {
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
  var oauth = new OAuth.OAuth(
  'https://secure.splitwise.com/api/v3.0/get_request_token',
  'https://secure.splitwise.com/api/v3.0/get_access_token',
  result.consumerKey,
  result.consumerSecret,
  '1.0',
  null,
  'HMAC-SHA1');

  var file = require(__dirname + '\\friend.json');
  var some = _.first(file.results, 20);
  _.each(some, function(tx) {
    console.log('----------------------------------')
    console.log('Who Paid: ' + tx.sender.name);
    console.log('Who Owes: ' + tx.receiver.name);
    console.log('Amount: ' + tx.amount);
    console.log('Description: ' + tx.message);
    console.log('Date: ' + tx.happenedAt.iso.substring(0, tx.happenedAt.iso.indexOf('T')));
    var natural = tx.receiver.name + ' owes ' + tx.sender.name + ' $' + tx.amount + ' for ' + tx.message + ' on ' + tx.happenedAt.iso.substring(0, tx.happenedAt.iso.indexOf('T'));
    console.log(natural);
  });
});
