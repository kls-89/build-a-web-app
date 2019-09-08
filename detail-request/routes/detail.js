const express = require("express");
const router = express.Router();

const detailController = require("../controllers/details");

// INDEX ROUTES
router.get("/", detailController.getIndex);
router.get("/details", detailController.getDetails);

// NEW ROUTE
router.get("/details/new", detailController.getNewDetailForm);

// CREATE ROUTE
router.post("/details", detailController.postNewDetail);

router.get("/show", detailController.show);

// EDIT
router.get('/details/:id/edit', detailController.getEditDetail);
// UPDATE
router.post('/details/:id', detailController.postEditDetail);

module.exports = router;