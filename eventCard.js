// modal window source : w3schools.com


//get dictionnaries 
var helper
d3.json("Datasets/helper_dataset.json", function(data){
  helper = data
});

// Get the modal
var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


function eventModal(eventId, eventType){

  // get Modal text
  var modalText = d3.select("#modalText")
  
  //change modal content class for formatting
  if(["eruptions", "eruption"].includes(eventType)){
    var fileName = "Datasets_formatted/volcano_events_formatted.json"
    var eventTypeText = "Eruption"
    d3.select("#modalContent").style("background-color", "firebrick")
  } else if(["earthquake", "earthquakes"].includes(eventType)){
    var fileName = "Datasets_formatted/earthquakes_events_formatted.json"
    var eventTypeText = "Earthquake"
    d3.select("#modalContent").style("background-color", "seagreen")
  } else if(["tsunamis", "tsunami"].includes(eventType)){
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


    // Content of Modal window

    // Title
    modalText.data(eventData).append("h1").text( function(e){ return eventTypeText + " in " + e["country"]} );

    // Subtitle: Date
    var dateString
    if(!!eventData[0]["startDate"]){
      dateString = eventData[0]["startDate"]
      if(!!eventData[0]["endDate"]){dateString += " to " +  eventData[0]["startDate"]}
    } else{
      dateString = eventData[0]["year"]
      if(!!eventData[0]["month"]){
        dateString+= "-"+('0' + eventData[0]["month"]).slice(-2)
        if(!!eventData[0]["day"]){ dateString+="-"+('0' + eventData[0]["day"]).slice(-2) }
      }
    }
    modalText.data(eventData).append("h2").text(dateString)

    //Locations

    modalText.append("h3").text("Location :")
    //location name
    if(!!eventData[0]["locationName"]){
      modalText.data(eventData).append("p").text(function(e){return   e["locationName"] +  "   [" + e["latitude"] + ";"+ e["longitude"]+"]"})
    };

    // Consequences
 
    modalText.append("h3").text("Consequences :")
    // deaths
    if(!!eventData[0]["deaths"]){
      modalText.data(eventData).append("p").text(function(e){return  + e["deaths"] + " deaths"})
    } 

    if(!!eventData[0]["damageAmountOrder"]){
      modalText.data(eventData).append("p").text(function(e){return "Damage Amount : " + helper["damage"][e["damageAmountOrder"]]["description"]})
    } 



    // Comments
    modalText.append("h3").text("Comments :")
    // add Comments
    modalText.data(eventData).append("p").html(function(e){ return  e["comments"]})
    


    //display modal window
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

// Event listener : when click on tops, display pop up card
document.getElementById("gold").addEventListener("click", (e) =>{
  console.log(idGold)
  console.log(typeGold)
  eventModal(idGold, typeGold)
});

document.getElementById("silver").addEventListener("click", (e) =>{
  console.log(idSilver)
  console.log(typeSilver)
  eventModal(idSilver, typeSilver)
});

document.getElementById("bronze").addEventListener("click", (e) =>{
  console.log(idBronze)
  console.log(typeBronze)
  eventModal(idBronze, typeBronze)
});


document.getElementById("gold").style.cursor = 'pointer'
document.getElementById("silver").style.cursor = 'pointer'
document.getElementById("bronze").style.cursor ='pointer'