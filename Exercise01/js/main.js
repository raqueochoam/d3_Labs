var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var circle = svg.append("circle")
    .attr("cx", 100)
	.attr("cy", 250)
	.attr("r", 70)
	.attr("fill", "blue");

var rect = svg.append("rect")
	.attr("x", 20)
	.attr("y", 20)
	.attr("width", 20)
	.attr("height", 20)
	.attr("fill","red");

var petal = svg.append("ellipse")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("rx", 40)
    .attr("ry", 120)
    .attr("fill", "yellow")

var petal2 = svg.append("ellipse")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("rx", 40)
    .attr("ry", 120)
    .attr("fill", "yellow")

var petal3 = svg.append("ellipse")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("rx", 40)
    .attr("ry", 120)
    .attr("fill", "yellow")

var petal4 = svg.append("ellipse")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("rx", 40)
    .attr("ry", 120)
    .attr("fill", "yellow")

// Apply rotation to the ellipse
petal2.attr("transform", "rotate(" + 45 + " 200 200)");
petal3.attr("transform", "rotate(" + 90 + " 200 200)");
petal4.attr("transform", "rotate(" + 135 + " 200 200)");

var circle = svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 50)
    .attr("fill", "brown");
