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
    res.render('index', {title: 'Welcome'});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mohdfaraaz1@gmail.com',
            pass: ''
        }
    });

    var mainOptions = {
        from: 'Faraaz <mohdfaraaz1@gmail.com>',
        to: 'faraazuddin.md@gmail.com',
        subject: 'Website Submission',
        text: `You submitted a form on the test server. Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
        html:  `<p>You submitted a form on the test server.<\p><ul><li>Name: ${req.body.name}</li><li>Email: ${req.body.email}</li><li>Message: ${req.body.message}</li></ul>`
    }

    transporter.sendMail(mainOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect('/');
            return;
        }

        console.log(`Message ${info.response}`);
        res.redirect('/');
    })
})

app.listen(3000);
console.log('Server is running on port 3000');