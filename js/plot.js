function plotOOOScatter(err, rows) { plotScatter(err, rows, "Coarse-grained Multithreading (OOO)"); }
function plotSMTScatter(err, rows) { plotScatter(err, rows, "Simultaneous Multithreading (SMT)"); }
function plotOOOSurface(err, rows) { 
  plotSurface(err, rows, {
    name: "Coarse-grained Multithreading (OOO)",
    color: 'rgb(50,100,200)',
    smt: false,
    addZero: true,
  }); 
}
function plotSMTSurface(err, rows) { 
  plotSurface(err, rows, {
    name: "Simultaneous Multithreading (SMT)",
    color: 'rgb(235, 123, 0)',
    smt: true,
    addZero: false,
  }); 
}

function plotScatter(err, rows, traceName) {
  function unpack(rows, key) {
      return rows.map(function(row)
        { return row[key]; });
  }

  var trace = {
      type: 'scatter3d',
      name: traceName,
      x: unpack(rows, 'reorderBuffer'), 
      y: unpack(rows, 'cacheSize'), 
      mode: 'markers',
      marker: {
            // color: "rgb(50, 100, 150)",
            line: { color: 'rgba(50, 50, 50, 0.14)', width: 0.5 },
            opacity: 0.8,
            size: 6,
      },
  };

  t1 = unpack(rows, 'thread1Cycles');
  t2 = unpack(rows, 'thread2Cycles');
  trace.z = t1.map((val, i) =>  Math.max(parseInt(val), parseInt(t2[i])));
  Plotly.addTraces("plot", trace);
}

function plotSurface(err, rows, kwargs) {
  function unpack(rows, key) {
      return rows.map(function(row)
        { return row[key]; });
  }

  var trace = {
      type: 'mesh3d',
      name: kwargs.name,
      y: unpack(rows, 'cacheSize'), 
      opacity: 0.8,
      color: kwargs.color,
  };

  if (kwargs.smt) {
    // SMT trace.
    t1 = unpack(rows, 'thread1Cycles');
    t2 = unpack(rows, 'thread2Cycles');
	trace.x = unpack(rows, 'reorderBuffer');
    trace.z = t1.map((val, i) =>  Math.max(parseInt(val), parseInt(t2[i])));
  } else {
    t = unpack(rows, 'oooCycles');
	trace.x = unpack(rows, 'reorderBuffer');
    trace.z = t.map((val, i) => val * 2);
  }
  Plotly.addTraces("plot", trace);

  if (kwargs.addZero) {
    plotZeroPlane(trace.x, trace.y);
  }
}


function plotZeroPlane(x, y) {
  console.log(x);
  console.log(y);
  var trace = {
    type: 'mesh3d',
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

