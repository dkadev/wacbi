const path = require("path")
const AdmZip = require("adm-zip")

const getRoot = (req, res) => {
    res.send("Hello, this is the root of the API!")
}

const uploadChat = (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.")
    }

    const zip = new AdmZip(req.file.buffer)
    const zipEntries = zip.getEntries()

    let chatFile = null

    zipEntries.forEach((entry) => {
        console.log("Entry found in zip:", entry.entryName)
        if (entry.entryName === "_chat.txt") {
            chatFile = entry
        }
    })

    if (!chatFile) {
        return res.status(400).send("_chat.txt not found in the zip file.")
    }

    const chatData = chatFile.getData().toString("utf8")
    const chatName = path.basename(req.file.originalname, path.extname(req.file.originalname))
    const messagePattern =
        /^\[(\d{2}\/\d{2}\/\d{2}), (\d{2}:\d{2}:\d{2})\] (.*?): (.*)$/
    const lines = chatData.split("\n")
    const messages = []
    let currentMessage = null

    lines.forEach((line) => {
        const match = line.match(messagePattern)
        if (match) {
            if (currentMessage) {
                messages.push(currentMessage)
            }
            currentMessage = {
                date: `${match[1]} ${match[2]}`,
                author: match[3],
                content: match[4],
            }
        } else if (currentMessage) {
            currentMessage.content += `\n${line}`
        }
    })

    if (currentMessage) {
        messages.push(currentMessage)
    }

    const chatDataForDB = {
        chatName: chatName,
        messages: messages
    }

    res.json(chatDataForDB)
}

module.exports = {
    getRoot,
    uploadChat,
}
