// modal window source : w3schools.com

// Get the modal
var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];




function eventModal(eventId, eventType){
  
  // get Modal text
  var modalText = d3.select("#modalText")
  
  //change modal content class for formatting
  if(eventType  == "eruptions"){
    var fileName = "Datasets_formatted/volcano_events_formatted.json"
    var eventTypeText = "Eruption"
    d3.select("#modalContent").style("background-color", "firebrick")
  } else if(eventType == "earthquakes"){
    var fileName = "Datasets_formatted/earthquakes_events_formatted.json"
    var eventTypeText = "Earthquake"
    d3.select("#modalContent").style("background-color", "seagreen")
  } else if(eventType == "tsunamis"){
    var fileName = "Datasets_formatted/tsunamis_events_formatted.json"
    var eventTypeText = "Tsunami"
    d3.select("#modalContent").style("background-color", "royalblue")
  }

 

  // get data from the right file
  d3.json(fileName, function(data){  
    // Clear modal window content
    modalText.html("")

    
    // get data of the event
    var eventData = data.filter(function(e){ return e.id == eventId})

    console.log(eventData[0]["comments"])
    // Content of Modal window


    // Title
    modalText.data(eventData).append("h1").text( function(e){ return eventTypeText + " in " + e["locationName"]} );
    // Subtitle
    modalText.data(eventData).append("h2").text(function(e){ return  e["year"]}).style("test-diplay", "center")

    // Comments
    modalText.data(eventData).append("p").html(function(e){ return  e["comments"]})
    
    modal.style.display = "block";
  });
   
    

  



  
};








// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}