const path = require("path");
const AdmZip = require("adm-zip");
const { ObjectId } = require('mongodb');

const getRoot = (req, res) => {
    res.send("Hello, this is the root of the API!");
};

const getChats = async (req, res) => {
    const database = req.app.locals.db;
    try {
        const collection = database.collection("chats");
        const chats = await collection.find({}).toArray();
        res.json(chats);
    } catch (error) {
        console.error("Error fetching chats from MongoDB:", error);
        res.status(500).send("Error fetching chats from MongoDB.");
    }
};

const uploadChat = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const zip = new AdmZip(req.file.buffer);
    const zipEntries = zip.getEntries();

    let chatFile = null;

    zipEntries.forEach((entry) => {
        if (entry.entryName === "_chat.txt") {
            chatFile = entry;
            console.log("Proccessing chat file:", entry.entryName);
        } else {
            // Save the attachment to Minio
            const attachmentName = path.basename(entry.entryName);
            const attachmentBuffer = entry.getData();
            console.log("Proccessing attachment:", attachmentName);
            // Save the attachment to Minio
            req.app.locals.minioClient.putObject(
                req.app.locals.minioBucket,
                attachmentName,
                attachmentBuffer,
                (err, etag) => {
                    if (err) {
                        console.error(
                            "Error uploading attachment to Minio:",
                            err
                        );
                    }
                }
            );
        }
    });

    if (!chatFile) {
        return res.status(400).send("_chat.txt not found in the zip file.");
    }

    const chatData = chatFile.getData().toString("utf8");
    const chatName = path.basename(
        req.file.originalname,
        path.extname(req.file.originalname)
    );
    const cleanData = chatData.replace(/[\u200E\u202A\u202C\u200F]/g, '');

    const messagePattern = /^\[(\d{1,2}\/\d{1,2}\/\d{2})(?:,? ?(\d{1,2}:\d{2}:\d{2}))\] (.*?): (.*)$/m;
    const attachmentPattern = /<adjunto: (.*\.(webp|jpg|mp4|jpeg|png|gif))>/;
    const lines = cleanData.split("\n");
    const messages = [];
    let currentMessage = null;

    lines.forEach((line) => {
        const match = line.match(messagePattern);
        if (match) {
            if (currentMessage) {
                messages.push(currentMessage);
            }
            // Check if the message has an attachment and construct the message content as a minio URL
            const attachmentMatch = match[4].match(attachmentPattern);
            if (attachmentMatch) {
                const attachmentName = attachmentMatch[1];
                const attachmentUrl = `${req.app.locals.minioURL}${attachmentName}`;
                currentMessage = {
                    date: `${match[1]} ${match[2]}`,
                    author: match[3],
                    content: attachmentUrl,
                };
            } else {
                currentMessage = {
                    date: `${match[1]} ${match[2]}`,
                    author: match[3],
                    content: match[4],
                };
            }
        } else if (currentMessage && !line.match(messagePattern)) {
            currentMessage.content += `\n${line}`;
        }
    });

    if (currentMessage) {
        messages.push(currentMessage);
    }

    const dateFirstMessage = messages.length > 0 ? messages[0].date : null;
    const dateLastMessage =
        messages.length > 0 ? messages[messages.length - 1].date : null;
    const totalMessages = messages.length;
    const totalAttachments = messages.filter((m) => m.content.startsWith(req.app.locals.minioURL)).length;

    const chatDataForDB = {
        chatName: chatName,
        dateFirstMessage: dateFirstMessage,
        dateLastMessage: dateLastMessage,
        totalMessages: totalMessages,
        totalAttachments: totalAttachments,
        messages: messages,
    };

    console.log("Chat data extracted:", chatName, "\ntotalMessages:", totalMessages, "\ntotalAttachments:", totalAttachments);

    const database = req.app.locals.db;
    try {
        const collection = database.collection("chats");
        await collection.insertOne(chatDataForDB);
        console.log("Chat data inserted into MongoDB.");
        res.status(201).send("Chat data inserted into database.");
    } catch (error) {
        console.error("Error inserting chat data into MongoDB:", error);
        res.status(500).send("Error inserting chat data into MongoDB.");
    }
};

const getChatData = async (req, res) => {
    const chatId = req.params.id;
    const database = req.app.locals.db;
    try {
        const collection = database.collection("chats");
        const chat = await collection.findOne({ _id: new ObjectId(chatId) });
        if (!chat) {
            return res.status(404).send("Chat not found.");
        }
        res.json(chat);
    } catch (error) {
        console.error("Error fetching chat messages from MongoDB:", error);
        res.status(500).send("Error fetching chat messages from MongoDB.");
    }
};

module.exports = {
    getRoot,
    getChatData,
    uploadChat,
    getChats,
};
