//Global variables
var startHour = 9;
times = "9 10 11 12 1 2 3 4 5".split(" ");
j = 0;
h = 9;
var hourEl;

var eventMoment = moment();

console.log(eventMoment);

console.log(eventMoment.format("MMMM D YYYY hA"));

var currentYear = eventMoment.format("YYYY");
var currentMonth = eventMoment.format("MMMM");
var currentDay = eventMoment.format("D");
var currentHour = parseInt(eventMoment.format("HH"), 10);

console.log(eventMoment.format("HH"));
console.log("Current hour: " + currentHour);


var meetings = [];

//function builds out the actual scheduler page with the times/descriptions
function buildScheduler(){

    for(i = 0; i < 9; i++){

        var timeblockDiv = $("<div>");
        timeblockDiv.attr("class", "time-block");
        $(".container").append(timeblockDiv);

        var hourDiv = $("<div>");
        hourDiv.attr("class", "hour");
        hourDiv.attr("data-hour", parseInt(h, 10));


        timeblockDiv.append(hourDiv);

        if(j < 3 ){
            hourEl = times[i] + "AM";
        }else{
            hourEl = times[i] + "PM";
        }

        $(hourDiv).text(hourEl);
        console.log($(hourDiv).text());

        var descriptionEl = $("<input>");
        descriptionEl.attr("class", "description");
        descriptionEl.attr("data-hour", h);
        descriptionEl.attr("id", h);

        // console.log(currentHour);
        console.log("data-hour: " + $(hourDiv).attr("data-hour"));

        if(parseInt($(hourDiv).attr("data-hour")) < currentHour){
            $(descriptionEl).attr("class", "description past");
            console.log("Past");
        } else if($(hourDiv).attr("data-hour") == currentHour){
            $(descriptionEl).attr("class", "description present");
            console.log("Current Hour!");
        } else{
            $(descriptionEl).attr("class", "description future");
        }

        timeblockDiv.append(descriptionEl);

        var saveDiv = $("<div>");
        saveDiv.attr("class", "save");
        $(timeblockDiv).append(saveDiv);

        var saveBtn = $("<input>");
        saveBtn.attr("type", "submit");
        saveBtn.attr("class", "saveBtn");
        saveBtn.attr("data-hour", h);
        $(saveDiv).append(saveBtn);

        startHour++;
        j++;
        h++;
    }
}

function saveInput(btn){

    //check to see if there are any storedDescription in localStorage. If so, set them to the empty descriptions array
    var storedMeetings = JSON.parse(localStorage.getItem("meetings"));
    if (storedMeetings !== null){
        meetings = storedMeetings;
    }

    // console.log(btn);

    var dataHour = $(btn).attr("data-hour");

    // var des = $(".description[data-hour = dataHour]").text();

    var eventData = {
        hour: dataHour,
        description: $("#" + dataHour).val()
    }

        meetings.push(eventData);

    console.log(meetings);

    localStorage.setItem("meetings", JSON.stringify(meetings));
}

$(document).on("click", ".saveBtn", function(event){

    event.preventDefault();
    console.log("Save Button");

    saveInput($(this));

});

buildScheduler();


