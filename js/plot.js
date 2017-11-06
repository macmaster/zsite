function plotScatter(err, rows) {
  function unpack(rows, key) {
      return rows.map(function(row)
        { return row[key]; });
  }

  var trace = {
      x: unpack(rows, 'reorderBuffer'), 
      y: unpack(rows, 'l1i'), 
      mode: 'markers',
      marker: {
            size: 6,
            // color: "rgb(50, 100, 150)",
            line: { color: 'rgba(50, 50, 50, 0.14)', width: 0.5 },
            opacity: 0.8,
      },
      type: 'scatter3d'
  };

  t1 = unpack(rows, 'thread1Cycles');
  t2 = unpack(rows, 'thread2Cycles');
  trace.z = t1.map((val, i) =>  Math.max(parseInt(val), parseInt(t2[i])));
  Plotly.addTraces("plot", trace);
}

function replotScatter (err, rows) {
  Plotly.purge("plot");
  initPlot();
  plotScatter(err, rows);
}

function plotSurface(err, rows) {
  function unpack(rows, key) {
      return rows.map(function(row)
        { return row[key]; });
  }

  var trace = {
      type: 'mesh3d',
      x: unpack(rows, 'reorderBuffer'), 
      y: unpack(rows, 'l1i'), 
      opacity: 0.8,
      // color:'rgb(150,100,200)',
  };

  t1 = unpack(rows, 'thread1Cycles');
  t2 = unpack(rows, 'thread2Cycles');
  trace.z = t1.map((val, i) =>  Math.max(parseInt(val), parseInt(t2[i])));
  Plotly.addTraces("plot", trace);
}

function replotSurface (err, rows) {
  Plotly.purge("plot");
  initPlot();
  plotSurface(err, rows);
}

function initPlot() {
  var layout = { 
    margin: { l: 40, r: 40, b: 0, t: 0, },
    scene: {
      title: "SMT Core vs OOO Core",
      xaxis: { title: "Reorder Buffer Size [entries]" },  
      yaxis: { title: "L1 Instruction Cache Size [bytes]" }, 
      zaxis: { title: "Total Execution Cycles (Thread1 and Thread2)" },
    }
  };
  Plotly.newPlot("plot", [], layout);
}

