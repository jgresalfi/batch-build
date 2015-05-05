var elem = document.getElementById("batchNum");
Date.prototype.getJulian = function() {
    return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
}

var today = new Date();
var julian = today.getJulian();
elem.value = julian;
