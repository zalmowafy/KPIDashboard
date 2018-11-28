'use strict';

var systemObj = require('../System.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');
//const utf8 = require('utf8');
/*fs.readFile('System.json', 'utf8', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(JSON.stringify(data));
    console.log(student);
});*/
console.log(systemObj.System.tagtype);
var obj = { 'tagtype': 'char', 'spare': 'byte' };
console.log(obj.spare);
var rawdata = JSON.parse(JSON.stringify(fs.readFileSync('System.json', 'utf8')));
//var system = String(rawdata);
//let system = JSON.parse(JSON.stringify(rawdata));
//let jStruct = JSON.stringify(system);
console.log(rawdata);
var test = JSON.parse(JSON.stringify(rawdata));
console.log(test);
console.log(rawdata.tagtype);
//console.log(system);
//var test2 = utf8.decode(system);
//console.log(test2);

var jStruct = JSON.stringify(system);//JSON.parse("\'" + system + "\'");

var test = JSON.parse(jStruct);
//console.log(JSON.parse(jStruct));
console.log("jStruct is " + test.tagtype);
console.log(jStruct.tagtype);
/*var tagType = "'"+ jStruct +"'";
var test = JSON.parse(tagType);
console.log(test.tagtype);*/
//console.log(jStruct.length);*/

/*function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
   // xobj.overrideMimeType("application/json");
    xobj.open('GET', './../System.json', true);
    xobj.onreadystatechange = function () {
        console.log(xobj.status);
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);

        }
    }
    xobj.send(null);
}

loadJSON(function (response) {
    var json_obj = JSON.parse(response);
    console.log(json_obj);
});*/