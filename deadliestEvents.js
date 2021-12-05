
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
    
            document.getElementById("firstDeadly").innerHTML ="[Year : " + yearGold + "] " + locationGold + " : " + deathsGold + " deaths (" + typeGold + ")";
            document.getElementById("secondDeadly").innerHTML ="[" + yearSilver + "] " +  locationSilver + " : " + deathsSilver + " deaths (" + typeSilver + ")";
            document.getElementById("thirdDeadly").innerHTML ="[" + yearBronze + "] " +  locationBronze + " : " + deathsBronze + " deaths (" + typeBronze + ")";
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
    
            document.getElementById("firstDeadly").innerHTML ="[Year : " + yearGold + "] " + locationGold + " : " + deathsGold + " deaths (" + typeGold + ")";
            document.getElementById("secondDeadly").innerHTML ="[" + yearSilver + "] " +  locationSilver + " : " + deathsSilver + " deaths (" + typeSilver + ")";
            document.getElementById("thirdDeadly").innerHTML ="Nothing else";
        }
        else if (dataYears.length === 1){
            let locationGold = dataYears[0].locationName;
            let deathsGold = dataYears[0].deaths;
            let typeGold = dataYears[0].typeEvent;
            let yearGold = dataYears[0].year;
    
            document.getElementById("firstDeadly").innerHTML ="[Year : " + yearGold + "] " + locationGold + " : " + deathsGold + " deaths (" + typeGold + ")";
            document.getElementById("secondDeadly").innerHTML ="Nothing else";
            document.getElementById("thirdDeadly").innerHTML ="Nothing else";
        }
        else {
            document.getElementById("firstDeadly").innerHTML ="Nothing";
            document.getElementById("secondDeadly").innerHTML ="Nothing";
            document.getElementById("thirdDeadly").innerHTML ="Nothing";
        }
   });
}

