const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    const mailgun = require("mailgun-js");
    const mg = mailgun({apiKey: process.env.apiKey, domain: process.env.domain});
    const text = `Message: ${req.query.msg}; Selected variant: ${req.query.variant}`;
    const data = {
        from: 'Bookmanize Feedback <me@samples.mailgun.org>',
        to: 'bookmanize@gmail.com',
        subject: `New Feedback ${new Date().toString()}`,
        text
    };

    console.log('Data: ',data);

    mg.messages().send(data, function (error, body) {
        console.log('Response: ',body);
        error && console.error(error)
        res.send('Done')
    });
})

app.listen(process.env.PORT || 3000)
