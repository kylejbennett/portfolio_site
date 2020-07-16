const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
require('dotenv/config');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send', (req, res) => {
    async function main() {
        // TODO set environment variables
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER_EMAIL, // generated ethereal user
                pass: process.env.USER_EMAIL_PASSWORD, // generated ethereal password
            },
            tls:{
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '${ req.body.name } ${ req.body.email }', // sender address
            to: "kyle.j.bennett5@gmail.com", // list of receivers
            subject: "Portfolio Site Contact", // Subject line
            text: '${ req.body.message }', // plain text body
            html: "", // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
