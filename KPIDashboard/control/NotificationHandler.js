module.exports = function (gwUpdate, gwData) {
    var notification = { needUpdate: false, newdata: {} };
    console.log("Notification function is called!");
    console.log(gwUpdate, gwData);
    if (gwUpdate) {
        //var actStartTime = new Date(gwData.actuator_start);
        var bufferLength = (Object.keys(gwData).length)*27;

        const buffer = Buffer.alloc(bufferLength);

        buffer.write(JSON.stringify(gwData), "utf-8");
       // buffer.write(gwData[0].actuator_id.toString(), "utf-8");
       // buffer.write(', '+ gwData[0].actuator_start, 3,"utf-8");
       // buffer.write(', ' + gwData[0].actuator_cycle_time, 24, "utf-8");
       // buffer.write(", " + gwData.actuator_min, 34, "utf-8");
       // buffer.write(", " + gwData.actuator_max, 44, "utf-8");
        //buffer.write(", " + gwData.actuator_status.toString(), 54, "utf-8");
        
        if (buffer.byteLength == bufferLength) {
            console.log("Buffer reached maximum" + buffer.byteLength);
            notification.needUpdate = true;
            notification.newdata = buffer.toString('utf-8');
           // var tempBuffer = buffer.slice(bufferLength - (Object.keys(gwData).length), bufferLength);
           // console.log(buffer.toString('utf-8'));
           // return true;
        }

    }
    console.log(notification);
    return notification;
   // else {
  //      return false;
  //  }
};

//module.exports = notification;