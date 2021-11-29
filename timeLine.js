function filterBy(year1, year2) {
	const filterYears1 = ['>=', ['number', ['get', 'year']], year1];
	const filterYears2 = ['<=', ['number', ['get', 'year']], year2];
	for(const eventType of ["tsunamis", "earthquakes", "eruptions"]){
		map.setFilter(eventType, filterYears1)
		map.setFilter(eventType, filterYears2)
	}}
  

$(document).ready(function(){
    $( "#slider-range" ).slider({
        range: true,
        min: -2000,
        max: 2021,
        values: [ 75, 300 ],
        slide: function( event, ui ) {
          $( "#amount" ).text( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		  filterBy(ui.values[ 0 ],ui.values[ 1 ]  );
        }
      });
      $( "#amount" ).text( "" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );
});



