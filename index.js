const express = require('express');
const cors = require('cors');
const Mailgun = require("mailgun.js");
const formData = require('form-data');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(cors({
    origin: '*'
}))

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.apiKey, timeout: 60000 });

app.get('/', (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('Request: ', fullUrl, req.query); // TODO remove it. @Anton
    if(!req.query.msg && !req.query.variant){
        console.error('No data provided');
        res.send('Error');
        return;
    }

    const text = `Message: ${req.query.msg}; Selected variant: ${req.query.variant}`;
    const data = {
        from: 'Bookmanize Feedback <me@samples.mailgun.org>',
        to: 'bookmanize@gmail.com',
        subject: `New Feedback ${new Date().toString()}`,
        text
    };
    console.log('Data: ',data);


    mg.messages.create(process.env.domain, data).then((mgRes)=>{
        console.log('Response: ',mgRes);
        res.send('Done')
    }).catch((error)=>{
        console.error(error)
    });

})

app.listen(process.env.PORT || 3000)
