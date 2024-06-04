require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

function createToken(user) {
    const token = jwt.sign(
        {
            email: user.email,
        },
        "secret",
        { expiresIn: "7d" }
    );
    return token;
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "secret");
    if (!verify?.email) {
        return res.send("You are not authorized");
    }
    req.user = verify.email;
    next();
}

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // await client.connect();
        const eventsDB = client.db("eventsDB");
        const userDB = client.db("userDB");
        const eventsCollection = eventsDB.collection("eventsCollection");
        const userCollection = userDB.collection("userCollection");
        const featuredEventsCollection = eventsDB.collection("featuredEventsCollection");
        const upcomingEventsCollection = eventsDB.collection("upcomingEventsCollection");
        const chartdataCollection = eventsDB.collection("chartdataCollection");
        // Event
        app.post("/events", verifyToken, async (req, res) => {
            const eventsData = req.body;
            const result = await eventsCollection.insertOne(eventsData);
            res.send(result);
        });

        app.get("/events", async (req, res) => {
            const eventsData = eventsCollection.find();
            const result = await eventsData.toArray();
            res.send(result);
        });
        app.get("/upcoming", async (req, res) => {
            const upcomingData = upcomingEventsCollection.find();
            const result = await upcomingData.toArray();
            res.send(result);
        });
        app.get("/featured", async (req, res) => {
            const featuredData = featuredEventsCollection.find();
            const result = await featuredData.toArray();
            res.send(result);
        });
        app.get("/data", async (req, res) => {
            const chartData = chartdataCollection.find();
            const result = await chartData.toArray();
            res.send(result);
        });

        app.get("/events/:id", async (req, res) => {
            const id = req.params.id;
            const eventsData = await eventsCollection.findOne({
                _id: new ObjectId(id),
            });
            res.send(eventsData);
        });

        app.patch("/events/:id", verifyToken, async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const result = await eventsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );
            res.send(result);
        });
        app.delete("/events/:id", verifyToken, async (req, res) => {
            const id = req.params.id;
            const result = await eventsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });
        // user
        app.post("/user", async (req, res) => {
            const user = req.body;

            const token = createToken(user);
            const isUserExist = await userCollection.findOne({ email: user?.email });
            if (isUserExist?._id) {
                return res.send({
                    statu: "success",
                    message: "Login success",
                    token,
                });
            }
            await userCollection.insertOne(user);
            return res.send({ token });

        });

        // user/test@gmail

        app.get("/user/get/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const result = await userCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        app.get("/user/:email", async (req, res) => {
            const email = req.params.email;
            const result = await userCollection.findOne({ email });
            res.send(result);
        });

        app.patch("/user/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            const userData = req.body;
            const result = await userCollection.updateOne(
                { email },
                { $set: userData },
                { upsert: true }
            );
            res.send(result);
        });

        console.log("Database is connected");
    } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Route is working");
});

app.listen(port, (req, res) => {
    console.log("App is listening on port :", port);
});
//kt4g2deVcPlSkEJZ