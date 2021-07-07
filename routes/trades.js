const express = require('express');
const router = express.Router();
const {
    searchTrades,
    searchTradesByParam,
    addTrades,
    modifyExistingTrades
} = require('../controllers/trades');

router.get('/', searchTrades);
router.get('/:searchparams', searchTradesByParam);
router.post('/', addTrades);
router.put('/:id', modifyExistingTrades);
router.patch('/:id', modifyExistingTrades);
router.delete('/:id', modifyExistingTrades);

module.exports = router;