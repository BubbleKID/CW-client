var path = require('path');
var express = require('express');

var app99 = express();

app99.use(express.static(path.join(__dirname, 'build')));
app99.set('port', process.env.PORT || 9000);

var server = app99.listen(app99.get('port'), function() {
  console.log('listening on port ', server.address().port);
});