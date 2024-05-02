d3.json("data/buildings.json").then((data)=> {
    // Data processing
    data.forEach((d)=>{
        d.height = +d.height;
        console.log(d);
    });
    console.log(data);

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 600)
        .attr("height", 500);

    var rectangles = svg.selectAll("rect")
        .data(data);

    rectangles.enter()
        .append("rect")
            .attr("x", (d, i)=>{
                console.log("Item: " + d + " Index: " + i);
                return (i * 60) + 60;
            })
            .attr("y", (d)=>{ 
                return   (500 - d.height*0.5);
            })
            .attr("width", 50)
            .attr("height", (d)=>{ return d.height; })
            .attr("fill", "grey" );

}).catch((error)=> {
    console.log(error);
});