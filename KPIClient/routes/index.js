'use strict';
var express = require('express');
var router = express.Router();
var http = require('http');
var bcrypt = require('bcryptjs');

var name, password;
var message = '';
var _rName;
var dbApiGet, dbApiPost;
var config = require('../clientconfig');
/**
 * *********************Server Request parameter configuration*********************
 */
var serverRequest = {
    host: config.serverapi.host,
    port: config.serverapi.port,
    path: '/users/api/login',
    method: 'GET',
    headers: {
        'name': name,
        'password': password
    }

};

var serverPost = {
    host: config.serverapi.host,
    port: config.serverapi.port,
    path: '/users/api/register',
    method: 'POST',
    headers: {},
    body: {}
};

/* GET home page. */
router.get('/home', function (req, res) {
    res.render('home');
});

router.get('/processdashboard', function (req, res) {
    res.render('process', { name: _rName, message: "" });
});

router.get('/live', function (req, res) {
    res.render('LiveDataViews', { name: _rName, message: "" });
});

router.get('/festodiagram', function (req, res) {
    res.render('Diagrams', { name: _rName, message: "" });
});


router.get('/login', function (req, res) {

    console.log("Entered GET!!!");
    //var message = '';
    res.render('login', { message: message });

});

router.post('/login', function (req, res) {
    console.log("Entered Post!!!");
    message = '';
    _rName = req.body.name;
    password = req.body.password;
    console.log(password);
    serverRequest.headers.name = req.body.name;
    serverRequest.headers.password = req.body.password;
     
    /**
     * *****************Sample for making a remote GET call********************************
     */
    console.info('Options prepared:');
    console.info(serverRequest);
    console.info('Do the GET call');

    dbApiGet = http.request(serverRequest, function (response) {
        console.log("statusCode: ", response.statusCode);
        response.on('data', function (data) {
            console.info('GET result: \n');
            console.log(data);
            process.stdout.write(data);
            console.info('\n\nCall completed');
            console.log((JSON.parse(data)).statusCode);
            var _sCode = (JSON.parse(data)).statusCode;
            
            if (_sCode == 500) {
                console.log("Failure");
                message = 'Invalid username or password, Please re-enter your credintials!';
                res.send(res.statusCode);
                res.redirect('/login?message=' + message);
            }
            if (_sCode == 200) {
                console.log("success");
                message = ' Hi, \n\nWhat would you like to do today?';
                res.redirect('/homepage?message=' + message);
            }
        });
        
    });

    dbApiGet.end();
    dbApiGet.on('error', function (e) {
        console.log(e);
    });

});

router.get('/homepage', function (req, res) {

   // console.log("Entered Register GET!!!");
    // var message = '';
    res.render('homepage', { message: req.query.message, name: _rName });

});

router.get('/register', function (req, res) {

    console.log("Entered Register GET!!!");
    message = '';
    res.render('register', { message: message });

});

router.post('/register', function (req, res) {
   
    var userobj = req.body;

    /**
     * **********************************Email & Password Validation************************************************
     */
    _rName = req.body.email;
    var email = req.body.email;
    var password = req.body.password;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var _isValidEmail = re.test(email);
    
    var _hasUpper = password.match(/[A-Z]/g);
    var _hasLower = password.match(/[a-z]/g);
    var _hasNumber = password.match(/[0-9]/g);
    var message = '';

    console.log(_hasLower, _hasNumber, _hasUpper);

    if (!_isValidEmail) {
        message = "Email address is not valid. Please re-enter a valid email!";
        res.render('register', { message: message });
    }
    else if (_hasUpper == null && _hasLower == null && _hasNumber == null) {
        message = "Password must contain at least one upper letter and a number!";
        res.render('register', { message: message });
    }
    else {

         console.log(_isValidEmail);
         userobj.password = bcrypt.hashSync(req.body.password, 8);
         console.log(userobj);
         serverPost.headers = userobj;
         serverPost.body = userobj;

         dbApiPost = http.request(serverPost, function (response) {
            console.log("statusCode: ", response.statusCode);
            response.on('data', function (data) {
                console.info('GET response: \n');
                process.stdout.write(data);
                console.info('\n\nCall completed');
            });
             if (response.statusCode == 200) {
                 message = 'Thank You for your registration,\n now please let us know what would you like to do?';
                 res.redirect('/homepage?message=' + message);
            }
         });

         dbApiPost.end();
         dbApiPost.on('error', function (e) {
            console.log(e);
         });
    }

});

router.get('/demo', function (req, res) {
    res.render('hometest', { name: _rName });
});
router.get('/demo2', function (req, res) {
    res.render('fakeLiveData', { name: _rName });
});

router.get('/test', function (req, res) {
   
    res.render('testlivedata', { name: _rName, message: "" });
});

router.get('/processd', function (req, res) {

    res.render('pdistribution', { name: _rName, message: "" });
});

router.get('/pusher', function (req, res) {

    res.render('apusher', { name: _rName, message: "" });
});

router.get('/swvlarm', function (req, res) {

    res.render('aswvlarm', { name: _rName, message: "" });
});

router.get('/swvlgrp', function (req, res) {

    res.render('aswvlgrpr', { name: _rName, message: "" });
});

module.exports = router;
