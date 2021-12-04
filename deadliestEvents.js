function change(btn , col) {
    document.getElementById(btn).style.backgroundColor=col;
}

selectTop3("volcano", -2000, 2021);
    
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

       
function selectTop3(typeEvent, min, max){ 
    if (min === undefined || max === undefined) {
		const sliderElement = $( "#slider-range" )
		const datesSelected = sliderElement.slider( "option", "values")
		min = datesSelected[0]
		max = datesSelected[1]
	} 
    d3.json("Datasets_formatted/"+typeEvent+"_events_formatted.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
        FirstElement = -9999;
	    locationFirst = -9999;
	    SecondElement = -9999;
        locationSecond = -9999;
        ThirdElement = -9999;
        locationThird = -9999;

        for (var i=0; i < data.length; i++){
            if (data[i].year>=min && data[i].year<=max){
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
        }

        document.getElementById("firstDeadly").innerHTML = locationFirst + " - " + FirstElement;
        document.getElementById("secondDeadly").innerHTML = locationSecond + " - " + SecondElement;
        document.getElementById("thirdDeadly").innerHTML = locationThird + " - " + ThirdElement;

    })
}