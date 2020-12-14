# hw5WorkDayScheduler, 12 DEC 20 **Extended to 15 DEC 20
#### By Ashley Stith
## Description
This Application runs in the browser and is a simple calendar that allows a user to save events for each hour of the day.  It features dynamically updated HTML and CSS powered by jQuery. The [Moment.js](https://momentjs.com/) library is used to pull in the current date and times.

The application display is a calendar with timeblocks for each of the working hours of 9AM - 5PM.  Timeblocks that have already passed, are shaded in grey. The current timeblock is shaded in  light red with bold font, and the future timeblocks are shaded in dark red. When a user clicks any of the timeblock save buttons, the description text and time are saved to their browser's localStorage. Once the page is re-loaded, all previously saved events are displayed on the page. Link to application: https://stithac.github.io/hw5WorkDayScheduler/

![Alt text](./Assets/site-screenshot1.PNG?raw=true)

## Features
* Application calls the buildScheduler() function on load.  This function builds out the display.
* Application pulls timeblocks from a pre-populated array of times and dynamically creates the timeblock divs when the page loads.
    * Each timeblock div includes an hour element that displays the hour, a description textarea for user input and a save button to save the timeblock to the localStorage.
* Once a user clicks a Save button, the corresponding hour and description text are saved to the user's localStorage.
* When the user refreshes the page, the all saved input will be displayed on the page.

## Setup/Installation Requirements
* Clone this repository.
* Open app in your browser.

## Known Bugs
Site has been passed through the W3C HTML/CSS validation service.

Site should be accessed via Google Chrome (preferred), Firefox or Edge. IE does not render the jQuery properly.

## Technologies Used
* HTML
* CSS
* JavaScript
* jQuery
* The following libraries are also used:
    * Bootstrap
    * Font Awesome
    * Google Fonts
    * Moment.js

## Contribution Guidelines
Direct link to repository: https://github.com/stithac/hw5WorkDayScheduler

### Specifications
1. Use Google Chrome (preferred), Firefox or Edge for jQuery to render properly.
