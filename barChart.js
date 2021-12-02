// The call to drawBarChart displays the bar chart representing the dataset sales on the page
// By default, the data for the eruptions is displayed
function change(btn , col) {
    document.getElementById(btn).style.backgroundColor=col;
}

function changeBars(col) {
    var x = document.getElementsByClassName("bar");
    for (var i = 0; i < x.length; i++) {
        x.transition()
            x[i].style("fill", col);
    }
  }

drawBarChart("volcano", "firebrick");

d3.select("#volcanos_chart")   // Selection of the button that has the id volcano_chart
    .on("click", function(){   // Behavior when the button is clicked
        drawBarChart("volcano", "firebrick");   // When the button is clicked, draw bar chart for eruptions
        change("volcanos_chart" , "firebrick");
        change("tsunamis_chart" , "rgb(50, 63, 73)");
        change("earthquakes_chart" , "rgb(50, 63, 73)");
    });

d3.select("#tsunamis_chart")   // Selection of the button that has the id tsunamis_chart
    .on("click", function(){   // Behavior when the button is clicked
        drawBarChart("tsunamis", "royalblue");   // When the button is clicked, draw bar chart for tsunamies
        change("tsunamis_chart" , "royalblue");
        change("volcanos_chart" , "rgb(50, 63, 73)");
        change("earthquakes_chart" , "rgb(50, 63, 73)");
        changeBars("dodgerblue")
    });

d3.select("#earthquakes_chart")   // Selection of the button that has the id earthquakes_chart
    .on("click", function(){   // Behavior when the button is clicked
        drawBarChart("earthquakes", "seagreen");   // When the button is clicked, draw bar chart for earthquakes
        change("earthquakes_chart" , "seagreen");
        change("tsunamis_chart" , "rgb(50, 63, 73)");
        change("volcanos_chart" , "rgb(50, 63, 73)")
        changeBars("seagreen")
    });

function drawBarChart(typeEvent, col){

    d3.json("Datasets_formatted/"+typeEvent+"_events_formatted.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here
        
        let deathCat1 = 0; // Initialize the counter for the events which made [1,50] deaths
        let deathCat2 = 0; // Initialize the counter for the events which made [51,100] deaths
        let deathCat3 = 0; // Initialize the counter for the events which made [51,100] deaths
        let deathCat4 = 0; // Initialize the counter for the events which made [51,100] deaths

        for (var i=0; i < data.length; i++){
            if (data[i].deathsAmountOrder == 1){
                deathCat1 += 1;
            } else if (data[i].deathsAmountOrder == 2){
                deathCat2 += 1
            } else if (data[i].deathsAmountOrder == 3){
                deathCat3 += 1
            } else if (data[i].deathsAmountOrder == 4){
                deathCat4 += 1 
            }
        }

        let deathRepartition = [
            {category : "[1,50] deaths", evenementCount : deathCat1}, 
            {category : "[51,100] deaths", evenementCount : deathCat2}, 
            {category : "[101,1000] deaths", evenementCount : deathCat3}, 
            {category : "> 1000 deaths", evenementCount : deathCat4} 
        ];

        // The inside of the element that has the id barchart is removed. Basically, if their was any element inside the barchart svg, they are scrapped off
        // This allows to remove the previous bar chart if the function is called with a different dataset

        document.getElementById("barchart").innerHTML = "";

        // ---------------------------------------------
        // ------------- DIMENSIONS --------------------
        // ---------------------------------------------

        // The margins are defined. A bigger margin is defined for the bottom and the left because space needs to be saved for the axis labels

        let margin = {top: 20, right: 20, bottom: 70, left: 60};

        // The width and height letiables are declared using the dimensions of the barchart svg, but margins are substracted
        // document.getElementById("barchart").getBoundingClientRect() returns the bounding box of the barchart element

        let width = document.getElementById("barchart").getBoundingClientRect().width - margin.left - margin.right;
        let height = document.getElementById("barchart").getBoundingClientRect().height - margin.top - margin.bottom;

        // ---------------------------------------------
        // --------------- SCALES ----------------------
        // ---------------------------------------------

        // x is the scale on which the data will be represented on the horizontal axis. The scale is ordinal, as the data for the x axis is a list of names

        let x = d3.scale.ordinal()
            .rangeBands([0, width], .1);   // The allocated space for the bars goes from the start to the end of the x axis. The .1 argument defines a padding (e.g. a blank space) between the bars

        // The domain of the x axis is defined. It consists of an array containing the names of the six agents

        x.domain(deathRepartition.map(function(d){   // data.map(function) returns an array with the same number of entries that the dataset has. For each entry (the parameter d refers to one entry) of the dataset, the transformation defined inside function is applied. The result is the corresponding entry in the array resulting from data.map
            return d.category;   // The transformation consists of returning d.agent, that is, the agent in the entry d. Thus, it consists of scrapping off the sales amount to keep only the agent's name
        }));


        // y is the scale on which the data will be represented on the vertical axis. The scale is linear, as the data for the y axis is numbers

        let y = d3.scale.linear()
            .range([height, 0]);   // The allocated space for the bars goes from the start to the end of the y axis

        // The domain of the y axis is defined. The difference between the domain of y and the domain of x is that y represents numbers and x represents nominal data. Thus, the domain of x is an array containing the data entries, whereas the domain of y is an interval, going from 0 to the highest sales amount that can be found in the dataset

        y.domain([0, d3.max(deathRepartition, function(d){   // This returns the maximum (d3.max) number encountered after keeping only the sales from the dataset
            return d.evenementCount;
        })]);

        // ---------------------------------------------
        // ---------------- AXES -----------------------
        // ---------------------------------------------

        // xAxis is the horizontal axis

        let xAxis = d3.svg.axis()
            .scale(x)   // The scale x defined earlier is assigned to the axis
            .orient("bottom");   // the labels of the axis ticks are shown at the bottom of the axis 

        // yAxis is the vertical axis

        let yAxis = d3.svg.axis()
            .scale(y)   // The scale y defined earlier is assigned to the axis
            .orient("left");   // the labels of the axis ticks are shown at the left of the axis

        // ---------------------------------------------
        // ------------ VISUAL ELEMENTS ----------------
        // ---------------------------------------------

        // chart is a <g> element that is appended to the barchart svg declared in the HTML code
        // A <g> element is a group of elements such as circles, rectangles, lines, etc. If an operation needs to be executed on all the elements of a group, it can simply be executed on the g element instead. This is the advantage of g elements

        let chart = d3.select("#barchart")
        .append("g")   // A g element is appended to the barchart svg. It will contain all the graphical elements of the visualization
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");   // The g element is moved right by margin.left pixels and down by margin.top pixels

        // A g element is appended to the chart. It contains all the graphical elements of the x axis.

        chart.append("g")
            .attr("class", "x axis")   // The classes x and axis are assigned to the g element. Thus, the g element has the styles defined for x and axis classes in the CSS code
            .attr("transform", "translate(0," + height + ")")   // The origin of the bar chart is at the bottom left, but the origin of a SVG element is its top left corner. Thus, the x axis needs to be moved down by height pixels in order to appear at the bottom of the chart
            .call(xAxis)   // Define that it is the x axis in the g element
            .selectAll("text")   // A selection is made to gather all the text elements in the x axis (that is, the ticks labels)
                .style("text-anchor", "middle")   // The text elements are attached at the middle of their tick
                .attr("dy", "0.5em");   // dy is a downwards translation of text elements. 0.5em is half the font-size of text

        // A g element is appended to the chart. It contains all the graphical elements of the y axis.

        chart.append("g")
            .attr("class", "y axis")   // The classes y and axis are assigned to the g element. Thus, the g element has the styles defined for y and axis classes in the CSS code
            .call(yAxis);   // Define that it is the y axis in the g element

        // A selection is made to gather all the elements that have the bar class. The selection is empty right now, but one bar will be assigned to each entry in the dataset upon the call to .data(data)

        chart.selectAll(".bar")
            .data(deathRepartition)   // The dataset data is assigned. Elements with the class bar will be created accordingly
            .enter().append("rect")   // .enter() defines new data elements for which a visual element counterpart (in the present case, a rectangle) needs to be created. The code after .enter() will be executed on each of these visual elements (hence, once per entry in the dataset)
                .attr("class", "bar")   // The rectangles have the class bar
                .attr("fill", col)
                .attr("x", function(d){   // The x position of the rectangle is determined by the agent to which the rectangle corresponds
                    return x(d.category);
                })
                .attr("y", function(d){
                    return y(d.evenementCount);   // By default, the bars are aligned to the top of the chart (remember, the origin of a SVG element is at its top left corner). y(d.sales) is the size of the gap between the bar aligned to the top and the x axis
                })
                .attr("height", function(d){   // The height of each rectangle is computed accordingly to the sales
                    return height - y(d.evenementCount);
                })
                .attr("width", x.rangeBand());   // The width of a bar depends on the space allocated to the bars on the x axis
        

        // A text element is appended to the chart. It contains the label of the x axis

        chart.append("text")						 
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 30) + ")")   // The label is translated rightwards by half the width of the chart (thus, it will appear at the middle)
            .style("text-anchor", "middle")   // The label is at the middle (without this line, it would be the origin of the text element that would be at the middle of the chart. The label would not be exactly centered)
            .text("Death Count");   // Label

        // A text element is appended to the chart. It contains the label of the y axis

        chart.append("text")
            .attr("transform", "rotate(-90)")   // The label is rotated by -90 degrees in order to be written along the y axis
            .attr("y", 0 - margin.left)   // The element was rotated by -90 degrees -> attention to the coordinates to translate
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")   
            .style("text-anchor", "middle")   // The label is at the middle (without this line, it would be the origin of the text element that would be at the middle of the chart. The label would not be exactly centered)
            .text("Occurences");   // Label


    })
}