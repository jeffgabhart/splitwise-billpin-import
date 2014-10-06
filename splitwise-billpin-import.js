var _ = require('lodash');
var OAuth = require('oauth');
var optimist = require('optimist');
var prompt = require('prompt');
var util = require('util');

function toSentence(tx) {
    // console.log('----------------------------------')
    // console.log('Who Paid: ' + tx.sender.name);
    // console.log('Who Owes: ' + tx.receiver.name);
    // console.log('Amount: ' + tx.amount);
    // console.log('Description: ' + tx.message);
    var date = tx.happenedAt ? tx.happenedAt.iso : tx.createdAt;
    // console.log('Date: ' + date.substring(0, date.indexOf('T')));
    var sentence = tx.receiver.name + ' owes ' + tx.sender.name + ' $' + tx.amount + ' for ' + tx.message + ' on ' + date.substring(0, date.indexOf('T'));
    // console.log(sentence);
    return sentence;
}

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
  input.consumerKey,
  input.consumerSecret,
  '1.0',
  null,
  'HMAC-SHA1');

  var file = require(__dirname + '\\friend.json');
  var some = _.first(file.results, 1);
  _.each(some, function(tx) {
    var sentence = toSentence(tx);
    oauth.post(
      'https://secure.splitwise.com/api/v3.0/parse_sentence',
      input.accessToken,
      input.accessSecret,
      {
        input: sentence,
        friend_id: input.friendId,
        //autosave: false,
        //creation_method: 'quickadd'
      },
      null,
      function(err, data, response) {
        if (err) console.log("Error: " + util.inspect(err));
        console.log("Good.")
      }
    );
  });
});
