const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

const JWT_SECRET = "secret";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json());

// ecosyncDB
// 3eoJKDvLddqXBw3h



const mongoUrl = "mongodb+srv://ecosyncDB:3eoJKDvLddqXBw3h@cluster0.ssi7z.mongodb.net/samuraiDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("connect to databse");
    })
    .catch((err) => console.log(err));


require('./userDetails');
const User = mongoose.model('userInfo');

app.post('/auth/create', async (req, res) => {

    const { username, email, userType, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send({ status: "error", message: "User already exists" });
        }
        await User.create({
            username,
            email,
            userType,
            password: encryptedPassword,
        });
        res.send({ status: "ok" });
    }
    catch (err) {
        console.log({ status: "error" });
    }
});

// Login User
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: "5m",
        });

        if (res.status(201)) {
            return res.json({ status: "ok", data: token, userType: user.userType });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "InvAlid Password" });
});


app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const useremail = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) { }
});


app.post("/auth/reset-password/initiate", async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
        console.log(link);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test.service.working@gmail.com',
                pass: 'llfk rbtg eaws suss'
            }
        });

        var mailOptions = {
            from: 'test.service.working@gmail.com',
            to: email, // Using the 'mail' variable here
            subject: 'Reset Password',
            text: "Greetings " + username + "," + " Kindly click the following link for resetting your password - " + link,
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        console.log(link);
    } catch (error) { }
});

app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
        console.log(error);
        res.send("Not Verified");
    }
});

app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );

        res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
});








app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
