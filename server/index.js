const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
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
// const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ssi7z.mongodb.net/samuraiDB?retryWrites=true&w=majority&appName=Cluster0`;

const connectWithRetry = () => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
    })

        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.error("Error connecting to database:", err);
            // Retry connection after a delay
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        });
};

connectWithRetry();



require('./userDetails');
require('./vehiclesAdd');
require('./stsAdd');
require('./landfillAdd')
require('./trcukAdd');
require('./stsAddVehcile');
require('./billGenerate');
require('./route-view');
require('./fleetTruck');
require('./contractManagerSchema');
require('./addWorker');
require('./workingsession');
require('./wasteinformation');
require('./addnewcontractor');
const contractorinfo = mongoose.model('contractorinfo');
const wasteinfo = mongoose.model('wasteInfo');
const WorkingSession = mongoose.model('workingsessioninfo');
const Worker = mongoose.model('workerInfo');
const ContractManager = mongoose.model('contractManagerInfo');
const User = mongoose.model('userInfo');
const Vehicle = mongoose.model('vehiclesInfo');
const Sts = mongoose.model('stsInfo');
const Landfill = mongoose.model('landfillSitesInfo');
const Truck = mongoose.model('trucksInfo');
const StsVehcile = mongoose.model('stsvehcileInfo');
const BillDetails = mongoose.model('BillDetails');
const RouteView = mongoose.model('routeview');
const FleetTruck = mongoose.model('fleeTruckInfo');



app.post('/users', async (req, res) => {

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
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        const user1 = await ContractManager.findOne({ email });
        if (!user1) {
            const user2 = await Worker.findOne({ email });
            console.log(user2);
            if (!user2) {
                return res.json({ error: "User Not found" });
            }
            //store current login date and time and user id in workingsession collection
            const date = new Date();
            const login_date = date.toLocaleDateString();
            const login_time = date.toLocaleTimeString();
            const worker_id = user2._id;
            await WorkingSession.create({
                login_date,
                login_time,
                worker_id
            });
            if (await bcrypt.compare(password, user2.password)) {
                const token = jwt.sign({ email: user2.email }, JWT_SECRET, {
                    expiresIn: "10d",
                });

                return res.json({ status: "ok", data: token, userType: user2.userType });
            }
        }
        if (await bcrypt.compare(password, user1.password)) {
            const token = jwt.sign({ email: user1.email }, JWT_SECRET, {
                expiresIn: "10d",
            });

            return res.json({ status: "ok", data: token, userType: user1.userType });
        }
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: "10d",
        });

        return res.json({ status: "ok", data: token, userType: user.userType });
    }
    res.json({ status: "error", error: "Invalid Password" });
});




app.post("/profile", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);

        // If token is expired, send a specific error response
        if (user) {
            const useremail = user.email;
            User.findOne({ email: useremail })
                .then((data) => {
                    res.send({ status: "ok", data: data });
                })
                .catch((error) => {
                    res.send({ status: "error", data: error });
                });
        } else {
            res.status(401).send({ status: "error", message: "Token expired" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});

// get specific user updateptofile
app.get('/profile/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const user = await User.findOne(query);
    res.send(user);
});

// get specific user updateptofile
app.get('/constructormanager/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const user = await ContractManager.findOne(query);
    res.send(user);
});

// update user details api
app.put('/profile/:id', async (req, res) => {
    const id = req.params.id;
    const updateUser = req.body;
    const filer = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            username: updateUser.username,
            email: updateUser.email,
        },
    };
    const result = await User.updateOne(filer, updateDoc, options);
    res.send(result);
});


app.post("/auth/reset-password/initiate", async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        console.log(oldUser);
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
            to: oldUser.email, // Using the 'mail' variable here
            subject: 'Reset Password',
            text: `Click on the link to reset your password: ${link}`,
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

app.post("/workprofile", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;
        //console.log(user);
        // console.log(user.email);

        // If token is valid, find the user by email
        if (user) {
            const useremail = user.email;
            // console.log(user.email);
            //update working session collection with logout date and time
            const user1 = await Worker.findOne({ email: useremail });
            // console.log(user1);
            const date = new Date();
            const logout_date = date.toLocaleDateString();
            const logout_time = date.toLocaleTimeString();
            const worker_id = user1._id;
            // console.log(worker_id);
            const workingSession = await WorkingSession.findOne({ worker_id: worker_id, logout_date: "null" });
            // console.log(workingSession);
            const login_date = workingSession.login_date;
            const login_time = workingSession.login_time;
            function parseDateTime(dateTimeString) {
                const parts = dateTimeString.split(/[T ]/); // Split date and time parts
                const dateParts = parts[0].split('/'); // Split date into MM, DD, YYYY
                const timeParts = parts[1].split(':'); // Split time into HH, MM, SS
                let hours = parseInt(timeParts[0]);
                const ampm = parts[2];
                if (ampm === 'PM' && hours < 12) hours += 12; // Adjust hours for PM
                else if (ampm === 'AM' && hours === 12) hours = 0; // Adjust hours for AM
                return new Date(dateParts[2], dateParts[0] - 1, dateParts[1], hours, parseInt(timeParts[1]), parseInt(timeParts[2])).getTime();
            }

            const loginDateTime = parseDateTime(`${workingSession.login_date}T${workingSession.login_time}`);
            const logoutDateTime = parseDateTime(`${logout_date}T${logout_time}`);

            const timeDifference = (logoutDateTime - loginDateTime) / 1000;
            // // const total_time = 0;
            await WorkingSession.updateOne(
                {
                    worker_id: worker_id,
                },
                {
                    $set: {
                        logout_date: logout_date,
                        logout_time: logout_time,

                        total_time: timeDifference
                    },
                }
            );
            res.json({ status: "ok", data: user });
            // const loginDateTime = new Date(`${workingSession.login_date}T${workingSession.login_time}`);
            // const logoutDateTime = new Date(`${logout_date}T${logout_time}`);
            // Convert login time to milliseconds
            // Custom function to parse date-time strings in "MM/DD/YYYYTHH:MM:SS AM/PM" format

            // Calculate the time difference in milliseconds

            // const timeDifference = logout_time - login_time;
            // console.log(timeDifference);


            // const workingSession = await WorkingSession.findOne({ worker_id: worker_id, logout_date: "null" });

            // // Parse the login and logout date/time strings to create Date objects
            // const logoutDateTime = new Date(`${logout_date}T${logout_time}`);
            // const loginDateTime = new Date(`${workingSession.login_date}T${workingSession.login_time}`);

            // // Calculate the time difference in milliseconds
            // const timeDifference = logoutDateTime - loginDateTime;

            // // Convert milliseconds to seconds
            // const totalSeconds = timeDifference / 1000;
            // console.log(totalSeconds);
            // // Update the total_time field in seconds
            // await WorkingSession.updateOne(
            //     {
            //         worker_id: worker_id,
            //     },
            //     {
            //         $set: {
            //             logout_date: logout_date,
            //             logout_time: logout_time,
            //             total_time: totalSeconds
            //         },
            //     }
            // );

            // res.json({ status: "ok", data: user });

            // Worker.find({ email: useremail })
            //     .then((data) => {
            //         console.log(data);
            //         res.json({ status: "ok", data: data });
            //     })
            //     .catch((error) => {
            //         res.status(500).json({ status: "error", message: "Internal server error" });
            //     });
        } else {
            res.status(401).json({ status: "error", message: "Token expired" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});




// ========================================================User Management Api
// Get all users api
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const user = await User.findOne(query);

    res.send(user);
})


// delete specific user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await User.deleteOne(query);
    res.send(result);
})

// get all roles
app.get('/users/roles', async (req, res) => {
    const roles = await User.find();
    res.send(roles);
});

// get api for role
app.get("/users/:id/roles", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const user = await User.findOne(query);
    res.send(user);
});


// update role api
app.put('/users/:id/roles', async (req, res) => {
    const id = req.params.id;
    const updateRole = req.body;
    console.log(updateRole);
    const filer = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            userType: updateRole.role,
        },
    };
    const result = await User.updateOne(filer, updateDoc, options);
    res.send(result);

});

// get api for user
app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const user = await User.findOne(query);
    res.send(user);
});

// update user details api
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const updateUser = req.body;
    const filer = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            username: updateUser.username,
            email: updateUser.email,
            userType: updateUser.userType,
        },
    };
    const result = await User.updateOne(filer, updateDoc, options);
    res.send(result);
});
// create a vechile collection and then store all vehicle data in it use mongodb atlas


app.get('/vehicles', async (req, res) => {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
});

// add vehicle post api
app.post('/vehicles', async (req, res) => {

    const { registrationNumber, type, capacity, fuelCostLoaded, fuelCostUnloaded } = req.body;
    try {
        const oldVehicleRegistration = await Vehicle.findOne({ registrationNumber });

        if (oldVehicleRegistration) {
            return res.send({ status: "error", message: "Vehicle already exists" });
        }
        await Vehicle.create({
            registrationNumber,
            type,
            capacity,
            fuelCostLoaded,
            fuelCostUnloaded
        });
        res.send({ status: "ok" });
    }
    catch (err) {
        console.log({ status: "error" });
    }
});




app.post('/sts', async (req, res) => {
    const { wardNumber, capacity, location, latitude, longitude, managers, trucks } = req.body;

    try {
        // Check if required fields are present
        if (!wardNumber || !capacity || !location || !latitude || !longitude) {
            return res.status(400).send({ status: "error", message: "Please provide all required fields" });
        }

        // Check if trucks array is provided and if it's not empty
        if (!Array.isArray(trucks) || trucks.length === 0) {
            return res.status(400).send({ status: "error", message: "Please provide at least one truck" });
        }

        // Check if truck objects have required fields
        for (const truck of trucks) {
            if (!truck.truckNumber || !truck.capacity) {
                return res.status(400).send({ status: "error", message: "Each truck must have a truck number and capacity" });
            }
        }

        // Create the new STS with provided details
        const newSTS = await Sts.create({
            wardNumber,
            capacity,
            location,
            latitude,
            longitude,
            managers: managers || [],
            trucks: trucks || []
        });

        console.log({ status: "ok" });
        res.status(201).send({ status: "ok", data: newSTS });
    } catch (err) {
        console.error("Error creating STS:", err);
        let message = "An error occurred while processing your request.";
        if (err.message.includes("duplicate key error")) {
            message = "This STS already exists.";
        }
        res.status(500).send({ status: "error", message });
    }
});


// add Landfill post api
app.post('/landfill', async (req, res) => {
    const { name, capacity, operationalTimespan, latitude, longitude, managers } = req.body;

    try {
        // Check if the landfill with the given name already exists
        const oldLandfill = await Landfill.findOne({ name });
        if (oldLandfill) {
            return res.send({ status: "error", message: "Landfill already exists" });
        }

        // Create the new landfill with provided details
        const newLandfill = await Landfill.create({
            name,
            capacity,
            operationalTimespan,
            latitude,
            longitude,
            managers: managers || [] // Initialize managers as an empty array if not provided
        });

        console.log({ status: "ok" });
        res.send({ status: "ok", data: newLandfill });
    } catch (err) {
        console.error("Error creating landfill:", err);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});


// GET all landfills
app.get('/landfills', async (req, res) => {
    try {
        const landfills = await Landfill.find();
        res.json(landfills);
    } catch (err) {
        console.error("Error fetching landfills:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET a specific landfill by ID
app.get('/landfills/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const landfill = await Landfill.findById(id);
        if (!landfill) {
            return res.status(404).json({ error: "Landfill not found" });
        }
        res.json(landfill);
    } catch (err) {
        console.error("Error fetching landfill:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});




// add Truck post api
app.post('/addtruck', async (req, res) => {
    const { truckNumber, weightofWaste, timeofArrival, timeofDeparture } = req.body;

    try {
        const oldTruckNumber = await Truck.findOne({ truckNumber });

        if (oldTruckNumber) {
            return res.status(400).json({ status: "error", message: "Truck already exists" });
        }

        await Truck.create({
            truckNumber,
            weightofWaste,
            timeofArrival,
            timeofDeparture
        });

        res.status(201).json({ status: "ok", message: "Truck added successfully" });
    } catch (err) {
        console.error("Error adding truck:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});


app.post('/stsvehicleadd', async (req, res) => {
    const { stsId, vehicleNumber, weightofWaste, timeofArrival, timeofDeparture } = req.body;

    try {
        const oldStsId = await StsVehcile.findOne({ stsId });

        if (oldStsId) {
            return res.status(400).json({ status: "error", message: "STS Vehicle already exists" });
        }

        await StsVehcile.create({
            stsId,
            vehicleNumber,
            weightofWaste,
            timeofArrival,
            timeofDeparture
        });

        res.status(201).json({ status: "ok", message: "STS Vehicle added successfully" });
    } catch (err) {
        console.error("Error adding STS Vehicle:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});




app.post('/createbill', async (req, res) => {
    const { registrationNumber, wasteVolume, departureLocation, arrivalLocation } = req.body;

    try {
        // Find the vehicle details by its registration number
        const vehicle = await Vehicle.findOne({ registrationNumber: registrationNumber });
        const loc_1 = await Landfill.findOne({ name: departureLocation });
        const loc_2 = await Landfill.findOne({ name: arrivalLocation });
        // If the place not found
        if (!loc_1) {
            return res.status(404).json({ status: "error", message: "Departure Location not found" });
        }
        if (!loc_2) {
            return res.status(404).json({ status: "error", message: "Arrival Location not found" });
        }

        if (!vehicle) {
            return res.status(404).json({ status: "error", message: "Vehicle not found" });
        }

        // Extract the required details from the vehicle object
        const { capacity, fuelCostLoaded, fuelCostUnloaded } = vehicle;
        const { longitude: longitude11, latitude: latitude12 } = loc_1;
        const { longitude: longitude21, latitude: latitude22 } = loc_2;


        // Check if any of the required details are missing or not a number
        if (!capacity || isNaN(capacity) || !fuelCostLoaded || isNaN(fuelCostLoaded) || !fuelCostUnloaded || isNaN(fuelCostUnloaded) || isNaN(wasteVolume)) {
            return res.status(400).json({ status: "error", message: "Invalid input data or missing vehicle details" });
        }
        if (!longitude11 || isNaN(longitude11) || !latitude12 || isNaN(latitude12) || !longitude21 || isNaN(longitude21) || !latitude22 || isNaN(latitude22)) {
            return res.status(400).json({ status: "error", message: "Invalid input data or missing location details" });
        }

        // console.log(longitude11, latitude12, longitude21, latitude22);
        const long1 = longitude11 * Math.PI / 180;
        const lat1 = latitude12 * Math.PI / 180;
        const long2 = longitude21 * Math.PI / 180;
        const lat2 = latitude22 * Math.PI / 180;
        // console.log(longitude11, latitude12, longitude21, latitude22);
        // console.log(lat1, long1, lat2, long2);
        // Calculate the bill amount based on the provided formula
        // const dis = Math.acos(Math.sin(latitude12) * Math.sin(latitude22) + Math.cos(latitude12) * Math.cos(latitude22) * Math.cos(longitude21 - longitude11)) * 6371;
        // const dis = Math.acos(Math.sin(latitude12) * Math.sin(latitude22) + Math.cos(latitude12) * Math.cos(latitude22) * Math.cos(longitude21 - longitude11)) * 6371;

        const dis = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)) * 6371;
        const cost = (fuelCostUnloaded + ((wasteVolume / capacity) * (fuelCostLoaded - fuelCostUnloaded))) * dis;
        // Create a new bill entry in the database
        await BillDetails.create({
            registrationNumber,
            wasteVolume,
            distance: dis,
            departureLocation,
            arrivalLocation,
            billAmount: cost
        });

        // Respond with success message
        res.status(201).json({ status: "ok", message: "Bill added successfully" });
    } catch (err) {
        console.error("Error adding Bill:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
// get total wastvolume fromt billdetails
app.get('/totalwaste', async (req, res) => {
    try {
        const totalWasteAggregate = await BillDetails.aggregate([
            {
                $group: {
                    _id: null,
                    totalWasteVolume: { $sum: "$wasteVolume" }
                }
            }
        ]);

        // Extract the total waste volume from the aggregation result
        const totalWasteVolume = totalWasteAggregate.length > 0 ? totalWasteAggregate[0].totalWasteVolume : 0;

        res.json({ totalWasteVolume });
    } catch (error) {
        console.error("Error fetching total waste volume:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// post route-view
app.post('/route-view', async (req, res) => {
    const { departureLocation, arrivalLocation } = req.body;

    try {
        const loc_1 = await Landfill.findOne({ name: departureLocation });
        const loc_2 = await Landfill.findOne({ name: arrivalLocation });

        if (!loc_1) {
            return res.status(404).json({ status: "error", message: "Departure Location not found" });
        }
        if (!loc_2) {
            return res.status(404).json({ status: "error", message: "Arrival Location not found" });
        }

        // Assuming loc_1 and loc_2 contain the required latitude and longitude values
        const { longitude: longitude11, latitude: latitude12 } = loc_1;
        const { longitude: longitude21, latitude: latitude22 } = loc_2;

        if (!longitude11 || isNaN(longitude11) || !latitude12 || isNaN(latitude12) || !longitude21 || isNaN(longitude21) || !latitude22 || isNaN(latitude22)) {
            return res.status(400).json({ status: "error", message: "Invalid input data or missing location details" });
        }
        const lat1 = latitude12;
        const long1 = longitude11;
        const lat2 = latitude22;
        const long2 = longitude21;
        // Create a new RouteView document
        await RouteView.create({
            lat1,
            long1,
            lat2,
            long2
        });

        res.status(201).json({ status: "ok", message: "Route added successfully" });
    } catch (err) {
        console.error("Error adding Route:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});


// get all bills
app.get('/bills', async (req, res) => {
    try {
        const bills = await BillDetails.find();
        res.json(bills);
    } catch (err) {
        console.error("Error fetching bills:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get all createmap
app.get('/createmap', async (req, res) => {
    try {
        const createmap = await RouteView.find();
        res.json(createmap);
    } catch (err) {
        console.error("Error fetching createmap:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get all userinfo from User collection
app.get('/userInfo', async (req, res) => {
    try {
        const userInfo = await User.find();
        res.json(userInfo);
        console.log(userInfo);
    } catch (err) {
        console.error("Error fetching userInfo:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


// get sts info
app.get('/stsInfo', async (req, res) => {
    try {
        const stsInfo = await Sts.find();
        res.json(stsInfo);
        console.log(stsInfo);
    } catch (err) {
        console.error("Error fetching stsInfo:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get sts vehcile info
app.get('/stsVehcileInfo', async (req, res) => {
    try {
        const stsVehcileInfo = await StsVehcile.find();
        res.json(stsVehcileInfo);
        console.log(stsVehcileInfo);
    } catch (err) {
        console.error("Error fetching stsVehcileInfo:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get all bills
app.get('/stsinfo', async (req, res) => {
    const stslists = await Sts.findOne();
    res.send(stslists);
});

app.get('/stsinfo/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const sts = await Sts.findOne(query);
    res.send(sts);
});


// get all user, landfill manager, sts manager from users individual count api 
app.get('/usercount', async (req, res) => {
    try {
        const userCount = await User.countDocuments({});
        const landfillManagerCount = await User.countDocuments({ userType: "Landfill Manager" });
        const stsManagerCount = await User.countDocuments({ userType: "Sts Manager" });
        res.send({ userCount, landfillManagerCount, stsManagerCount });
    } catch (err) {
        console.error("Error fetching user counts:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
// all get api for all users
app.get('/allusers', async (req, res) => {
    const users = await User.find();
    res.send(users);
});


app.post('/fleettruck', async (req, res) => {
    const { volumeOfWaste } = req.body;
    try {
        await FleetTruck.deleteMany({});

        // Assuming your Vehicle model is imported and defined properly
        const vehicles = await Vehicle.find({});

        for (const vehicle of vehicles) {
            let ratio = 0; // Default ratio value
            if (vehicle.capacity !== 0 && vehicle.capacity !== undefined) {
                ratio = (vehicle.fuelCostUnloaded + (vehicle.fuelCostLoaded - vehicle.fuelCostUnloaded)) / vehicle.capacity;
            }

            if (!volumeOfWaste || isNaN(volumeOfWaste)) {
                return res.status(400).json({ status: "error", message: "Invalid input data or missing volume of waste" });
            }

            // Note: You can calculate cost here if required
            // const cost = ...

            // Create a new FleetTruck document
            await FleetTruck.create({
                registrationNumber: vehicle.registrationNumber,
                capacity: vehicle.capacity,
                Ratio: ratio,
                volumeOfWaste: volumeOfWaste
            });
        }

        res.status(201).json({ status: "ok", message: "Fleet added successfully" });
    } catch (err) {
        console.error("Error adding Fleet:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});


app.get('/fleettruck', async (req, res) => {
    const fleetTruck = await FleetTruck.find();
    res.send(fleetTruck);
});

// add contractmanager post api with  password encrypted 
app.post('/contractmanager', async (req, res) => {
    const { name, userId, email, date, number, company, access, username, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldContractManager = await ContractManager.findOne({ userId });
        if (oldContractManager) {
            return res.send({ status: "error", message: "Contract Manager already exists" });
        }
        await ContractManager.create({
            name,
            userId,
            email,
            date,
            number,
            company,
            access,
            username,
            password: encryptedPassword,
        });
        res.send({ status: "ok" });
    }
    catch (err) {
        console.error(err); // Log the error
        res.status(500).send({ status: "error", message: "Internal server error" }); // Send an appropriate error response
    }

});

//add worker post api
// app.post('/createworker', async (req, res) => {
//     const { employeeID, fullName, email, dateOfBirth, dateOfHire, jobTitle, paymentPerHour, contactInformation, assignedCollectionRoute, username, password } = req.body;

//     const encryptedPassword = await bcrypt.hash(password, 10);

//     try {
//         const oldWorker = await Worker.findOne({ employeeID });
//         if (oldWorker) {
//             return res.send({ status: "error", message: "Worker already exists" });
//         }
//         await Worker.create({
//             employeeID,
//             fullName,
//             email,
//             dateOfBirth,
//             dateOfHire,
//             jobTitle,
//             paymentPerHour,
//             contactInformation,
//             assignedCollectionRoute,
//             username,
//             password: encryptedPassword,

//         });
//         res.send({ status: "ok" });
//     }
//     catch (err) {
//         console.error(err); // Log the error
//         res.status(500).send({ status: "error", message: "Internal server error" }); // Send an appropriate error response
//     }
// });

// add worker post api
app.post('/createworker', async (req, res) => {
    // const { name, userId, email, date, number, company, access, username, password } = req.body;
    const { employeeID, constructorID, fullName, email, dateOfBirth, dateOfHire, jobTitle, paymentPerHour, contactInformation, assignedCollectionRoute, username, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldWorker = await Worker.findOne({ employeeID });
        if (oldWorker) {
            return res.send({ status: "error", message: "Worker already exists" });
        }
        await Worker.create({
            employeeID,
            constructorID,
            fullName,
            email,
            dateOfBirth,
            dateOfHire,
            jobTitle,
            paymentPerHour,
            contactInformation,
            assignedCollectionRoute,
            username,
            password: encryptedPassword,

        });
        res.send({ status: "ok" });
    }
    catch (err) {
        console.error(err); // Log the error
        res.status(500).send({ status: "error", message: "Internal server error" }); // Send an appropriate error response
    }

});

// app.post for waste information
app.post('/wasteinfo', async (req, res) => {
    const { contractorId, timeanddate, amountofwaste, typeofwaste, designatedSTS, vehiclesusedfortransformation } = req.body;

    try {
        await wasteinfo.create({
            contractorId,
            timeanddate,
            amountofwaste,
            typeofwaste,
            designatedSTS,
            vehiclesusedfortransformation
        });
        res.status(201).json({ status: "ok", message: "Waste Information added successfully" });
    } catch (err) {
        console.error("Error adding Waste Information:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

//post api for add contractor
app.post('/addcontractor', async (req, res) => {
    const { contractorid, company, registrationid, registrationdate, tinnumber, contactnumber, workforcesize, paymentofwaste, requiredamount, contractduration, areaofcollection, designatedsts } = req.body;

    try {
        await contractorinfo.create({
            contractorid,
            company,
            registrationid,
            registrationdate,
            tinnumber,
            contactnumber,
            workforcesize,
            paymentofwaste,
            requiredamount,
            contractduration,
            areaofcollection,
            designatedsts
        });
        res.status(201).json({ status: "ok", message: "Contractor added successfully" });
    }
    catch (err) {
        console.error(err); // Log the error
        res.status(500).send({ status: "error", message: "Internal server error" }); // Send an appropriate error response
    }
});

//post api generate bill
app.post('/generatebill', async (req, res) => {
    const { contractorid, finerate } = req.body;
    const tar = await BillDetails.findOne({ contractorId: contractorid });
    if (tar) {
        return res.status(400).json({ status: "error", message: "Bill already exists" });
    } else {
        const user = await contractorinfo.findOne({ contractorid });
        const requiredwaste = user.requiredamount;
        const paymentofwaste = user.paymentofwaste;
        const user1 = await wasteinfo.find({ contractorId: contractorid });
        //drop bill generates table
        await BillDetails.deleteMany({});
        //total amount of waste
        let totalwaste = 0;
        for (const us of user1) {
            totalwaste += us.amountofwaste;
        }
        totalwaste = totalwaste / 1000;
        const basicpay = totalwaste * paymentofwaste;
        const defict = requiredwaste - totalwaste;
        //get max(0,defict)
        const max = Math.max(0, defict) * paymentofwaste;
        const fine = (max * finerate) / 100;
        const totalbill = basicpay - fine;
        try {
            await BillDetails.create({
                totalwaste,
                requiredwaste,
                basicpay,
                deficit: defict,
                fine,
                totalbill
            });
            res.status(201).json({ status: "ok", });
        }
        catch (err) {
            console.error(err); // Log the error
            res.status(500).send({ status: "error", message: "Internal server error" }); // Send an appropriate error response
        }
    }
});





app.get('/', (req, res) => {
    res.send('Hello Code Samurai!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
