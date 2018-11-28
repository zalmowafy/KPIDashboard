'use strict';
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');

//router.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.json());

var user = require('../models/user');

var name, password;

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource' + JSON.stringify(req.headers));
    
});

router.post('/api/register', function (req, res) {

    var s_userObj = JSON.stringify(req.headers);

    console.log(s_userObj);

    user.addUser(s_userObj, function (err, count) {
        if (err) {
            // 
            console.log(err);
            res.json(err);
        }
        else {
            res.json({ success: "Inserted Successfully", statusCode: 200 });
        }
    });
});

router.get('/api/login', function (req, res) {
    var s_header = JSON.parse(JSON.stringify(req.headers));
    var name = s_header.name;
    var password = s_header.password;
    console.log(s_header, name, password);
    console.log("Instantiated sever request.....");
    user.getUser(name, function (err, rows) {
        console.log("Get user called!");
        if (err) {
            // 
           // bcrypt.compare(myPlaintextPassword, hash, function (err, res) {
                // res == true
           // });
            console.log("IF!!");
            console.log(err);
            res.json(err);
        }
        else {
            console.log("ELSE!!");
            if (rows.length) {
                var _dbObj = JSON.parse(JSON.stringify(rows));
                var _pass = _dbObj[0].Password;
                console.log(_pass);
                var _isTrue = bcrypt.compareSync(password, _pass);
                console.log(_isTrue);
                if (_isTrue) {
                    console.log(rows);
                    //res.json(rows);
                    res.json({ sucess: "found rows", statusCode: 200 });
                }
                else {
                    es.json({ failed: "No matching rows", statusCode: 500 });
                }
                
            }
            else {
                res.json({ failed: "No matching rows", statusCode: 500 });
            }
           
        }
    });
});
module.exports = router;
