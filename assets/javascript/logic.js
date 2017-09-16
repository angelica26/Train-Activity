
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
  
 

//function to clear inputs 
function clear() {
	$("#train-name").val("");
	$("#destination").val("");
	$("#first-train").val("");
	$("#frequency").val("");
}

// Capture Button Click
$("#submit").on("click", function(event) {
	event.preventDefault();

//Retrieving data from inputs
	trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = $("#frequency").val().trim();
  console.log(trainName);
      
  	// Code for the push to Firebase
    database.ref().push({
    	trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

	//clearing the inputs
	clear();


});

     //Getting the entered info from Firebase and displaying it on the train schedule
    database.ref().on("child_added", function(snapshot) {
    	
    	var trainInfo = snapshot.val();
      
      // console.log(trainInfo.trainName);
      // console.log(trainInfo.destination);
      // console.log(trainInfo.firstTrain);
      // console.log(trainInfo.frequency);
      // console.log(snapshot.val());

    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log("Time Apart " + tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#train-schedule").append("<tr><td class='train'>" + trainInfo.trainName +
        "</td><td class= 'dest'>" + trainInfo.destination +
        "</td><td class='freq'>" + trainInfo.frequency + 
        "</td><td class='next'>" + moment(nextTrain).format("hh:mm") +
        "</td><td class='min-away'>" +  tMinutesTillTrain + "</td></tr>");
      
    });
    



      //TO DO: 
  
      // - Push or set ??? moment.js data in Firebase and then make it display on page/stay on page
      // - Make it look nice!

    


