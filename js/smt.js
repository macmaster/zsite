$(function() {
function getSvgSize(gridSize, squareLength) {
  var width = gridSize.x * squareLength;
  var height = gridSize.y * squareLength;
  return { width : width, height : height };
}

function getScale(gridSize, svgSize) {
  var xScale = d3.scale.linear().domain([0,gridSize.x]).range([0,svgSize.width]);
  var yScale = d3.scale.linear().domain([0,gridSize.y]).range([0,svgSize.height]);
  return { x : xScale, y : yScale };
}

function drawCells(svgContainer, scales, data) {
  var gridGroup = svgContainer.append("g");
  var cells = gridGroup.selectAll("rect")
		.data(data).enter().append("rect");
  var cellAttributes = cells
           .attr("x", function (d) { return scales.x(d.x); })
           .attr("y", function (d) { return scales.y(d.y); })
           .attr("width", function (d) { return squareLength; })
           .attr("height", function (d) { return squareLength; })
           .attr("class", function(d) { return d.type; });
}

function getSmtCell(x, y, ratios) {
	var ticket = Math.random();
	var type = "idle";
	if (ticket < ratios.thread1) {
	  type = "thread1";
	} else if (ticket < ratios.thread1 + ratios.thread2) {
	  type = "thread2";
	} 
	return { x : x, y : y , type : type };
}

function buildSmtMap(gridSize, ratios) {
	var map = { grid:[], thread1:[], thread2:[], idle:[] };
	for (x = 0; x < gridSize.x; x++) {
	  map.grid[x] = [];
	  for (y = 0; y < gridSize.y; y++) {
		  var ticket = Math.random();
		  var type = "idle";
		  if (ticket < ratios.thread1) {
			  type = "thread1";
		  } else if (ticket < ratios.thread1 + ratios.thread2) {
			  type = "thread2";
		  } 

		  var cell = { x : x, y : y , type : type };
		  map.grid[x][y] = cell;
		  map[type].push(cell);
	  }
	}
	return map;
}

function getFineCell(x, y, color, idle) {
	var ticket = Math.random();
	var type = ticket < (idle * 5) ? "idle" : color;
	return { x : x, y : y , type : type };
}

function buildFineMap(gridSize, ratios) {
	var map = { grid:[], thread1:[], thread2:[], idle:[] };
	var idle = 1 - (ratios.thread1 + ratios.thread2);
	idle *= 2;
	for (x = 0; x < gridSize.x; x++) {
	  map.grid[x] = [];
	  var color = x % 2 ? "thread1" : "thread2";
	  for (y = 0; y < gridSize.y; y++) {
		  var ticket = Math.random();
		  var type = ticket < idle ? "idle" : color;

		  var cell = { x : x, y : y , type : type };
		  map.grid[x][y] = cell;
		  map[type].push(cell);
	  }
	}
	return map;
}

var flip = 0;
var flipIdx = 0;
var hyperparams = [3, 10];
function getCoarseCell(x, y, color, idle) {
	var ticket = Math.random();
    if (flip++ >= 30) {
      flipIdx = 1 - flipIdx;
      flip = 0;
    }
	var type = ticket < (idle * hyperparams[flipIdx]) ? "idle" : color;
	return { x : x, y : y , type : type };
}

function buildCoarseMap(gridSize, ratios) {
	var map = { grid:[], thread1:[], thread2:[], idle:[] };
	var period = Math.floor(gridSize.x / 2);
	var idle = 1 - (ratios.thread1 + ratios.thread2);
	idle *= 5;
	for (x = 0; x < gridSize.x; x++) {
	  map.grid[x] = [];
	  var color = x < period ? "thread1" : "thread2";
	  for (y = 0; y < gridSize.y; y++) {
		  var ticket = Math.random();
		  var type = ticket < idle ? "idle" : color;

		  var cell = { x : x, y : y , type : type };
		  map.grid[x][y] = cell;
		  map[type].push(cell);
	  }
	}
	return map;
}


var turn = true;
var squareLength = 40;
var gridSize = { x : 25, y : 4 };
var svgSize = getSvgSize(gridSize, squareLength);
var ratios = { thread1 : 0.4, thread2 : 0.5 };

var smt = buildSmtMap(gridSize, ratios);
var fine = buildFineMap(gridSize, ratios);
var coarse = buildCoarseMap(gridSize, ratios);

var scales = getScale(gridSize, svgSize);
var smtContainer = d3.select("#smtPlot")
	.append("svg").attr("width", svgSize.width).attr("height", svgSize.height);
var fineContainer = d3.select("#finePlot")
	.append("svg").attr("width", svgSize.width).attr("height", svgSize.height);
var coarseContainer = d3.select("#coarsePlot")
	.append("svg").attr("width", svgSize.width).attr("height", svgSize.height);


function advanceCycle(grid, gridSize) {
	// update cycle counts
	for (x = gridSize.x - 2; x >= 0; x--) {
		for (y = 0; y < gridSize.y; y++) {
			var cell = grid.grid[x][y];
			cell.x = x + 1; cell.y = y;
			grid[cell.type].push(cell);
			grid.grid[x + 1][y] = cell;
		}
	}
}

function nextSmt(smt, gridSize, ratios) {
	smt.idle = []; 
	smt.thread1 = []; 
	smt.thread2 = [];
	advanceCycle(smt, gridSize);

	smt.grid[0] = [];
	for (y = 0; y < gridSize.y; y++) {
		var cell = getSmtCell(0, y, ratios);
		smt.grid[0][y] = cell;
		smt[cell.type].push(cell);
	}
}

function nextFine(fine, gridSize, ratios) {
	fine.idle = []; 
	fine.thread1 = []; 
	fine.thread2 = [];
	advanceCycle(fine, gridSize);

	turn = !turn;
	fine.grid[0] = [];
	var color = turn ? "thread2" : "thread1";
	var idle = 1 - (ratios.thread1 + ratios.thread2);
	for (y = 0; y < gridSize.y; y++) {
		var cell = getFineCell(0, y, color, idle);
		fine.grid[0][y] = cell;
		fine[cell.type].push(cell);
	}
}

var tick = 0;
function nextCoarse(coarse, gridSize, ratios) {
	coarse.idle = []; 
	coarse.thread1 = []; 
	coarse.thread2 = [];
	advanceCycle(coarse, gridSize);
	
	coarse.grid[0] = [];
	var period = Math.floor(gridSize.x / 2);
	var idle = 1 - (ratios.thread1 + ratios.thread2);
	var color = tick > period ? "thread1" : "thread2";
	tick = (tick + 1) % gridSize.x;
	for (y = 0; y < gridSize.y; y++) {
		var cell = getCoarseCell(0, y, color, idle);
		coarse.grid[0][y] = cell;
		coarse[cell.type].push(cell);
	}
}

function redraw() {
	d3.selectAll("g").remove();

	// redraw smt
	nextSmt(smt, gridSize, ratios);
	drawCells(smtContainer, scales, smt.idle);
	drawCells(smtContainer, scales, smt.thread1);
	drawCells(smtContainer, scales, smt.thread2);
	
	// redraw fine grained
	nextFine(fine, gridSize, ratios);
	drawCells(fineContainer, scales, fine.idle);
	drawCells(fineContainer, scales, fine.thread1);
	drawCells(fineContainer, scales, fine.thread2);

	// redraw coarse
	nextCoarse(coarse, gridSize, ratios);
	drawCells(coarseContainer, scales, coarse.idle);
	drawCells(coarseContainer, scales, coarse.thread1);
	drawCells(coarseContainer, scales, coarse.thread2);
}


redraw(); // draw the map
setInterval(redraw, 500);

});
