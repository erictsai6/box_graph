(function() {

// Inspired by http://informationandvisualization.de/blog/box-plot
d3.boxgraph = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      box_width = 1,
      x = d3.scale.linear()
        .range([0, 650]),
      y = d3.scale.linear()
        .domain([0, 100])
        .range([300, 0]),
      xaxis = d3.svg.axis().scale(x).orient("bottom"),
      yaxis = d3.svg.axis().scale(y).orient("left"),
      margin = {'top': 10, 'bottom': 10, 'left': 30, 'right': 30},
      tickFormat = null,
      data=null;

  // For each small multiple…
  function boxgraph(el) {
    // Retrieve the number of elements to determine the width of each box graph 
    if (el.length <= 0) {
      // Raise an error
      throw Exception("No element found");
    }
    var adjusted_height = height - margin.top - margin.bottom,
        adjusted_width = width - margin.left - margin.right;
    x = d3.scale.linear()
      .range([0, adjusted_width])
      .domain([0, 12]),
    y = d3.scale.linear()
      .domain([0, 100])
      .range([adjusted_height, 0]),
    xaxis = d3.svg.axis().scale(x).orient("bottom"),
    yaxis = d3.svg.axis().scale(y).orient("left"),
    box_width = width / data.length;
    el.each(function() {
      var div = d3.select(this),
          g = div.select("g");

      // If g element is not found then create the skeletal graph with axis
      if (g.empty()) {
        g = div
          .append("svg")
            .attr("width", width)
            .attr("height", height)
        g.append("g")
          .attr("class", "bg-xaxis")
          .attr("transform", "translate(" + margin.left + "," + (adjusted_height) + ")")
          .call(xaxis);
        g.append("g")
          .attr("class", "bg-yaxis")
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
            .attr("x", x(i))
            .attr("y", y(datum[0]))
            .attr("width", box_width)
            .attr("height", y(datum[0]) - y(datum[2]))
        }
      }
    });
    d3.timer.flush();
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
    domain = x == null ? x : d3.functor(x);
    return boxgraph;
  };

  boxgraph.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return boxgraph;
  };

  boxgraph.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return boxgraph;
  };
  boxgraph.margin = function(x) {
    if (!arguments.length) return margin;
    margin = x;
    return boxgraph;
  }

  boxgraph.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return boxgraph;
  };

  return boxgraph;
};

function boxWhiskers(d) {
  return [0, d.length - 1];
}

function boxQuartiles(d) {
  return [
    d3.quantile(d, .25),
    d3.quantile(d, .5),
    d3.quantile(d, .75)
  ];
}

})();
