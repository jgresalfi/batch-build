
$( document ).ready(function() {
  $( "select" ).change(function () {
    var str = "";
    Date.prototype.getJulian = function() {
        return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
    }
    var today = new Date();
    var julian = today.getJulian();
    $( "select option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });
    $( "#batchNum" ).val( julian + str );
  })
  .change();
});
