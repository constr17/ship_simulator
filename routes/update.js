let rti = require('../rti');
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    rti.next();
    res.send(JSON.stringify({"agents": rti.agents}));
});

router.get('/init', function(req, res, next) {
    rti.init();
    let r = Object.assign({}, {"agents": rti.agents}, {"config": rti.config});
    res.send(JSON.stringify(r));
});

router.get('/config', function(req, res, next) {
    res.send(JSON.stringify(rti.config));
});

module.exports = router;
