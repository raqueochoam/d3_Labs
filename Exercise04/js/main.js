d3.json("data/buildings.json").then((data)=> {
    // Data processing
    data.forEach((d)=>{
        d.height = +d.height;
    });
    console.log(data);

    var buildings = data.map((d) => {return d.name});

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    var rectangles = svg.selectAll("rect")
        .data(data);

    var x = d3.scaleBand()
        .domain(buildings)
        .range([0, 500])
        .paddingInner(0.3)
	    .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0,826])
        .range([0,500]);

    var color = d3.scaleOrdinal()
        .domain(buildings)
        .range(d3.schemeSet3);

    rectangles.enter()
        .append("rect")
            .attr("x", (d)=>{return x(d.name)})
            .attr("y", (d)=>{ return (500 - y(d.height*0.5))})
            .attr("width",  x.bandwidth())
            .attr("height", (d)=>{ {return y(d.height)} })
            .attr("fill", (d)=>{ {return color(d.height)} });

}).catch((error)=> {
    console.log(error);
});