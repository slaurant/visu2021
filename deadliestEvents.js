
selectTop3(-2000, 2021);
    


function selectTop3(min, max){
    
    d3.json("Datasets_formatted/all_data.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
        
        const icon = {
            "earthquake" : "fas fa-globe-americas", 
            "tsunami" : "fas fa-water", 
            "eruption" : "fas fa-fire-alt", 
        }

        let dataYears = [];
        
        for (var i=0; i < data.length; i++){
            if (data[i].year>=min && data[i].year<=max){
                dataYears.push(data[i])
            }
        } 
        dataYears.sort(function (a, b) {
            return b.deaths - a.deaths;
            });


        if (dataYears.length >= 3 ){
            let locationGold = dataYears[0].locationName;
            let locationSilver = dataYears[1].locationName;
            let locationBronze = dataYears[2].locationName;
            
            let deathsGold = dataYears[0].deaths;
            let deathsSilver = dataYears[1].deaths;
            let deathsBronze = dataYears[2].deaths;
    
            let typeGold = dataYears[0].typeEvent;
            let typeSilver = dataYears[1].typeEvent;
            let typeBronze = dataYears[2].typeEvent;
    
            let yearGold = dataYears[0].year;
            let yearSilver = dataYears[1].year;
            let yearBronze = dataYears[2].year;

            let iconTypeGold = icon[typeGold];
            let iconTypeSilver =icon[typeSilver];
            let iconTypeBronze = icon[typeBronze];
    
            document.getElementById("dateGold").innerHTML = yearGold;
            document.getElementById("locationGold").innerHTML = locationGold;
            document.getElementById("deathsGold").innerHTML = deathsGold + " deaths";

            document.getElementById("dateSilver").innerHTML = yearSilver;
            document.getElementById("locationSilver").innerHTML = locationSilver;
            document.getElementById("deathsSilver").innerHTML = deathsSilver + " deaths";

            document.getElementById("dateBronze").innerHTML = yearBronze;
            document.getElementById("locationBronze").innerHTML = locationBronze;
            document.getElementById("deathsBronze").innerHTML = deathsBronze + " deaths";

            document.getElementById("iconTypeGold").className = iconTypeGold ; 
            document.getElementById("iconTypeSilver").className = iconTypeSilver ; 
            document.getElementById("iconTypeBronze").className = iconTypeBronze ; 

            document.getElementById("typeGold").innerHTML = typeGold;
            document.getElementById("typeSilver").innerHTML = typeSilver;
            document.getElementById("typeBronze").innerHTML = typeBronze;



        }
        else if (dataYears.length === 2 ){
            let locationGold = dataYears[0].locationName;
            let locationSilver = dataYears[1].locationName;
            
            let deathsGold = dataYears[0].deaths;
            let deathsSilver = dataYears[1].deaths;
    
            let typeGold = dataYears[0].typeEvent;
            let typeSilver = dataYears[1].typeEvent;
    
            let yearGold = dataYears[0].year;
            let yearSilver = dataYears[1].year;

            let iconTypeGold = icon[typeGold];
            let iconTypeSilver =icon[typeSilver];
    
            document.getElementById("dateGold").innerHTML = yearGold;
            document.getElementById("locationGold").innerHTML = locationGold;
            document.getElementById("deathsGold").innerHTML = deathsGold + " deaths";

            document.getElementById("dateSilver").innerHTML = yearSilver;
            document.getElementById("locationSilver").innerHTML = locationSilver;
            document.getElementById("deathsSilver").innerHTML = deathsSilver + " deaths";

            document.getElementById("dateBronze").innerHTML = "No other event";
            document.getElementById("locationBronze").innerHTML = "No other event";
            document.getElementById("deathsBronze").innerHTML = "No other event";

            document.getElementById("iconTypeGold").className = iconTypeGold ; 
            document.getElementById("iconTypeSilver").className = iconTypeSilver ; 
            document.getElementById("iconTypeBronze").className = "fas fa-exclamation-triangle" ; 

            document.getElementById("typeGold").innerHTML = typeGold;
            document.getElementById("typeSilver").innerHTML = typeSilver;
            document.getElementById("typeBronze").innerHTML = "No other event";
        }
        else if (dataYears.length === 1){
            let locationGold = dataYears[0].locationName;
            let deathsGold = dataYears[0].deaths;
            let typeGold = dataYears[0].typeEvent;
            let yearGold = dataYears[0].year;
            let iconTypeGold = icon[typeGold];
    
            document.getElementById("dateGold").innerHTML = yearGold;
            document.getElementById("locationGold").innerHTML = locationGold;
            document.getElementById("deathsGold").innerHTML = deathsGold + " deaths";

            document.getElementById("dateSilver").innerHTML = "No other event";
            document.getElementById("locationSilver").innerHTML = "No other event";
            document.getElementById("deathsSilver").innerHTML = "No other event";

            document.getElementById("dateBronze").innerHTML = "No other event";
            document.getElementById("locationBronze").innerHTML = "No other event";
            document.getElementById("deathsBronze").innerHTML = "No other event";

            document.getElementById("iconTypeGold").className = iconTypeGold ; 
            document.getElementById("iconTypeSilver").className = "fas fa-exclamation-triangle" ; 
            document.getElementById("iconTypeBronze").className = "fas fa-exclamation-triangle" ; 

            document.getElementById("typeGold").innerHTML = typeGold;
            document.getElementById("typeSilver").innerHTML = "No other event";
            document.getElementById("typeBronze").innerHTML = "No other event";

        }
        else {
            document.getElementById("dateGold").innerHTML = "No event";
            document.getElementById("locationGold").innerHTML = "No event";
            document.getElementById("deathsGold").innerHTML = "No event";

            document.getElementById("dateSilver").innerHTML = "No event";
            document.getElementById("locationSilver").innerHTML = "No event";
            document.getElementById("deathsSilver").innerHTML = "No event";

            document.getElementById("dateBronze").innerHTML = "No event";
            document.getElementById("locationBronze").innerHTML = "No event";
            document.getElementById("deathsBronze").innerHTML = "No event";

            document.getElementById("iconTypeGold").className = "fas fa-exclamation-triangle" ; 
            document.getElementById("iconTypeSilver").className = "fas fa-exclamation-triangle" ; 
            document.getElementById("iconTypeBronze").className = "fas fa-exclamation-triangle" ; 

            document.getElementById("typeGold").innerHTML = "No event";
            document.getElementById("typeSilver").innerHTML = "No event";
            document.getElementById("typeBronze").innerHTML = "No event";
        }
   });
}