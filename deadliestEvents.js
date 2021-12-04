
selectTop3(-2000, 2021);
    


function selectTop3(min, max){
    
    d3.json("Datasets_formatted/all_data.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
        
        let dataYears = [];
        
        for (var i=0; i < data.length; i++){
            if (data[i].year>=min && data[i].year<=max){
                dataYears.push(data[i])
            }
        }
        
        dataYears.sort(function (a, b) {
            return b.deaths - a.deaths;
            });

        let locationGold = dataYears[1].locationName;
        let locationSilver = dataYears[2].locationName;
        let locationBronze = dataYears[3].locationName;
        
        let deathsGold = dataYears[1].deaths;
        let deathsSilver = dataYears[2].deaths;
        let deathsBronze = dataYears[3].deaths;

        let typeGold = dataYears[1].typeEvent;
        let typeSilver = dataYears[2].typeEvent;
        let typeBronze = dataYears[3].typeEvent;

        let yearGold = dataYears[1].year;
        let yearSilver = dataYears[2].year;
        let yearBronze = dataYears[3].year;

        document.getElementById("firstDeadly").innerHTML ="[" + yearGold + "] " + locationGold + " : " + deathsGold + " deaths (" + typeGold + ")";
        document.getElementById("secondDeadly").innerHTML ="[" + yearSilver + "] " +  locationSilver + " : " + deathsSilver + " deaths (" + typeSilver + ")";
        document.getElementById("thirdDeadly").innerHTML ="[" + yearBronze + "] " +  locationBronze + " : " + deathsBronze + " deaths (" + typeBronze + ")";
    
    });
}

