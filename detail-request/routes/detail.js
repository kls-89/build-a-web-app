const express = require("express");
const router = express.Router();

const detailController = require("../controllers/details");

// INDEX ROUTES
router.get("/", detailController.getIndex);
router.get("/details", detailController.getDetails);

// NEW ROUTE
router.get("/details/new", detailController.getNewDetailForm);

module.exports = router;