const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = 8080;

const routes = require("./routes");

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function createDefaultCollection() {
    try {
        await client.connect();
        const database = client.db("wacbidb");

        // Check if the collection exists
        const collections = await database.listCollections({ name: "chats" }).toArray();
        if (collections.length === 0) {
            await database.createCollection("chats");
            console.log("Default collection 'chats' created.");
        } else {
            console.log("Collection 'chats' already exists.");
        }
    } catch (error) {
        console.error("Error creating default collection:", error);
    } finally {
        await client.close();
    }
}

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await createDefaultCollection();
});
