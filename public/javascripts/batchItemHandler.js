$(document).ready(function() {

  // User clicked on an edit button
  $(".editButton").click(function () {
    console.log("is this thing firing?");
    window.location.href = "panel_" + $(this)[0].id;
  });

  // User clicked on a delete button
  $(".deleteButton").click(function () {
    var batchItemId = $(this)[0].id;
    console.log(batchItemId);

    $.ajax({
      url: "/form",
      method: "DELETE",
      data: {
        _id: batchItemId
      },
      success: function (response) {
        $("#panel_" + batchItemId).remove();  // Remove the DOM element on success
      }
    });
  });


});
