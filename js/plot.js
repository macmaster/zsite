function plotOOOSurface(err, rows) { 
  plotSurface(err, rows, {
    name: "Coarse-grained Multithreading (OOO)",
    color: "rgb(50,100,200)",
    opacity: 0.8,
    field: "oooCycles",
    lambda: (val, i) => 2 * val,
  });
  plotSurface(err, rows, {
    name: "Zero Plane",
    color: "rgb(255,255,255)",
    opacity: 0.0,
    field: "oooCycles",
    lambda: (val, i) => 0 * val,
  });
  
}
function plotSMTSurface(err, rows) { 
  plotSurface(err, rows, {
    name: "Simultaneous Multithreading LC (SMT)",
    color: "rgb(0, 123, 0)",
    opacity: 0.8,
    field: "thread1Cycles",
    lambda: (val, i) => 1 * val,
  });   
  plotSurface(err, rows, {
    name: "Simultaneous Multithreading LNC (SMT)",
    color: "rgb(235, 123, 0)",
    opacity: 0.8,
    field: "thread2Cycles",
    lambda: (val, i) => 1 * val,
  }); 
}

function plotSurface(err, rows, kwargs) {
  function unpack(rows, key) {
      return rows.map(function(row)
        { return row[key]; });
  }

  var trace = {
      type: "mesh3d",
      name: kwargs.name,
      y: unpack(rows, "cacheSize"), 
      x: unpack(rows, "reorderBuffer"),
      z: unpack(rows, kwargs.field).map(kwargs.lambda),
	  i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, ],
	  j: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ], 
	  k: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,],
      opacity: kwargs.opacity,
      color: kwargs.color,
  };

  Plotly.addTraces("plot", trace);
  return trace;
}


function plotZeroPlane(x, y) {
  console.log(x);
  console.log(y);
  var trace = {
    type: "mesh3d",
    name: "zero",
    x: x,
    y: x,
    z: t.map((val, i) => "0"),
  }
  console.log(trace.z);
  Plotly.addTraces("plot", trace);
}

function plotPurge(title) {
  Plotly.purge("plot");
  initPlot(title);
}

function initPlot(plotTitle) {
  var layout = { 
    margin: { l: 40, r: 40, b: 50, t: 80, },
    showLegend: true,
    title: plotTitle,
    titlefont: {
      family: "Courier New, monospace",
      size: 30,
      color: "#dd0044",
    },
    // legend: {"orientation": "h"},
    scene: {
      title: "SMT Core vs OOO Core",
      xaxis: { title: "ROB [entries]" },  
      yaxis: { title: "CACHE [bytes]" }, 
      zaxis: { title: "Total Cycles" },
    }
  };
  Plotly.newPlot("plot", [], layout);
}

