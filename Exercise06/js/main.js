d3.json("data/revenues.json").then((data)=> {
    // Data processing
    data.forEach((d)=>{
        d.revenue = +d.revenue;
    });
    //console.log(data);

    // Map data
    var revenues = data.map((d) => {return d.month});

    var width = 600;
    var height = 400;
    var margin = {top: 10, right: 10, bottom: 100, left:100};

    // Create SVG and group
    var svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")"); // Add Margin
    
    // Create x,y and color scales
    var x = d3.scaleBand()
        .domain(revenues)
        .range([0, width])
        .paddingInner(0.3)
	    .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)])
        .range([height, 0]);

    // AXES
    var bottomAxis = d3.axisBottom(x);
    g.append("g")
        .attr("class", "bottom axis")
	    .attr("transform", "translate(0, " + height+ ")")
        .call(bottomAxis)
        .selectAll("text")
        .attr('text-anchor', 'end')
        .attr('font-size', '10px')
        .attr('transform', `rotate(-19) translate(-5, 10)`);
    // X Axis Label
    g.append("text")
        .attr("class", "x axis-label")
        .attr("x", width / 2)
        .attr("y", height + 95)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill","black")
        .text("Month");

    var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return d + "k"; });
    g.append("g")
        .attr("class", "left axis")
        .call(leftAxis);
    // Y Axis Label
    g.append("text")
        .attr("class", "y axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", - (height / 2))
        .attr("y", -60) 
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill","black")
        .text("Revenue (dlls.)");
    
    // Rectangles
    var rectangles = g.selectAll("rect")
        .data(data);

    rectangles.enter()
        .append("rect")
        .attr("x", (d) => { return x(d.month); })
        .attr("y", (d) => { return y(d.revenue); })
        .attr("width",  x.bandwidth)
        .attr("height", (d) => { return height - y(d.revenue); })
        .attr("fill", "yellow");

}).catch((error) => {
    console.log(error);
});
