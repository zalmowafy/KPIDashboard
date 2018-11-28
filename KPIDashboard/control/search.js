module.exports = function search(actKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].act_id === actKey) {
            return myArray[i];
        }
    }
};