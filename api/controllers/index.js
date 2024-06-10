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
  const messages = chatData.split('\n').slice(0, 10);

  console.log('First 10 messages:', messages);

  res.send('File processed successfully!');
};

module.exports = {
  getRoot,
  uploadChat,
};
