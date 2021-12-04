
selectTop3();
    


function selectTop3(){ 
    
    d3.json("Datasets_formatted/all_data.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
        data.sort(function (a, b) {
            return b.deaths - a.deaths;
            });    

        let locationGold = data[1].locationName;
        let locationSilver = data[2].locationName;
        let locationBronze = data[3].locationName;

        document.getElementById("firstDeadly").innerHTML = locationGold;
        document.getElementById("secondDeadly").innerHTML = locationSilver;
        document.getElementById("thirdDeadly").innerHTML = locationBronze;
    
    });


}




//let locationGold = deadliestNine[1].locationName;

