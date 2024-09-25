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
    let { Name, Email, Mobile, Sub, Txt } = req.body;

    let MailData = {
        from: 'aryan.airoxin@gmail.com', // sender address
        to: "info.airoxin@gmail.com", // list of receivers
        subject: Sub, // Subject line
        text: Txt,
        html: `<h1>Email Data</h1><h3>Name:${Name}</h3><h3>Email:${Email}</h3><h3>Mobile:${Mobile}</h3><h3>Subject:${Sub}</h3><h3>Details:${Txt}</h3>` 
    }

    transporter.sendMail(MailData, function (err, info) {
        if (err) {
            console.log(err);
        }

        // console.log(info);
        res.status(200).send({ msg: "Your Data Added Successfully" ,info});
        // transporter.close();
    });
})




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});