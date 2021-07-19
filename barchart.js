var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

    //加上圖表上方標題
    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("ABC GYM branches")

var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range ([height, 0]);

var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("ABC.csv").then(function(data) {
    xScale.domain(data.map(function(d) { return d.year; }));
    yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      //X軸標示 Year
      .append("text")
      .attr("y", height - 250)
      .attr("x", width - 10)
      .attr("text-anchor", "end")
      .attr("fill", "gray")
      .attr("font-size", "18px")
      .text("Year");

    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(function(d){
          return d;
      }).ticks(8))
      //Y軸標示 Branch
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-3em")
      .attr("text-anchor", "end")
      .attr("fill", "gray")
      .attr("font-size", "18px")
      .text("Branch");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.year); })
      .attr("y", function(d) { return yScale(d.value); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return height - yScale(d.value); });
});
