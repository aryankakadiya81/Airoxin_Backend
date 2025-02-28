const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const route = express.Router();
const port = process.env.PORT || 5000;
app.use('/v1', route);



const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'aryan.airoxin@gmail.com',
        pass: 'echo yfcl urlz jyxl',
    },
    secure: true,
});


route.post("/Mail", (req, res) => {
    let { name,
        email,
        phone,
        subject,
        message,
        country,
        countrycode } = req.body;

    let MailData = {
        from: 'aryan.airoxin@gmail.com', // sender address
        to: "info.airoxin@gmail.com", // list of receivers
        subject: subject, // Subject line
        text: message,
        html: `<h1>Email Data</h1>
        <h3>Name: ${name}</h3>
        <h3>Email: ${email}</h3>
        <h3>Country: ${country}</h3>
        <h3>CountryCode: ${country}</h3>
        <h3>CountryDielCode: ${countrycode}</h3>
        <h3>Mobile: ${phone}</h3>
        <h3>Subject: ${subject}</h3>
        <h3>Details: ${message}</h3>`
    }

    transporter.sendMail(MailData, function (err, info) {
        if (err) {
            console.log(err);
        }

        // console.log(info);
        res.status(200).send({ msg: "Your Data Added Successfully", info });
        // transporter.close();
    });
})




app.listen(port, () => {
    console.log(`Server listening on port  ${port}`);
});