var express = require('express');
var router = express.Router();

var products = [
  { id: 1, name: 'Product A', price: 10.0 },
  { id: 2, name: 'Product B', price: 15.0 },
  { id: 3, name: 'Product C', price: 20.0 }
];

router.get('/', function(req, res, next) {
    res.json({products:products});
});
router.post('/', function(req, res, next) {
    products.push(req.body);
    res.status(201).json(req.body);
});

module.exports = router;
