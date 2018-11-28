var dataType = {
    CHAR: 1,
    INTEGER: 2,
    DATETIME: 3,
    TIME: 4,
    BYTE: 5,
    REAL: 6,

    
    //INTEGER: 1,
    //DATETIME: 2,
    //TIME: 3,
    
    getLength: function (aType) {
        switch (aType) {
            case this.CHAR:
                return 1;
            case this.INTEGER:
                return 2;
            case this.DATETIME:
                return 8;
            case this.TIME:
                return 4;
            case this.BYTE:
                return 1;
            case this.REAL:
                return 4;
        }
    },
    getFunction: function (aType) {
        switch (aType) {
            case this.CHAR:
                return function (aChar) {
                    return aChar & 0xFF;
                };

            case this.INTEGER:
                return function (aInteger) {
                    console.log(aInteger);
                    var stbyte = ((aInteger[0] << 8));
                    console.log(stbyte);
                    var ndbyte = (aInteger[1] & 0xFF);
                    console.log(ndbyte);
                    console.log(stbyte + ndbyte);
                    var wholenum = (stbyte | ndbyte);
                    console.log(wholenum);
                    return wholenum;
                };

            case this.DATETIME:
                return function (aDateTime) {
                    if (aDateTime.length != 8) return {};
                    else {
                        var year = 2000 + (aDateTime[0] >> 4 & 0x0F) * 10 + (aDateTime[0] & 0x0F);
                        var month = ((aDateTime[1] << 4) & 0x0F) * 10 + (aDateTime[1] & 0x0F);
                        console.log("month is  " + month);
                        month = month - 1;
                        var day = (aDateTime[2] << 4 & 0x0F) * 10 + (aDateTime[2] & 0x0F);
                        var hour = (aDateTime[3] >> 4 & 0x0F) * 10 + (aDateTime[3] & 0x0F);
                        var minute = (aDateTime[4] >> 4 & 0x0F) * 10 + (aDateTime[4] & 0x0F);
                        var second = (aDateTime[5] >> 4 & 0x0F) * 10 + (aDateTime[5] & 0x0F);
                        var msecond = (aDateTime[6] >> 4 & 0x0F) * 100 + (aDateTime[6] & 0x0F) * 10 + (aDateTime[7] >> 4 & 0x0F);
                        //console.log(new Date(Date.UTC(year, month, day, hour, minute, second, msecond)));
                        //console.log("month is " + month);
                        var date = new Date(Date.UTC(year, month, day + ' ', ' ' + hour, minute, second, msecond));
                        //date.setMonth(month);
                        console.log("date is " + date);
                        return date.toISOString().substring(0, 23).replace('T', ' ');
                    };
                };
            case this.TIME:
                return function (aTime) {
                    if (aTime.length != 4) return {};
                    var aMSecond = aTime[0] << 24 | aTime[1] << 16 | aTime[2] << 8 | aTime[3];
                    var aDate = new Date(aMSecond);
                    console.log(aDate);
                    console.log(aDate.toISOString().substring(12, 19).replace('T', ' '));
                    return aDate.toISOString().substring(12, 23).replace('T', ' ');
                   /*return {
                        hour: aDate.getUTCHours(),
                        minute: aDate.getUTCMinutes(),
                        second: aDate.getUTCSeconds(),
                        msecond: aDate.getUTCMilliseconds(),
                    };*/
                };

            case this.BYTE:
                return function (aByte) {
                    return aByte & 0xFF;
                };
        }
    }
};

module.exports = dataType;