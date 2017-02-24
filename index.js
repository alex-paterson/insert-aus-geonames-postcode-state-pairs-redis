var fs = require('fs'),
    path = require('path'),
    redis = require('redis'),
    argv = require('minimist')(process.argv);

var {file, server, key} = argv;
file = file || path.join(__dirname, 'AU.txt');
server = server || `redis://127.0.0.1:6379`;
key = key || `aus_postcode_state_pairs`;

var client = redis.createClient(server);

exports.setupClient = function() {
  return redis.createClient();
};

var states = new Set();

var hash = {};

fs.readFile(file, 'ascii', (err, data) => {
  if (err) throw err;
  client.del(key, err => {
    if (err) throw err;
    if (!data) throw new Error('Could not find data file.');

    data.split('\n').forEach(line => {

      var postcode = line.split('\t')[1];
      var state = line.split('\t')[4]; // 3 For full state names.

      if (postcode && state) {
        hash[postcode] = state;
        states.add(state);
      }
    });

    client.HMSET(key, hash, err => {
      if (err) throw err;

      console.log('Success!', states);
      client.quit();
    });
  });
});
