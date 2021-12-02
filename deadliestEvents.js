function change(btn , col) {
    document.getElementById(btn).style.backgroundColor=col;
}

selectTop3("volcano");
    
d3.select("#volcanos_top") // je fais le script click avec la fct selectop3
    .on("click", function(){ 
        selectTop3("volcano");
        change("volcanos_top" , "firebrick");
        change("tsunamis_top" , "rgb(50, 63, 73)");
        change("earthquakes_top" , "rgb(50, 63, 73)")
});

d3.select("#tsunamis_top")
    .on("click", function(){
        selectTop3("tsunamis");
        change("tsunamis_top" , "dodgerblue");
        change("volcanos_top" , "rgb(50, 63, 73)");
        change("earthquakes_top" , "rgb(50, 63, 73)")
});

d3.select("#earthquakes_top")
    .on("click" , function(){
        selectTop3("earthquakes");
        change("earthquakes_top" , "seagreen");
        change("tsunamis_top" , "rgb(50, 63, 73)");
        change("volcanos_top" , "rgb(50, 63, 73)")
});

       
function selectTop3(typeEvent){ //je cree la fct selectop3 mais apres je bug 
    d3.json("Datasets_formatted/"+typeEvent+"_events_formatted.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
        FirstElement = -9999;
	    locationFirst = -9999;
	    SecondElement = -9999;
        locationSecond = -9999;
        ThirdElement = -9999;
        locationThird = -9999;

        for (var i=0; i < data.length; i++){
            if (data[i].deaths > FirstElement){

                ThirdElement = SecondElement;
                SecondElement = FirstElement;
                FirstElement = data[i].deaths;

                locationThird = locationSecond;
                locationSecond = locationFirst;
                locationFirst = data[i].locationName;

            } else if (data[i].deaths > SecondElement){

                ThirdElement = SecondElement;
                SecondElement = data[i].deaths;

                locationThird = locationSecond;
                locationSecond = data[i].locationName;

            } else if (data[i].deaths > ThirdElement){
                ThirdElement = data[i].deaths;
                locationThird = data[i].locationName;
            } 
        }

        let locationGold = JSON.stringify(locationFirst);
        let locationSilver = JSON.stringify(locationSecond);
        let locationBronze = JSON.stringify(locationThird);

        let deathsGold = JSON.stringify(FirstElement);
        let deathsSilver = JSON.stringify(SecondElement);
        let deathsBronze = JSON.stringify(ThirdElement);

        console.log(locationGold)

        document.getElementById("firstDeadly").innerHTML = locationGold + " - " + deathsGold;
        document.getElementById("secondDeadly").innerHTML = locationSilver + " - " + deathsSilver;
        document.getElementById("thirdDeadly").innerHTML = locationBronze + " - " + deathsBronze;

    })
}