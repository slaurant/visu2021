// Event Card
// function: from a data point (event), render a div containing different elements about the event
// informations: 
//-- Title -- = event type + country 
//-- Subtitle -- = date/period

//informations: 
// # deaths 
// localisation
// height
// houses destroyed
// comments
// links? 


// provisoire: définir un data point
var eventData = 
{
    "id": 12,
    "year": -330,
    "latitude": 40,
    "longitude": 25,
    "locationName": "E. SPORADES ISLANDS, AEGEAN ISLANDS",
    "country": "GREECE",
    "regionCode": 50,
    "causeCode": 1,
    "eventValidity": 1,
    "comments": "330 B.C. Aegean Sea, Sporades Islands, 40 N 25 E, earthquake intensity XI, magnitude 7.0. It is said that the Chrysi Island together with the volcano of Moschylos disappeared as a result of an underground shock near the western shore of Limnos Island. Such a shock must have generated a strong tsunami. (reference 2130).\r\n<p>About 330, B.C. Eastern Sporades (Lemnos), 40 N, 25 E.\r\nIt is rumoured, that Chryse Island and the volcano Moschylos near the island of Lemnos were sunk by a shock. If it is true, a huge tsunami should have been generated. (reference #109)\r\n</p><p>330 B.C. Eastern Sporades Islands. Island of Chryse. Sieberg (1932a) p. 221 alludes to a seismic sea-wave to have accompanied the sinking of Chryse c. 330. No such event is mentioned by chroniclers of the time. Moreover, Chryse was afloat in 72 B.C. (reference #15)\r\n</p><p>330 B.C. Eastern Sporades Islands, 40 N 25 E. Island\r\nof Chryse. Earthquake intensity XI. (reference #20)\r\n</p><p>330 B.C. North Aegean Sea, 40 deg 06 min N 25 deg 12 min E, earthquake intensity XI. Sea disturbance in Chrysi Islet. (reference #2427)\r\n</p><p>330 B.C. Eastern Sporades, 40.0 N, 25.0 E, earthquake magnitude 7.0. (reference #330)</p>",
    "earthquakeEventId": 22
}



var cardContent = document.getElementById("eventCard")

var infos = ""

// title
infos += "<h1>tsunami in " + eventData.country.toLowerCase() +"</h1>"
infos += "<h3> in "+ eventData.year + "</h3>"
infos += eventData.comments


cardContent.innerHTML = infos
cardContent.className = "Element"




