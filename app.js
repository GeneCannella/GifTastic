    //
    //"
        var topics = ["Albert Einstein", "Isaac Newton", "Isaac Asimov", "Stephen Hawking",
        "King", "Queen", "Jack",
        "Shatner", "Nimoy", "Kirk", "Spock", "McCoy", "Scotty", "Checkov", "Sulu", "Uhura",
        "Lebron", "Michael Jordan", "Roger Federer", "Tom Brady",
        "Henry Winkler", "George Foreman", "Terry Bradshaw",
        "Captain America", "Thor", "The Hulk", "The Black Widow", "Iron Man","Hawkeye"
        ];


    // (Pseudo code item 1.) Here is the event handler that listens for button clicks and hits the GIPHY API
    // for the topic associated with that button
    // Bind the click handler to the document because not all buttons exist yet
    $(document).on("click", ".btn", function() {

        // (PC 1.1) Get the data-topic property value from the button that was clicked
        var topic = $(this).attr("data-topic");

        // (PC 1.2) Construct a queryURL using the topic from the clicked button
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        // (PC 1.3) Do an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // (PC 1.4) Use the "done" function to parse the response and put up the gifs
            .done(function(response) {

                console.log("queryURL= ", queryURL);
                console.log("response= ", response);

                // store the .data property from the AJAX response in the "results" variable
                var results = response.data;

                // discard the old gifs (if any) to make room for the new gifs
                $("#giphy-results").empty();

                // Loop through each results (response.data) item 
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag for an element that will hold one gif
                    var topicDiv = $("<div>");

                    // Creating a paragraph tag to display the results item rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag that will go inside the topicDiv and hold the gif
                    var topicImage = $("<img>");

                    // Set the img src attribute to the url for the (still) image, retrieved from the results item
                    topicImage.attr("src", results[i].images.fixed_height_still.url); //uses the still image

                    // now we need to create data attributes that will hold the urls for the still or animated images
                    // we will name them data-still and data-animate like in the class activity
                    // and add them to the <img> element
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);

                    // we also need to create a data attribute to hold the state of the image (still or animated)
                    // we will call it data-state, and add it to the <img> element, initialized to "still"
                    topicImage.attr("data-state", "still");

                    // add a class we can use to select the images later for a click function
                    topicImage.addClass("gif");

                    // append the completed paragraph and image elements to the topicDiv
                    topicDiv.append(p);
                    topicDiv.append(topicImage);
                    topicDiv.addClass("topicDiv"); //adding this class so we can style the image divs (first pass style is float: left)

                    // append the completed div (topicDiv) containing the rating text and the gif image 
                    // to the "#giphy-results" div
                    $("#giphy-results").append(topicDiv);
                }
            });

        console.log("gif html");
        console.log($(".gif").html());
    });

    // (Pseudo code item 2.) Here is the event handler that listens for the submit button used to create a new topic button
    $("#add-topic").on("click", function(event) {
        //prevent the submit button from performing its default action
        event.preventDefault();
        // get the value from the input textbox
        var topic = $("#topic-input").val().trim();
        // Add the topic entered by the user to the array that holds all topics
        topics.push(topic);
        // Call renderTopicButtons to draw a button for every topic in the array
        renderTopicButtons();
    });

    // (Pseudo code item 3.) Here is the click handler for animating the gifs 
    // (must bind to document rather than images, which come and go)
    $(document).on("click", ".gif", function() {

        //all this logging is to play around with the context of "this"
        console.log("gif has been clicked");
        console.log($(this).html()); //why doesn't the syntax work here?
        console.log($(this)[0]); // when the syntax here does work?
        console.log($(this).get(0)); // and the syntax here also works!
        console.log(this); // and the syntax here also also works!! (gives the native html img element)
        console.log("XXX");
        console.log($(this)); //gives us the jquery object wrapping the <img> element
        //done playing around with logging the "this" object


        // get the current value of the data-state attribute of the clicked <img> element
        var state = $(this).attr("data-state");
        console.log("data-state: ", state);

        // If the clicked image's state is still, update its src attribute to point to its animated version
        // Then, set the image's data-state to animate
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        // Else set the img src attribute to point to the still version
        // And set the image's data-state to animate 
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    function renderTopicButtons() {

        $("#rendered-buttons").empty();
        // Loop through the array of topics
        for (var i = 0; i < topics.length; i++) {
            // dynamicaly generate buttons for each topic in the array
            var a = $("<button>");
            // Add a class of "button" to each button, to select later, both event handler and styling
            a.addClass("btn btn-info");  //consider later if I needed this class at all, but could I have selected by the tag
            // Add a data-attribute to hold the topic text
            a.attr("data-topic", topics[i]);
            // Put the topic text into the button
            a.text(topics[i]);
            // Add the button to the buttons-view div
            $("#rendered-buttons").append(a);
        }
    }

    renderTopicButtons();
    //
    //
    //