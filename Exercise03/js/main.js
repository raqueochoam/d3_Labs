d3.json("data/ages.json").then((data)=> {
    // Data processing
    data.forEach((d)=>{
        d.age = +d.age;
        console.log(d);
    });
    console.log(data);

	var svg = d3.select("#chart-area").append("svg")
        .attr("width", 600)
        .attr("height", 600);

    var circles = svg.selectAll("circle")
        .data(data);

    circles.enter()
        .append("circle")
            .attr("cx", (d, i)=>{
                console.log("Item: " + d.age + " Index: " + i);
                return (i * 70) + 50;})
            .attr("cy", 100)
            .attr("r", (d)=>{ return d.age*3; })
			.attr("fill", "red");

}).catch((error)=> {
    console.log(error);
});
