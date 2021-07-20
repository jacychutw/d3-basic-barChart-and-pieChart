var data = [2, 4, 8, 10];
var margin = 100;

var svg = d3.select("svg"),
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin,
  //修改radius
  radius = (Math.min(width, height) / 2)-20,
  g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#ffcfad','#9b8742','#b8aa95','#5e5a54','#e6d1b1','ce8303']);

var pie = d3.pie().value(function(d) { return d; });

var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

//新增label
var label = d3.arc()
              .outerRadius(radius)
              .innerRadius(radius - 80);

var arcs = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc")

arcs.append("path")
  .attr("fill", function(d, i) {
    return color(i);
  })
  .attr("d", arc);

//將label加到圓餅上
arcs.append("text")
    .attr("transform", function(d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .text(function(d) { return d.value });

//加上標題
svg.append("g")
   .attr("transform", "translate(" + (width / 2 - 100) + "," + 30 + ")")
   .append("text")
   .text("Stay in different locations")
   .attr("class", "title")
