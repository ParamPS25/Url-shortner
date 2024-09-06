const express = require("express");
const UrlController = require("../controllers/urlController");

const router = express.Router();

router.post('/users',UrlController.GenerateNewShortUrl);

module.exports = router;