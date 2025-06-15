const express = require('express');
const { getData, createData, deleteAllData, countData } = require('../controllers/dataController');
const router = express.Router();

router.get('/', getData);
router.get('/count', countData);
router.post('/create/:count', createData);
router.delete('/delete-all', deleteAllData);

module.exports = router;