var OAuth = require('oauth');
var optimist = require('optimist');
var prompt = require('prompt');

var schema = {
  properties: {
    verifier: {
      required: true
    }
  }
};

prompt.override = optimist.argv;
prompt.start();

prompt.get(['consumerKey', 'consumerSecret'], function(err, result) {
  var oauth = new OAuth.OAuth(
    'https://secure.splitwise.com/api/v3.0/get_request_token',
    'https://secure.splitwise.com/api/v3.0/get_access_token',
    result.consumerKey,
    result.consumerSecret,
    '1.0',
    null,
    'HMAC-SHA1');

  oauth.getOAuthRequestToken(function(err, token, token_secret, parsedQueryString) {
    console.log('Token: ' + token);
    console.log('Secret: ' + token_secret);
    console.log("Authorize URL: https://secure.splitwise.com/authorize?oauth_token=" + token);

    prompt.get(['verifier'], function(err, result) {
      oauth.getOAuthAccessToken(token, token_secret, result.verifier, function(err, access_token, access_token_secret, results) {
        console.log('Access Token: ' + access_token);
        console.log('Access Secret: ' + access_token_secret);
      });
    });
  });
});
