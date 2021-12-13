// This code is greatly inspired by https://jqueryui.com/slider/#range

function setTimelinePeriod(min, max) {
  // update slider
  const sliderElement = $( "#slider-range" )
  sliderElement.slider( "option", "min", min );
  sliderElement.slider( "option", "max", max );
  sliderElement.slider( "option", "values", [min, max] );
  // update text
  $( "#amount" ).text(min + " ➞ " + max );
  // update map
  filterMap(min, max);
  //update chart
  drawBarChart("volcano", "firebrick", min, max);   // When the button is clicked, draw bar chart for eruptions
  change("volcanos_chart" , "firebrick"); 
  change("tsunamis_chart" , "rgb(50, 63, 73)");
  change("earthquakes_chart" , "rgb(50, 63, 73)");
  // update top
  selectTop3(min, max);

}

$(document).ready(function(){
  sliderElement = $( "#slider-range" )
  sliderElement.slider({
      range: true,
      min: -2000,
      max: 2021,
      values: [ -2000, 2021 ],
      slide: function( event, ui ) {
        $( "#amount" ).text( "" + ui.values[ 0 ] + " ➞ " + ui.values[ 1 ] );
        filterMap(ui.values[0], ui.values[1]);
        //update chart
        drawBarChart("volcano", "firebrick", ui.values[0], ui.values[1]);  
        change("volcanos_chart" , "firebrick");
        change("tsunamis_chart" , "rgb(50, 63, 73)");
        change("earthquakes_chart" , "rgb(50, 63, 73)");
          // update top 
        selectTop3(ui.values[0], ui.values[1]);
      }
    });
    $( "#amount" ).text("-2000 ➞ 2021");


    const periods = {
      antiquity: [-2000, 496],
      middleAge: [496, 1492],
      modernTimes: [1492, 1789],
      contemporaryEra: [1789, 2021],
      all: [-2000, 2021],
    }
    
    //If a period button is clicked, set the timeline range to the the corresponding dates
    for (const period of Object.keys(periods)) {
      const periodButton = document.getElementById(period);
      periodButton.addEventListener('click', (e) => {
        const min = periods[period][0];
        const max = periods[period][1];
        setTimelinePeriod(min, max);
      });
    }
});

