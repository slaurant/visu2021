
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
								name : points[i]["name"]
								   // In this case, I have specified the name but you can add any property you wish
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

	d3.json("../Datasets-20211101/earthquakes_events.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here

		console.log(data);   // Always check if the data was correctly loaded!

		// Wait before map is loaded before adding the layer to it

		map.on("load", function(){

			// The points in data are transformed in features using the function defined earlier
			// The features are wrapped inside a feature collection

			let featurecollection = {type : "FeatureCollection", features : getGeoJSON(data)};
			console.log(featurecollection)
			// A layer holding the visual elements is added to the map
			
			map.addSource('volcanos', {   // Data
					type: "geojson",   // Type of data
					data: featurecollection   // letiable holding the feature collection
				})

			map.addLayer({
				id: "volcanos",   // Layer id
				type: "circle",   // Type of the visual elements representing the museums
				source: 'volcanos',
				paint: {   // Style of the visual elements (circles)
					"circle-radius": 5,   // Radius
					"circle-color": "#0082a3",   // Fill color
					"circle-opacity": 0.6,   // Opacity (0 is transparent, 1 is opaque)
					"circle-stroke-width": 1,   // Width of the circles border
					"circle-stroke-color": "#004d60"   // Color of the circles border
				}
			});
		
			map.on('click', 'volcanos', (e)=>{
				console.log("you clicked on " + e.features[0].properties.name)
			})

			map.on('mouseenter', 'volcanos', () => {
				map.getCanvas().style.cursor = 'pointer';
		});

		});
	});