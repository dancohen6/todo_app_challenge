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

  // RETRIEVE TASKS FROM localStorage, PARSE BACK INTO ARRAY, RETURN ARRAY. RETURN EMPTY ARRAY IF NO TASK //
  function getTasks() {
    var rawData = localStorage.getItem("tasks");
    var parsed = JSON.parse(rawData) || [];
    return parsed;
  }

// APPLY CSS //

  // RETRIEVE HOUR FROM ELEMENT'S ID, COMPARE WITH CURRENT HOUR FROM DAYJS, APPLY CSS CLASS //
  $(".time-block").each(function() {
    var hour = $(this).attr("id").split("-")[1];
    if (hour < dayjs().hour()) {
      $(this).removeClass("future present").addClass("past");
    } else if (hour > dayjs().hour()) {
      $(this).removeClass("past present").addClass("future");
    } else {
      $(this).removeClass("past future").addClass("present");
    }
  });

  // ITERATE OVER TIME BLOCK ELEMENTS, RETRIVE TIME AND CALL SAVED TASK TO RETREIVE FROM localStorage. SET VALUE //
  $(".time-block").each(function() {
    var time = $(this).attr("id");
    var savedTask = getSavedTask(time);
    $(this).find("textarea").val(savedTask);
  });

  // RETRIEVE SAVED TASK FROM localStorage, RETRIEVE STORED JSON, PARSE BACK INTO ARRAY. FIND TASK OBJECT AND RETURN TASK IF TIME MATCHES //
  function getSavedTask(time) {
    var rawData = localStorage.getItem("tasks");
    var parsed = JSON.parse(rawData) || [];
    var task = parsed.find(function(item) {
      return item.time === time;
    });
    if (task) {
      return task.task;
    } else {
      return "";
    }
  }

$("#currentDay").text(dayjs().format("MMMM D, YYYY"));
});