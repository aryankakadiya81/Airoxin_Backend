const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const route = express.Router();
const port = process.env.PORT || 5000;
app.use('/v1', route);


// const today = new Date();
// const todayDate = today.toISOString().slice(0, 10); // Format: YYYY-MM-DD

// console.log(todayDate);


const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(today.getDate()).padStart(2, '0');
const Dates = `${day}/${month}/${year}`; //DD/MM/YYYY


const transporter = nodemailer.createTransport({
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: true,
});

const transporter2 = nodemailer.createTransport({
    port: process.env.EMAIL_PORT1,
    host: process.env.EMAIL_HOST1,
    auth: {
        user: process.env.EMAIL_USER1,
        pass: process.env.EMAIL_PASS1,
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
        <p>Date:${Dates}</p>
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


// route.post("/Catalogue", (req, res) => {
//     let { name,
//         email,
//         phone,
//         country,
//         countrycode
//     } = req.body;

//     let MailData = {
//         from: 'aryan.airoxin@gmail.com', // sender address
//         to: email, // list of receivers

//         subject: `Hello ${name}, Your Requested Catalog from Airoxin International`, // Subject line
//         html: `<h5>${Dates}</h5>
//         <p>Thank you for your interest in AIROXIN INTERNATIONAL. I hope you’re doing well.</p>
//         <p>Please Click On This Link And Download Catalog</p>
//         <button href=""></button>`
//         // html:``
//     }

//     transporter2.sendMail(MailData, function (err, info) {
//         if (err) {
//             console.log(err);
//         }

//         // console.log(info);
//         res.status(200).send({ msg: "Your Data Added Successfully", info });
//         // transporter.close();
//     });
// })




app.listen(port, () => {
    console.log(`Server listening on port  ${port}`);
});