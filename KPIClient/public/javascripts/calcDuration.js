function calcDuration(tDuration) {

    var arrTime = (tDuration.split(':'));
    console.log(arrTime);
    var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
    return duration;
}