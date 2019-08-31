const express = require('express');
const router = express.Router();

const errorController = require('../../controllers/error/404');

router.get('*', errorController.get404);

module.exports = router;