module.exports = function mergediff(orig_data, new_data) {
    console.log("Inside Cache!!");
    var diff = { needUpdate: false, data: {} };
    var diff_data = diff.data;
    for (var key in new_data) {
        if (!orig_data.hasOwnProperty(key)
            || JSON.stringify(orig_data[key]) !== JSON.stringify(new_data[key])) {
            diff.needUpdate = true;
            orig_data[key] = new_data[key];
            diff_data[key] = new_data[key];
        }
    }
    if (Object.keys(orig_data).length > 50) {
        var ordered = Object.keys(orig_data).sort();
        var delNum = ordered.length - 50;
        for (var i = 0; i < delNum; i++) {
            delete orig_data[ordered[i]];
        }
    }
    console.log("End of cache!");
    return diff;
}