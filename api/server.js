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
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function createDefaultCollection(database) {
    try {
        // Check if the collection exists
        const collections = await database
            .listCollections({ name: "chats" })
            .toArray();
        if (collections.length === 0) {
            await database.createCollection("chats");
            console.log("Default collection 'chats' created.");
        } else {
            console.log("Collection 'chats' already exists.");
        }
    } catch (error) {
        console.error("Error creating default collection:", error);
    }
}

const Minio = require("minio");

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

// Create default bucket if it doesn't exist
async function createDefaultBucket() {
    try {
        const bucketExists = await minioClient.bucketExists(
            process.env.MINIO_BUCKET_NAME
        );
        if (!bucketExists) {
            await minioClient.makeBucket(process.env.MINIO_BUCKET_NAME);
            console.log(
                "Default bucket " + process.env.MINIO_BUCKET_NAME + " created."
            );
        } else {
            console.log(
                "Bucket " + process.env.MINIO_BUCKET_NAME + " already exists."
            );
        }
    } catch (error) {
        console.error("Error creating default bucket:", error);
    }
}

async function startServer() {
    try {
        await client.connect();
        const database = client.db("wacbidb");
        await createDefaultCollection(database);
        await createDefaultBucket();

        app.locals.db = database;
        app.locals.minioClient = minioClient;
        app.locals.minioBucket = process.env.MINIO_BUCKET_NAME;
        app.locals.minioURL = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/`;

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();
