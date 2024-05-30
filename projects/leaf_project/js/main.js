// Create SVG and group
var width = 600;
var height = 400;
var margin = { top: 10, right: 10, bottom: 100, left: 100 };

// Create SVG
var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// Create group within the SVG
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// SCALES
var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, 50000]); // Adjust domain as needed

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 90]);

var area = d3.scaleLinear()
    .range([25 * Math.PI, 1500 * Math.PI])
    .domain([2000, 1400000000]);

var color = d3.scaleOrdinal(d3.schemePastel1);

// AXES
var bottomAxis = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
    .tickFormat((d) => { return `$${d}`; });

var leftAxis = d3.axisLeft(y)
    .ticks(5); // Adjust ticks as needed

g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0," + height + ")")
    .call(bottomAxis);

g.append("g")
    .attr("class", "left axis")
    .call(leftAxis);

// Add x-axis label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita ($)");

// Add y-axis label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -height / 2)
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Life Expectancy (Years)");

// Add year label
var yearLabel = g.append("text")
    .attr("class", "year-label")
    .attr("x", width - 50)
    .attr("y", height - 10)
    .attr("font-size", "40px")
    .attr("opacity", "0.5")
    .attr("text-anchor", "middle")
    .text("1800");
//console.log("aqui si entro");

// DATA
d3.json("data/data.json").then(function (data) {
    console.log("data loaded");
    const formattedData = data.map((year) => {
        return year["countries"].filter((country) => {
            var dataExists = (country.income && country.life_exp);
            return dataExists;
        }).map((country) => {
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            country.population = +country.population;
            return country;
        });
    });

    // Initialize the visualization with the first year of data
    console.log("formattedData", formattedData);
    update(formattedData[0], 1000);
    //console.log("esta jalando el main");
}).catch(function (error) {
    console.error("Error loading the data", error);
});

// Update function to update the visualization
function update(data, year) {
    console.log("esta jalando el update", data, year);
    // DATA JOIN
    var circles = g.selectAll("circle")
        .data(data, (d) => d.country);
    
    // EXIT
    circles.exit().remove();

    // UPDATE CIRCLES
    circles
        .attr("cx", (d) => x(d.income))
        .attr("cy", (d) => y(d.life_exp))
        .attr("r", (d) => Math.sqrt(area(d.population) / Math.PI))
        .attr("fill", (d) => color(d.continent));

    // ENTER
    circles.enter()
        .append("circle")
        .attr("cx", (d) => x(d.income))
        .attr("cy", (d) => y(d.life_exp))
        .attr("r", (d) => Math.sqrt(area(d.population) / Math.PI)*2)
        .attr("fill", (d) => color(d.continent))
        .attr("opacity", 0.75);

    // Update the year label
    yearLabel.text(year);
}
