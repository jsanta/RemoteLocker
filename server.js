var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Replace XXX with your code
var code = 'DRNMFX';

// Set port
app.set('port', process.env.PORT || 8666);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Routes to handle Parameters and Query Strings 
   will be added here 
***************************************
*                                      *
*                                      *
*                                      *
****************************************/

app.listen(app.get('port'), function () {
    console.log('Server started on localhost:' + app.get('port') + '; Press Ctrl-C to terminate.');
});

var exec = require('child_process').exec;
// Replace your lockCommand
var lockCmd = 'sh -c \'/System/Library/CoreServices/"Menu Extras"/User.menu/Contents/Resources/CGSession -suspend\'';

// respond with "hello world" when a GET request is made to the homepage
app.post('/lock', function (req, res) {    
    var lockCode = req.param('lockCode'),
        lockMsg = '';
    console.log('/lock', lockCode);
    if (lockCode === code) {
        exec(lockCmd, function(error, stdout, stderr) {
          // command output is in stdout
            console.log('Executing: ', lockCmd);
            console.log(error, stdout, stderr);
        });
        lockMsg = 'Computer locked<br />HELL YEAH!';
    } else {
        lockMsg = 'F*CK OFF MOTHER F*CKER!';
    }

    return res.json({
        lockMsg: lockMsg
    });
});
