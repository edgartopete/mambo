
$(document).ready(function () {
    console.log(localStorage.getItem("email"));
    // Client ID and API key from the Developer Console
    var CLIENT_ID = '978683882765-39iqllfp8j8qd9tvj71kq48istps5c74.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyBEJRfBSbC2vnJu7T-GLa8B-X3wMcr4hTg';
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/calendar";
    //var authorizeButton = document.getElementById('authorize_button');
    //var signoutButton = document.getElementById('signout_button');
    var date;
    var maxDate;
    var timesNot = [];
    var fromTime = ""
    /*get the variables to check times available*/
    $("#getDates").on("click", function (event) {
        event.preventDefault();
        getTimes();
    });
    function getTimes() {
        date = $("#datepicker").val();
        maxDate = $("#datepicker").val();
        fromTime = $("#time").val();
        if (date !== "" && maxDate !== "" & fromTime !== "") {
            $("#msg").hide();
            timesNot = [];
            switch (fromTime) {
                case 'm':
                    date = moment(date).format("YYYY-MM-DDT10:00:00-05:00");
                    maxDate = moment(maxDate).format("YYYY-MM-DDT12:59:00-05:00");
                    break;
                case 'n':
                    date = moment(date).format("YYYY-MM-DDT12:00:00-05:00");
                    maxDate = moment(maxDate).format("YYYY-MM-DDT21:00:00-05:00");
                    break;
            }
            gapi.load('client:auth2', initClient);
        } else {
            console.log("vacios");
            $("#msg").show();
            $("#msg").text("Plase fill all the fills.");
        }



    }

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
        //gapi.load('client:auth2', initClient);
    }
    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            //authorizeButton.onclick = handleAuthClick;
            //signoutButton.onclick = handleSignoutClick;
        }, function (error) {
            appendPre(JSON.stringify(error, null, 2));
        });
    }
    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            listUpcomingEvents();
        }
    }
    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }
    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }
    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }
    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    function listUpcomingEvents() {
        gapi.client.calendar.events.list({
            'calendarId': '04bth51k5i64kdo1100bahgajs@group.calendar.google.com',
            "timeMax": maxDate,
            'timeMin': date,
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 30,
            'orderBy': 'startTime'
        }).then(function (response) {
            var events = response.result.items;
            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.time;
                    }
                    when = moment(when).format("HH:mm");

                    when = when.split(":");

                    when = when[0];
                    //console.log(moment().hour());
                    timesNot.push(when);
                }
                console.log(timesNot);
                printTimes();
            } else {
                //appendPre('No upcoming events found.');
                printTimes();
            }
        });
        function createButtons(i) {
            var hour = i.toString() + ":00";
            var button = $("<button>");
            button.attr("type", "button");
            button.addClass("btn btn-warning");
            button.addClass("toShedule");
            button.attr("value", hour);
            button.text(hour);
            $("#timesA").append(button);
        }

        function printTimes() {
            $("#timesA").empty();
            if (timesNot.length > 0) {
                switch (fromTime) {
                    case 'm':
                        for (i = 10; i < 13; i++) {
                            if (!timesNot.includes(i.toString())) {
                                //console.log(i);
                                createButtons(i);
                            }
                        }
                        break;
                    case 'n':
                        for (i = 13; i < 21; i++) {
                            if (!timesNot.includes(i.toString())) {
                                //console.log(i);
                                createButtons(i);
                            }
                        }
                        break;
                }
            } else {
                switch (fromTime) {
                    case 'm':
                        for (i = 10; i < 13; i++) {
                            createButtons(i);
                        }
                        break;
                    case 'n':
                        for (i = 13; i < 21; i++) {
                            createButtons(i);
                        }
                        break;
                }
            }
        }
    }
    $("body").on("click", ".toShedule", function () {
        var startTime = $(this).text();
        var startdate = $("#datepicker").val();
        var endTime;
        var endDate;

        startTime = startTime.split(":");
        startTime = startTime[0];
        startdate = moment(startdate).format("YYYY-MM-DDT" + startTime + ":00:00-05:00");
        endTime = Number(startTime) + 1;
        startdate = moment(startdate).format("YYYY-MM-DDT" + startTime + ":00:00-05:00");
        endDate = moment(startdate).format("YYYY-MM-DDT" + endTime + ":00:00-05:00");
        console.log(startdate);
        console.log(endDate);


        // setup event details
        var resource = {
            "summary": localStorage.getItem("email"),
            'location': 'HandLab Condesa',
            'description': 'Mambo schelude',
            "start": {
                "dateTime": startdate
            },
            "end": {
                "dateTime": endDate
            },
            "attendees": [
                {
                  "email": localStorage.getItem("email")
                }
              ]
        };

        gapi.client.load('calendar', 'v3', function () {					// load the calendar api (version 3)
            var request = gapi.client.calendar.events.insert({
              'calendarId':'04bth51k5i64kdo1100bahgajs@group.calendar.google.com',	// calendar ID
              'resource': resource,
              'sendNotifications': true
            });
            request.SendNotifications = true;
            // handle the response from our api call
            request.execute(function (resp) {
              if (resp.status == 'confirmed') {
                //document.getElementById('event-response').innerHTML = "Event created successfully. View it <a href='" + resp.htmlLink + "'>online here</a>.";
                $("#msg").removeClass("alert-danger");
                $("#msg").addClass("alert-success");
                $("#msg").show();
                $("#msg").text("You have been schedules");
                $("#scheduleForm").empty();
    
              } else {
                //document.getElementById('event-response').innerHTML = "There was a problem. Reload page and try again.";
                //console.log("error intente de nuevo ");
                $("#msg").show();
                $("#msg").text("Somethis when wrong. Please try in a few minutes");
              }
            });
        });         

    });//end of onclick toShedule

});

