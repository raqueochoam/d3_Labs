var flag = true;
// Crear SVG y grupo
var width = 600;
var height = 400;
var margin = {top: 10, right: 10, bottom: 100, left:100};

// Crear SVG
var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// Crear grupo dentro del SVG
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Crear escalas x,y
var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .range([height, 0]);

// AXES
var bottomAxis = d3.axisBottom(x);
g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0," + height + ")")
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
var yLabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", - (height / 2))
    .attr("y", -60) 
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill","black")
    .text("Revenue (dlls.)");

//DATA
d3.json("data/revenues.json").then((data)=> {
    // Procesamiento de datos
    data.forEach((d)=>{
        d.revenue = +d.revenue;
        d.profit= +d.profit;
    });
    //console.log(data);
    d3.interval( ( ) => { 
        update(data);
        flag = !flag;
    }, 1000);
    //update(data);

}).catch((error) => {
    console.log(error);
});

function update(data) {
    var value = flag ? "revenue" : "profit";
    if(flag){
        yLabel.text("Revenue (dlls.)")
        console.log("Revenue data")
    }
    else{
        yLabel.text("Profits (dlls.)")
        console.log("Profits data")
    }
    
    console.log("updateando");
    //console.log(data);
	// ... crear la escala para el eje x
    x.domain(data.map((d) => { return d.month; }));
	// ... crear la escala para el eje y
    y.domain([0, d3.max(data, (d) => { return d[value]; })]);
	// ... actualizar el eje x
    g.select(".bottom.axis")
        .call(bottomAxis);
	// ... actualizar el eje y
    g.select(".left.axis")
        .call(leftAxis);
	// ... crear las barras
    var rectangles = g.selectAll("rect").data(data); //Join

    rectangles.enter().append("rect")//Enter
        .attr("x", (d) => { return x(d.month); })//Update
        .attr("y", (d) => { return y(d[value]); })
        .attr("width",  x.bandwidth)
        .attr("height", (d) => { return height - y(d[value]); })
        .attr("fill", "yellow");
        
        
    
    rectangles.exit().remove(); //Exit
}
