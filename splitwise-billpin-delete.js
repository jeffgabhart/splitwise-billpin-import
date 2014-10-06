var _ = require('lodash');
var OAuth = require('oauth');
var optimist = require('optimist');
var prompt = require('prompt');
var util = require('util');

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

  oauth.get(
    'https://secure.splitwise.com/api/v3.0/get_expenses?dated_before=2014-03-11&limit=0', 
    input.accessToken,
    input.accessSecret,
    function(err, data, response) {
      if (err) console.log("Error: " + util.inspect(err));
      _.each(JSON.parse(data).expenses, function(e) {
        oauth.post(
          'https://secure.splitwise.com/api/v3.0/delete_expense/' + e.id,
          input.accessToken,
          input.accessSecret,
          {},
          null,
          function(err, data, response) {
            if (err) console.log("Error: " + util.inspect(err));
            console.log("Good.")
          }
        );
      })
    });
});
