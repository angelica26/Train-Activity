
// Initializing Firebase
var config = {
    apiKey: "AIzaSyAOPd-HeXXdsmJWGrgn8HVnb6fvOabxu3E",
    authDomain: "train-activity-893d1.firebaseapp.com",
    databaseURL: "https://train-activity-893d1.firebaseio.com",
    projectId: "train-activity-893d1",
    storageBucket: "",
    messagingSenderId: "68747387925"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;

// Capture Button Click
$("#submit").on("click", function(event) {
	event.preventDefault();

//Retrieving data from inputs
	trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = $("#frequency").val().trim();
  console.log(trainName);
      
  	// Code for the push
    database.ref().push({
    	trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

     //Getting the entered info from Firebase and displaying it on the train schedule
    database.ref().on("child_added", function(snapshot) {
    	var trainInfo = snapshot.val();
      console.log(trainInfo.trainName);
      console.log(trainInfo.destination);
      console.log(trainInfo.firstTrain);
      console.log(trainInfo.frequency);
      console.log(snapshot.val());

    $("#train-schedule").append("<tr>" + "<td id='train'>" + trainInfo.trainName +
        "<td id= 'dest'>" + trainInfo.destination +
        "<td id='first'>" + trainInfo.firstTrain +
        "<td id='freq'>" + trainInfo.frequency + "</tr>");
      
    });

     

});

      //TO DO: 
      // - Make inputs clear after text has been submitted
      // - Add moment.js cdn link to html file
      // - Figure out how to make moment.js do calculation to determine what time the next train will come and how many min away that is
      // - The first train time itself does not go on the train schedule. It needs to get changed by moment.js
      // - Make it look nice!

    


