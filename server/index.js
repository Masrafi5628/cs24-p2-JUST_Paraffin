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

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("connect to databse");
    })
    .catch((err) => console.log(err));


require('./userDetails');
require('./vehiclesAdd');
require('./stsAdd');
require('./landfillAdd')
require('./trcukAdd');
require('./stsAddVehcile');
require('./billGenerate');
require('./route-view');
require('./fleetTruck');
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

// Login User
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: "10d",
        });

        if (res.status(201)) {
            return res.json({ status: "ok", data: token, userType: user.userType });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "InvAlid Password" });
});


// app.post("/userData", async (req, res) => {
//     const { token } = req.body;
//     try {
//         const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//             if (err) {
//                 return "token expired";
//             }
//             return res;
//         });
//         console.log(user);
//         if (user == "token expired") {
//             return res.send({ status: "error", data: "token expired" });
//         }

//         const useremail = user.email;
//         User.findOne({ email: useremail })
//             .then((data) => {
//                 res.send({ status: "ok", data: data });
//             })
//             .catch((error) => {
//                 res.send({ status: "error", data: error });
//             });
//     } catch (error) { }
// });

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

// Get all users api
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});



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
    const { name, capacity, operationalTimespan, latitude, longitude, latitudeRad, longitudeRad, managers } = req.body;

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
            latitudeRad,
            longitudeRad,
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

//


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
        const { longitudeRad: longitude11, latitudeRad: latitude12 } = loc_1;
        const { longitudeRad: longitude21, latitudeRad: latitude22 } = loc_2;

        // Check if any of the required details are missing or not a number
        if (!capacity || isNaN(capacity) || !fuelCostLoaded || isNaN(fuelCostLoaded) || !fuelCostUnloaded || isNaN(fuelCostUnloaded) || isNaN(wasteVolume)) {
            return res.status(400).json({ status: "error", message: "Invalid input data or missing vehicle details" });
        }
        if (!longitude11 || isNaN(longitude11) || !latitude12 || isNaN(latitude12) || !longitude21 || isNaN(longitude21) || !latitude22 || isNaN(latitude22)) {
            return res.status(400).json({ status: "error", message: "Invalid input data or missing location details" });
        }

        console.log(longitude11, latitude12, longitude21, latitude22);
        // longitude11 = longitude11 * Math.PI / 180;
        // latitude12 = latitude12 * Math.PI / 180;
        // longitude21 = longitude21 * Math.PI / 180;
        // latitude22 = latitude22 * Math.PI / 180;
        // console.log(longitude11, latitude12, longitude21, latitude22);
        // console.log(lat1, long1, lat2, long2);
        // Calculate the bill amount based on the provided formula
        // const dis = Math.acos(Math.sin(latitude12) * Math.sin(latitude22) + Math.cos(latitude12) * Math.cos(latitude22) * Math.cos(longitude21 - longitude11)) * 6371;
        const dis = Math.acos(Math.sin(latitude12) * Math.sin(latitude22) + Math.cos(latitude12) * Math.cos(latitude22) * Math.cos(longitude21 - longitude11)) * 6371;

        // const dis = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)) * 6371;
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

// fleet truck post api
// app.post('/fleettruck', async (req, res) => {
//     const { volumeOfWaste } = req.body;
//     try {
//         const vehicles = await Vehicle.find({});


//         for (const vehicle of vehicles) {
//             // Define cost variable here
//             let ratio = 0; // Default ratio value
//             if (vehicle.capacity !== 0 && vehicle.capacity !== undefined) {
//                 ratio = (vehicle.fuelCostUnloaded + (vehicle.fuelCostLoaded - vehicle.fuelCostUnloaded)) / vehicle.capacity;

//             }

//             if (!volumeOfWaste || isNaN(volumeOfWaste)) {
//                 return res.status(400).json({ status: "error", message: "Invalid input data or missing volume of waste" });
//             }
//             if (!cost || isNaN(cost)) {
//                 return res.status(400).json({ status: "error", message: "Invalid input data or missing cost" });
//             }
//             if (!ratio || isNaN(ratio)) {
//                 return res.status(400).json({ status: "error", message: "Invalid input data or missing ratio" });
//             }


//             await FleetTruck.create({
//                 registrationNumber: vehicle.registrationNumber,
//                 capacity: vehicle.capacity,
//                 Ratio: ratio,
//                 volumeOfWaste: volumeOfWaste
//             });


//         }
//         res.status(201).json({ status: "ok", message: "fleet  added successfully" });
//     } catch (err) {
//         console.error("Error adding Route:", err);
//         res.status(500).json({ status: "error", message: "Internal server error" });
//     }
// });

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




app.get('/', (req, res) => {
    res.send('Hello Code Samurai!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

