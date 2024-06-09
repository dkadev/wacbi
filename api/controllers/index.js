const getRoot = (req, res) => {
  res.send('Hello, this is the root of the API!');
};

const uploadChat = (req, res) => {
  console.log(req.file); // Log the uploaded file
  res.send('File uploaded successfully!');
};

module.exports = {
  getRoot,
  uploadChat,
};
