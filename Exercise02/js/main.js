var data = [25, 20, 15, 10, 5];

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var rectangles = svg.selectAll("rect")
    .data(data);

rectangles.enter()
    .append("rect")
        .attr("x", (d, i)=>{
            console.log("Item: " + d + " Index: " + i);
            return (i * 50) + 25;
        })
        .attr("y", (d, i)=>{
            console.log("Item: " + d + " Index: " + i);
            return (i * 3) + 100;})
        .attr("width", (d)=>{ return d; })
        .attr("height", (d2)=>{ return d2; })
        .attr("fill", "pink" );


