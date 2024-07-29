const multer = require("multer");

// Configure multer storage
const storage = multer.memoryStorage({});

const upload = multer({ storage : storage });

module.exports = upload;