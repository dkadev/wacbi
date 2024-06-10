const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const getRoot = (req, res) => {
  res.send('Hello, this is the root of the API!');
};

const uploadChat = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const zip = new AdmZip(req.file.path);
  const zipEntries = zip.getEntries();

  let chatFile = null;

  zipEntries.forEach((entry) => {
    if (entry.entryName === '_chat.txt') {
      chatFile = entry;
    }
  });

  if (!chatFile) {
    return res.status(400).send('_chat.txt not found in the zip file.');
  }

  const chatData = chatFile.getData().toString('utf8');
  const lines = chatData.split('\n');
  const messages = [];

  for (let i = 0; i < lines.length && messages.length < 10; i++) {
    const line = lines[i];
    const match = line.match(/^\[(\d{2}\/\d{2}\/\d{2}), (\d{2}:\d{2}:\d{2})\] (.*?): (.*)$/);
    if (match) {
      messages.push({
        date: `${match[1]} ${match[2]}`,
        author: match[3],
        content: match[4]
      });
    }
  }

  res.json(messages);
};

module.exports = {
  getRoot,
  uploadChat,
};
