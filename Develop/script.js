$(function() {
  // ADD EVENT LISTENER (CLICK) TO ALL BUTTONS //
  $("button").on("click", function() {
    var item = {
      // RETRIEVE TIME AND TASK TO CREATE OBJECT //
      time: $(this).parent().attr("id"),
      task: $(this).prev().val(),
    };
// RETRIEVE TASKS AND PUSH NEW TO tasksArray, SAVE TO localStorage //
    var tasksArray = getTasks();
    tasksArray.push(item);
    saveUserData(tasksArray);
  });

  // RECEIVE ARRAY OF TASKS, CONVERT TO JSON, SAVE TO localStorage //
  function saveUserData(arr) {
    var jsonVal = JSON.stringify(arr);
    localStorage.setItem("tasks", jsonVal);
  }

$("#currentDay").text(dayjs().format("MMMM D, YYYY"));
});