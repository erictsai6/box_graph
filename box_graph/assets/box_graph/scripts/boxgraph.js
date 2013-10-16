(function() {

d3.boxgraph = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      x = undefined,
      y = undefined,
      xaxis = undefined,
      yaxis = undefined,
      margin = {'top': 15, 'bottom': 15, 'left': 40, 'right': 50},
      box_width = 1,
      box_padding = 15,
      tickFormat = null,
      data = undefined;

  // For each small multiple…
  function boxgraph(el) {
    // Retrieve the number of elements to determine the width of each box graph 
    if (el.length <= 0) {
      // Raise an error
      throw Exception("No element found");
    }
    if (height == undefined || width == undefined ||
          data == undefined) {
      throw Exception("Uninitialized height, width or data");
    }
    var adjusted_height = height - margin.top - margin.bottom,
        adjusted_width = width - margin.left - margin.right,
        x_ticks = [new Date(2000, 0), new Date(2000, 1),
                   new Date(2000, 2), new Date(2000, 3),
                   new Date(2000, 4), new Date(2000, 5),
                   new Date(2000, 6), new Date(2000, 7),
                   new Date(2000, 8), new Date(2000, 9),
                   new Date(2000, 10), new Date(2000, 11)],
        x_scale = [new Date(2000,0,1), new Date(2000,11,31)];

    x = d3.time.scale()
          .domain(x_scale)
          .range([0, adjusted_width]);
    y = d3.scale.linear()
          .domain(domain)
          .range([adjusted_height, 0]);
    xaxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')
          .ticks(d3.time.months, 1)
          .tickFormat(d3.time.format('%B'))
          .tickSize(5,10)
          .tickPadding(0,15);
    yaxis = d3.svg.axis().scale(y).orient("left").tickFormat(formatDegrees);
    box_width = adjusted_width / data.length - box_padding * 2;

    el.each(function() {
      var div = d3.select(this),
          g = div.select("g");

      // If g element is not found then create the skeletal graph with axis
      if (g.empty()) {
        g = div
          .append("svg")
            .attr("viewBox", "0 0 "+width+" "+height)
            .attr("preserveAspectRatio", "none");
        g.append("g")
          .attr("class", "bg-xaxis bg-axis")
          .attr("transform", "translate(" + margin.left + "," + (adjusted_height + margin.top) + ")")
          .call(xaxis)
        .selectAll(".tick text")
          .style("text-anchor", "start")
          .attr("x", 10);
        g.append("g")
          .attr("class", "bg-yaxis bg-axis")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .call(yaxis);
        g.append("g")
          .attr("class", "bg-chart")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      }
      // Only draw is data is empty! Force the user to rerender the graph via a command
      if (data != null && data.length > 0) {
        var bgChart = g.select(".bg-chart");
        for (var i in data) {
          datum = data[i]
          bgChart.append("rect")
            .attr("class", "bg-box")
            .attr("x", x(x_ticks[i]) + box_padding)
            .attr("y", y(datum[2]))
            .attr("width", box_width)
            .attr("height", y(datum[0]) - y(datum[2]));
          bgChart.append("line")
            .attr("class", "bg-median")
            .attr("x1", x(x_ticks[i]) + box_padding)
            .attr("y1", y(datum[1]))
            .attr("x2", x(x_ticks[i]) + box_padding + box_width)
            .attr("y2", y(datum[1]));
        }
      }
    });
  }

  function formatDegrees(d) {
    return d === y.domain()[1]
        ? d + "°F"
        : d;
  }

  boxgraph.import_data = function(x) {
    if (!arguments.length) return x;
    data = x;
    return boxgraph;
  }

  boxgraph.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return boxgraph;
  };

  boxgraph.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return boxgraph;
  };

  boxgraph.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return boxgraph;
  };

  boxgraph.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return boxgraph;
  };

  boxgraph.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x;
    return boxgraph;
  };

  boxgraph.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return boxgraph;
  };

  boxgraph.margin = function(x) {
    if (!arguments.length) return margin;
    margin = x;
    return boxgraph;
  }

  return boxgraph;
};

})();
