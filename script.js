//Global variables
var times = "9 10 11 12 1 2 3 4 5".split(" ");
var eventMoment = moment();
    console.log(eventMoment); //Console log current date and time
var currentYear = eventMoment.format("YYYY");
var currentMonth = eventMoment.format("MMMM");
var currentDay = eventMoment.format("MMMM, D YYYY");
var currentHour = parseInt(eventMoment.format("HH"), 10);

var meetings = []; //Creates empty meetings array

//Function buildScheduler() is called on page load
//builds out the actual scheduler page with the times/descriptions
function buildScheduler(){
    console.log("Start of buildScheduler() function");

    var j = 0;
    var h = 9;
    var hourEl;

    $(".imgGif").attr("src", "./Assets/busy-working-gif.gif"); //Add gifImg to the page

    $("#currentDay").text(currentDay); //Update the current day
    $("#currentDay").attr("style", "font-weight:bold");

    for(i = 0; i < 9; i++){

        //Create timeblock divs on page:

        //timeblock divs
        var timeblockDiv = $("<div>");
        timeblockDiv.attr("class", "time-block");
        $(".container").append(timeblockDiv);

        //hour elements
        var hourDiv = $("<div>");
        hourDiv.attr("class", "hour smallEl");
        hourDiv.attr("data-hour", parseInt(h, 10));
        hourDiv.attr("id", h + "hour");

        timeblockDiv.append(hourDiv); //append hour to timeblock div

        //Add AM for the first 3 hour elements then PM to the rest. Times are stored in the times array
        if(j < 3 ){
            hourEl = times[i] + "AM";
        }else{
            hourEl = times[i] + "PM";
        }

        $(hourDiv).text(hourEl); //Add hours to hour divs

        //description elements
        var descriptionEl = $("<textarea>");
        descriptionEl.attr("class", "description");
        descriptionEl.attr("data-hour", h);
        descriptionEl.attr("id", h + "description");

        console.log("data-hour: " + $(hourDiv).attr("data-hour"));

        //Determine if timeblock is past, present or futher based
        if(parseInt($(hourDiv).attr("data-hour")) < currentHour){

            $(descriptionEl).attr("class", "description past");
            console.log("Past");

        } else if($(hourDiv).attr("data-hour") == currentHour){

            $(descriptionEl).attr("class", "description present");
            console.log("Current Hour!");

        } else{

            $(descriptionEl).attr("class", "description future");
            console.log("Future");
        }

        timeblockDiv.append(descriptionEl); //append description element to timeblock div

        var saveDiv = $("<div>");
        saveDiv.attr("class", "smallEl");
        $(timeblockDiv).append(saveDiv);

        var saveBtn = $("<button>");
        saveBtn.attr("class", "saveBtn fas fa-save");
        saveBtn.attr("data-hour", h);
        $(saveDiv).append(saveBtn);

        //Checks to see if there are any meetings in localStorage. Adds the saved descriptions to the description element
        //Check to see if there are any storedDescription in localStorage. If so, set them to the empty descriptions array
        var storedMeetings = JSON.parse(localStorage.getItem("meetings"));

        if (storedMeetings !== null){
            meetings = storedMeetings;
        }
        var item = meetings.find(item => item.hour == h);

        if (item !== undefined){
            $(descriptionEl).val(item.description);
        }
        // startHour++;
        j++;
        h++;
    }
}

function saveInput(btn){
    console.log("Start of saveInput() function");

    //check to see if there are any storedDescription in localStorage. If so, set them to the empty descriptions array
    var storedMeetings = JSON.parse(localStorage.getItem("meetings"));
    if (storedMeetings !== null){
        meetings = storedMeetings;
    }

    var dataHour = $(btn).attr("data-hour"); //gets the data-hour attribute from the clicked button and saves to dataHour variable

    var item = meetings.find(item => item.hour === dataHour);
    console.log(item);

    if (item !== undefined) {
        console.log("dataHour " + dataHour + " is in my array");
        item.description = $("#" + dataHour + "description").val();
      }else{
          console.log(dataHour + " is not in the array");
          var eventData = {
            hour: dataHour,
            description: $("#" + dataHour + "description").val()
        }
        meetings.push(eventData);
    }

    console.log(meetings);
    console.log(dataHour);
    console.log(meetings.indexOf("dataHour"));

    localStorage.setItem("meetings", JSON.stringify(meetings));
}

$(document).on("click", ".saveBtn", function(event){

    event.preventDefault();
    console.log("Save Button Clicked!");

    saveInput($(this));
});

buildScheduler();