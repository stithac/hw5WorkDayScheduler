//Global variables
var times = "9 10 11 12 1 2 3 4 5".split(" ");
var eventMoment = moment(); //Moment() object that gets current date/time
    console.log(eventMoment); //Console log current date and time
var currentYear = eventMoment.format("YYYY");
var currentMonth = eventMoment.format("MMMM");
var currentDay = eventMoment.format("MMMM, D YYYY");
var currentHour = parseInt(eventMoment.format("HH"), 10);

var meetings = []; //Creates empty meetings array

//Function buildScheduler() is called on page load.
//Function builds out the actual scheduler page with the times/descriptions
function buildScheduler(){
    console.log("Start of buildScheduler() function");

    var j = 0; //Variable used to append "AM" or "PM" to the hourEl
    var h = 9; //Start hour
    var hourEl; //Used to display timeblock hour

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

        //Add "AM" for the first 3 hour elements then "PM" to the rest. Times are stored in the times array.
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

        //saveDiv where saveBtns are appended
        var saveDiv = $("<div>");
        saveDiv.attr("class", "smallEl");
        $(timeblockDiv).append(saveDiv);

        //saveBtns
        var saveBtn = $("<button>");
        saveBtn.attr("class", "saveBtn fas fa-save");
        saveBtn.attr("data-hour", h);
        $(saveDiv).append(saveBtn);

        //Checks to see if there are any meetings in localStorage. If there are meetings saved in localStorage, they are stored in meetings variable.
        var storedMeetings = JSON.parse(localStorage.getItem("meetings"));
        if (storedMeetings !== null){
            meetings = storedMeetings;
        }

        //Checks to see if the current hourEl "h" exists anywhere in the meetings array and saves it to a variable named item.  If not in the array, item will be set to undefined.
        var item = meetings.find(item => item.hour == h);

        //If item exists, the description is saved in the descriptionEl for that hour
        if (item !== undefined){
            $(descriptionEl).val(item.description);
        }
        // startHour++;
        j++;
        h++;
    }
}

//saveInput() function is called everytime a button with the class .saveBtn is clicked.
//The function checks to see if there are any stored meetings in localStorage and sets them equal to the meetings array.
//The data-hour attribute (hour for the timeblock the button is in) is stored in a dataHour variable and checked against the hour parameter of the objects in the meetings array.
//If the dataHour is included in the meetings array, the function updates the description for that object.
//If the dataHour is not included in the meetings array, the function creates a new eventData object and pushes it to the meetings array.
//The meetings array is saved in localStorage.
function saveInput(btn){
    console.log("Start of saveInput() function");

    //Check to see if there are any storedDescription in localStorage. If so, set them to the empty meetings array
    var storedMeetings = JSON.parse(localStorage.getItem("meetings"));
    if (storedMeetings !== null){
        meetings = storedMeetings;
    }

    var dataHour = $(btn).attr("data-hour"); //Gets the data-hour attribute from the clicked button and saves to dataHour variable

    //Checks to see if the dataHour of the clicked button exists anywhere in the meetings array and saves it to a variable named item.  If not in the array, item will be set to undefined.
    var item = meetings.find(item => item.hour === dataHour);
    console.log(item);

    // If item is not undefined, it means there is input for the particular hour saved in the meetings array. The description for that object is updated to the new input.
    // If item is equal to undefined, that means there is no saved input for the particular hour and a new object is created and pushed to the array
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

    localStorage.setItem("meetings", JSON.stringify(meetings)); //Updates meetings array in local storage
}

//On click function for any button with the class ".saveBtn"
$(document).on("click", ".saveBtn", function(event){

    event.preventDefault();
    console.log("Save Button Clicked!");

    saveInput($(this));
});

buildScheduler(); //buildScheduler() is called on page load