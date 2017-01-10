var express = require('express');
var app = express();
var sql = require('mssql');
var config = {
    user: 'ATFUser',
    password: 'Pa$$w0rd1',
    server: 'AL_FRAENG_DEV.EYDEV.NET', // You can use 'localhost\\instance' to connect to named instance
    database: 'Engagement',
    port: 1462
        //    options: {
        //        encrypt: false, // Use this if you're on Windows Azure
        //        trustedConnection: true,
        //        instanceName: 'SQLEXPRESS'
        //    }
};

sql.connect(config, function (err) {
    console.log(err);
});

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});



app.get('/test', function (req, res) {
    var request = new sql.Request();
    request.query('select * from taskstatus',
        function (err, recordset) {
            console.log('my error raunak: ' + recordset);
            res.send(recordset);
        });

});