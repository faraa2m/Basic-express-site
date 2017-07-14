let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let nodemailer = require('nodemailer');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000);
console.log('Server is running on port 3000');