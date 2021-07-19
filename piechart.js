var data = [2, 4, 8, 10];

var svg = d3.select("svg"),
  width = svg.attr("width"),
  height = svg.attr("height"),
  radius = (Math.min(width, height) / 2) -20,
  g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#ffcfad','#9b8742','#b8aa95','#5e5a54','#e6d1b1','ce8303']);

var pie = d3.pie().value(function(d) { return d; });

var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

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

arcs.append("text")
    .attr("transform", function(d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .text(function(d) { return d.value });

svg.append("g")
    .attr("transform", "translate(" + (width / 2 - 100) + "," + 20 + ")")
    .append("text")
    .text("Stay in different locations")
    .attr("class", "title")
