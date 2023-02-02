const express = require('express')
const app = express()
app.all('/', (req, res) => {
    res.send('Hi:)')
})

app.get('/feedback', (req, res) => {
    const mailgun = require("mailgun-js");
    const mg = mailgun({apiKey: process.env.apiKey, domain: process.env.domain});
    const data = {
        from: 'Bookmanize Feedback <me@samples.mailgun.org>',
        to: 'bookmanize@gmail.com',
        subject: 'New Feedback '+ new Date().toString(),
        text: `Message: ${req.query.msg}; Selected variant: ${req.query.variant}`
    };
    mg.messages().send(data, function (error, body) {
        console.log(error,body);
        res.send()
    });
})

app.listen(process.env.PORT || 3000)
