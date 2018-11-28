var dbConnection = require('../dbconnection');

var user = {

    getAllUsers: function (callback) {
        return dbConnection.query("SELECT * FROM user", callback);
    },

    getUser: function (name, callback) {
        console.log("DB USER IS  " + name);
        return dbConnection.query("SELECT UserId, fName, lName, Password FROM user WHERE Username ='" + name + "'", callback);
    },

    addUser: function (user, callback) {
        //console.log(JSON.parse(user));
        var jUser = JSON.parse(user);
       // console.log("DB USER IS  " + jUser.username, jUser.password, jUser.email, jUser.firstname, jUser.lastname);
        return dbConnection.query("INSERT INTO user (Username, Password) VALUES(?,?)", [jUser.email, jUser.password], callback);
    },

    updateUserPass: function (userid, password, callback) {
        return dbConnection.query("UPDATE user SET password='" + password + "'WHERE UserId ='" + userid + "'", callback);
    },

    deleteUser: function (userid, callback) {
        return dbConnection.query("DELETE FROM user WHERE UserId='" + userid + "'", callback);
    }
};

module.exports = user;