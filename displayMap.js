
// This function converts points as found in the dataset into features following the GeoJSON standard

function getGeoJSON(points){

	let features = Array();

	for(let i = 0; i < points.length; i++){

		// For every point, a feature is created and added to the array features

		let point = {type : "Feature", 
						geometry : {   // The geometry for a point contains the type (which is Point) and the coordinates
							type : "Point",
							coordinates : [points[i].longitude, points[i].latitude]   // The longitude and latitude must be specified longitude first, which is a little confusing as latitude usually comes first
						},
						properties : { // The properties contain any other information on the point
							country : points[i]["country"],
								// In this case, I have specified the name but you can add any property you wish
							deaths : points[i]["deaths"]
						}
					}

		features.push(point);
	}

	return features;
}

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


// 1. EARTHQUAKES

d3.json("Datasets/earthquakes_events.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
	
	var dataFiltered = data.filter(x => x.deaths > 0)

	data
	console.log(dataFiltered);   // Always check if the data was correctly loaded!

	// Wait before map is loaded before adding the layer to it

	map.on("load", function(){

		// The points in data are transformed in features using the function defined earlier
		// The features are wrapped inside a feature collection

		let earthquakes_events = {type : "FeatureCollection", features : getGeoJSON(dataFiltered)};
		console.log(earthquakes_events)
		// A layer holding the visual elements is added to the map
		
		map.addSource('earthquakes', {   // Data
				type: "geojson",   // Type of data
				data: earthquakes_events   // letiable holding the feature collection
			})

		map.addLayer({
			id: "earthquakes",   // Layer id
			type: "circle",   // Type of the visual elements representing the museums
			source: 'earthquakes',
			paint: {   // Style of the visual elements (circles)
				"circle-radius": {
					property : 'deaths', 
					stops: [
						[900,1], 
						[1000,3],
						[4000,6], 
						[10000,10]
					]
				},   // Radius
				"circle-color": "#52BE80",   // Fill color
				"circle-opacity": 0.6,   // Opacity (0 is transparent, 1 is opaque)
				"circle-stroke-width": 1,   // Width of the circles border
				"circle-stroke-color": "#004d60"   // Color of the circles border
			}
		});
	
		map.on('click', 'earthquakes', (e)=>{
			console.log("you clicked on an earthquake in " + e.features[0].properties.country)
		})

		map.on('mouseenter', 'earthquakes', () => {
			map.getCanvas().style.cursor = 'pointer';
	});

	});

});



// 2. TSUNAMIS

d3.json("Datasets/tsunamis_events.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
	
	var dataFiltered = data.filter(x => x.deaths > 0)

	
	console.log(dataFiltered);   // Always check if the data was correctly loaded!

	// Wait before map is loaded before adding the layer to it

	map.on("load", function(){

		// The points in data are transformed in features using the function defined earlier
		// The features are wrapped inside a feature collection

		let tsunamis_events = {type : "FeatureCollection", features : getGeoJSON(dataFiltered)};
		console.log(tsunamis_events)
		// A layer holding the visual elements is added to the map
		
		map.addSource('tsunamis', {   // Data
				type: "geojson",   // Type of data
				data: tsunamis_events   // letiable holding the feature collection
			})

		map.addLayer({
			id: "tsunamis",   // Layer id
			type: "circle",   // Type of the visual elements representing the museums
			source: 'tsunamis',
			paint: {   // Style of the visual elements (circles)
				"circle-radius": {
					property : 'deaths', 
					stops: [
						[900,1], 
						[1000,3],
						[4000,6], 
						[10000,10]
					]
				},   // Radius
				"circle-color": "#3498DB",   // Fill color
				"circle-opacity": 0.6,   // Opacity (0 is transparent, 1 is opaque)
				"circle-stroke-width": 1,   // Width of the circles border
				"circle-stroke-color": "#004d60"   // Color of the circles border
			}
		});
	
		map.on('click', 'tsunamis', (e)=>{
			console.log("you clicked on an tsunami in " + e.features[0].properties.country + " - # deaths = " + e.features[0].properties.deaths)
		})

		map.on('mouseenter', 'tsunamis', () => {
			map.getCanvas().style.cursor = 'pointer';
	});

	});

});
