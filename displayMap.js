var filters = document.getElementById("filters")
var tsunamisCheck = document.getElementById("tsunamisCheck")
var earthquakesCheck = document.getElementById("earthquakesCheck")
var eruptionsCheck = document.getElementById("eruptionsCheck")

var minDeathsFilter = document.getElementById("minDeathsFilter")
var tsunamisSourceFilter = document.getElementById("tsunamisSourceFilter")
var tsunamisValidityFilter = document.getElementById("tsunamisValidityFilter")


// An API access token is required to use the API. Replace with your own. You can request your own on the Mapbox website
mapboxgl.accessToken = "pk.eyJ1Ijoic2xhdXJhbnQiLCJhIjoiY2t2cGJhdzQ2YThmNTJuczd5aGppOTc0bCJ9.zPG8kLaqhJ9aowyyspdsBg";

// A new map is created

const map = new mapboxgl.Map({
	container: "map",   // ID of the element that contains the map
	style: "mapbox://styles/mapbox/light-v9",   // Type of map (other styles include basic-v9, streets-v9, dark-v9, satellite-v9 and bright-v9)
	center: [4.35, 50.85],   // Coordinates of the center of the map [longitude, latitude]
	zoom: 1   // Initial zoom level (1 is the furthest zoom)
});
	
// Add zoom and rotation controls to the map

map.addControl(new mapboxgl.NavigationControl({
	position: "top-left"}   // The controls appear at the top left
));

// container is the overlay of the map. The overlay will contain everything we add to the map

const container = map.getCanvasContainer();

// An svg is appended to the container. It will contain the visual elements

const svg = d3.select(container)
	.append("svg")
	.attr("id", "points_container");   // The id of the svg is points_container

map.on("load", function(){
	d3.json("Datasets_formatted/tsunamis_events_formatted.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
		addLayers(data, "tsunamis", dotColor = "royalblue", "tsunamisCheck")
	});
	
	d3.json("Datasets_formatted/earthquakes_events_formatted.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
		addLayers(data, "earthquakes", dotColor = "seagreen", "earthquakesCheck")
	});
	
	d3.json("Datasets_formatted/volcano_events_formatted.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
		addLayers(data, "eruptions", dotColor = "firebrick", "eruptionsCheck")
	});
});
/// LOAD DATA AND ADD LAYERS TO THE MAP

/// Add event listeners for each filter
document.getElementById('tsunamisSourceFilter').addEventListener('change', (e) => {
	filterMap();
});

document.getElementById("deathFilter").addEventListener('change', (e) => {
	filterMap();
});



document.getElementById('damageFilter').addEventListener('change', (e) =>{
	filterMap();
});

document.getElementById('tsunamisValidityFilter').addEventListener('change', (e) =>{
	filterMap();
});

// This function converts points as found in the dataset into features following the GeoJSON standard
function getGeoJSON(points){

	let features = Array();

	for(let i = 0; i < points.length; i++){

		// For every point, a feature is created and added to the array features
		let point = {
						type : "Feature", 
						geometry : {   // The geometry for a point contains the type (which is Point) and the coordinates
							type : "Point",
							coordinates : [points[i].longitude, points[i].latitude]   // The longitude and latitude must be specified longitude first, which is a little confusing as latitude usually comes first
						},
						properties : { // The properties contain any other information on the point
							country : points[i]["country"],
								// In this case, I have specified the name but you can add any property you wish
							deathOrder : points[i]["deathsAmountOrder"],
							cause: points[i]["causeCode"] || 0,
							damageAmount: points[i]["damageAmountOrder"] || 0, 
							validity: points[i]["eventValidity"] || 0, 
							year: points[i]["year"],
							id: points[i]["id"]
						}
					}

		features.push(point);
	}

	return features;
};




/// FUNCTION:  add layer to the map
function addLayers(data, eventType, dotColor, checkBoxId){
	
		// The points in data are transformed in features using the function defined earlier
		// The features are wrapped inside a feature collection

		let events = {type : "FeatureCollection", features : getGeoJSON(data)};
		// A layer holding the visual elements is added to the map
	
		map.addSource(eventType, {   // Data
			type: "geojson",   // Type of data
			data: events   // letiable holding the feature collection
		})


		
			
		map.addLayer({  
			id: eventType,   // Layer id
			type: "circle",   // Type of the visual elements representing the museums
			source: eventType,
			paint: {   // Style of the visual elements (circles)
				"circle-radius": {
					property: "deathOrder",
					stops: [[1,2],[2,4],[3,6],[4,10]]
				},   // Radius
				"circle-color": dotColor,   // Fill color
				"circle-opacity": 0.6,   // Opacity (0 is transparent, 1 is opaque)
				"circle-stroke-width": 1,   // Width of the circles border
				"circle-stroke-color": "#004d60"   // Color of the circles border
			}, 

			

		});
		
		/// checkboxes by event Type: change the visibility of the layer
		var input = document.getElementById(checkBoxId)

		input.addEventListener('change', (e) => {
			map.setLayoutProperty(
			eventType,
			'visibility',
			e.target.checked ? 'visible' : 'none'
			);
			});
		
		map.on('mouseenter', eventType, (z) => {
			map.getCanvas().style.cursor = 'pointer';
			});	
		
		// Change it back to a pointer when it leaves.
		map.on('mouseleave', eventType, () => {
		map.getCanvas().style.cursor = '';
		});
		
		// Click on event: print id
		map.on("click", eventType, (e) => {
			eventModal(e.features[0].properties['id'], eventType)
		});
};



/// FUNCTION: fetch all filter values and filter the map by all those filters
function filterMap(min, max) {

	///Fetch filter values
	if (min === undefined || max === undefined) {
		const sliderElement = $( "#slider-range" )
		const datesSelected = sliderElement.slider( "option", "values")
		min = datesSelected[0]
		max = datesSelected[1]
	}
	const filterDateMin = ['>=', ['number', ['get', 'year']], min];
	const filterDateMax = ['<=', ['number', ['get', 'year']], max];


	/// minimum deaths
	var deathChecked
	var deathCheckBox1 =document.getElementById("deathAmountOrder1")
	var deathCheckBox2 =document.getElementById("deathAmountOrder2")
	var deathCheckBox3 =document.getElementById("deathAmountOrder3")
	var deathCheckBox4 =document.getElementById("deathAmountOrder4")
	var deathCheckBoxes = [deathCheckBox1.checked,deathCheckBox2.checked,deathCheckBox3.checked,deathCheckBox4.checked]
	var whichChecked = []
	for(let i = 0;i<4;i++){
		if(deathCheckBoxes[i]){whichChecked.push(i+1)}
	}
	const minDeathsFilter = ["match", ["get", "deathOrder"], whichChecked, true, false];

	/// minimum damage
	const damageValue = parseInt(document.getElementById("damageFilter").value, 10)
	const damageFilter = ['>=', ['number', ['get', 'damageAmount']], damageValue]
	
	///TSUNAMI SPECIFIC

	/// Tsunami cause
	const causeValue = parseInt(document.getElementById('tsunamisSourceFilter').value, 10)
	if(causeValue === -1){
		var causeMapFilter = ['>=', ['number', ['get', 'cause']], 0];
	} else {
		var causeMapFilter = ['==', ['number', ['get', 'cause']], causeValue];
	}

	/// Tsunami validity
	const validityValue = parseInt(document.getElementById('tsunamisValidityFilter').value, 10)
	var validityMapFilter = ['>=', ['number', ['get', 'validity']], validityValue];


	//filter the map by those values	
	map.setFilter("tsunamis", ["all", minDeathsFilter,damageFilter,filterDateMin, filterDateMax, validityMapFilter ,causeMapFilter])
	map.setFilter("earthquakes", ["all", minDeathsFilter,damageFilter, filterDateMin, filterDateMax])
	map.setFilter("eruptions", ["all", minDeathsFilter,damageFilter, filterDateMin, filterDateMax])	
	}
