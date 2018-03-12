var express = require('express');

var app = express();

app.use(express.static(__dirname ));

app.get('/skDisplay', function(req, res) {
    var data = { "env":"int", "tenantCode":"happy"};
    //JSON.stringify
    res.send(data);
});

console.log("listening on port 8088...");
app.listen(8088);
