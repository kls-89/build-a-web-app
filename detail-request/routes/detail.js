const express = require("express");
const router = express.Router();

const detailController = require("../controllers/details");

// INDEX ROUTES
router.get("/", detailController.getIndex);
router.get("/details", detailController.getDetails);


module.exports = router;