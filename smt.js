// $(function() {
// 

// 
//   function isBorder(x, y, gridSize) {
//     return x==0 || y == 0 || x == (gridSize.x-1) || y == (gridSize.y-1);
//   }
// 
//   function buildMap(gridSize, ratios) {
//     var map = { grid:[], grass:[], rock:[], lava:[] };
//     for (x = 0; x < gridSize.x; x++) {
//         map.grid[x] = [];
//         for (y = 0; y < gridSize.y; y++) {
//             var rock = Math.random() < ratios.rock;
//             var lava = Math.random() < ratios.lava;
//             var type = isBorder(x, y, gridSize)?"rock":"grass";
//             if(rock) {
//               type = "rock";
//             }
//             if(lava) {
//               type = "lava";
//             }
//             var cell = { x:x, y:y , type:type };
//             map.grid[x][y] = cell;
//             map[type].push(cell);
//         }
//     }
//     return map;
//   }
// 
//   function getScale(gridSize, svgSize) {
//     var xScale = d3.scale.linear().domain([0,gridSize.x]).range([0,svgSize.width]);
//     var yScale = d3.scale.linear().domain([0,gridSize.y]).range([0,svgSize.height]);
//     return { x:xScale, y:yScale };
//   }
// 
//   function drawCells(svgContainer, scales, data, cssClass) {
//     var gridGroup = svgContainer.append("g");
//     var cells = gridGroup.selectAll("rect")
//                 .data(data)
//                 .enter()
//                 .append("rect");
//     var cellAttributes = cells
//              .attr("x", function (d) { return scales.x(d.x); })
//              .attr("y", function (d) { return scales.y(d.y); })
//              .attr("width", function (d) { return squareLength; })
//              .attr("height", function (d) { return squareLength; })
//              .attr("class", cssClass);
//   }
// 
//   function drawMowerHistory(groups, scales, path) {
//     // path
//     groups.path.selectAll(".path").remove();
//     var lineFunction = d3.svg.line()
//                .x(function(d) { return scales.x(d.x + 0.5); })
//                .y(function(d) { return scales.y(d.y + 0.5); })
//                .interpolate("linear");
// 
//     var lineGraph = groups.path.append("path")
//                               .attr("d", lineFunction(path))
//                               .attr("class", "path")
//                               .attr("fill", "none");
// 
//     // position
//     var circleData = groups.position.selectAll("circle").data(path);
//     circleData.exit().remove();
//     var circles = circleData.enter().append("circle");
//     var circleAttributes = circles
//              .attr("cx", function (d) { return scales.x(d.x + 0.5); })
//              .attr("cy", function (d) { return scales.y(d.y + 0.5); })
//              .attr("r", function (d) { return circleRadius; })
//              .attr("class", "position");
// 
//     // position number
//     var textData = groups.position.selectAll("text").data(path);
//     textData.exit().remove();
//     var texts = textData.enter().append("text");
//     var textAttributes = texts
//              .attr("x", function (d) { return scales.x(d.x + 0.5); })
//              .attr("y", function (d) { return scales.y(d.y + 0.5); })
//              .attr("dy", ".31em")
//              .text(function(d,i) { return i; })
//              .attr("class", "positionNumber");
//   }
// 
//   function pickRandomPosition(map) {
//     var grass = map.grass;
//     var i = Math.ceil(Math.random() * grass.length);
//     return grass[i];
//   }
// 
//   function getNext(map, current, command) {
//     switch(command) {
//       case "U":
//         return map.grid[current.x][current.y-1];
//       case "D":
//         return map.grid[current.x][current.y+1];
//       case "R":
//         return map.grid[current.x+1][current.y];
//       case "L":
//         return map.grid[current.x-1][current.y];
//       default:
//         throw "Unexpected command : "+command;
//       }
//   }
// 
//   function executeCommands(e) {
//     var content = $('#commands').val();
//     content = content.toUpperCase().replace(/[^UDRL]/g, "");
//     $('#commands').val(content);
//     var path = [start];
//     var current = start;
//     for(i = 0; i < content.length; i++) {
//       var next = getNext(map, current, content[i]);
//       switch(next.type) {
//         case "grass":
//           path.push(next);
//           current = next;
//           break;
//         case "rock":
//           // stay at the same place
//           break;
//         case "lava":
//           drawMowerHistory(groups, scales, path);
//           alert("The mower turned into ashes, as predicted.", "Start again.");
//           $('#commands').val("");
//           drawMowerHistory(groups, scales, [start]);
//           return;
//         default:
//           throw "Unexpected terrain type "+next.type;
//       }
//     }
//     drawMowerHistory(groups, scales, path);
//   }
// 
//   var squareLength = 40;
//   var circleRadius = 15;
//   var ratios = { rock:0.05, lava:0.05 };

//   var map = buildMap(gridSize, ratios);
//   var start = pickRandomPosition(map)
// 
//   var svgContainer = d3.select("#display").append("svg").attr("width", svgSize.width).attr("height", svgSize.height);
//   var scales = getScale(gridSize, svgSize);
// 
//   drawCells(svgContainer, scales, map.grass, "grass");
//   drawCells(svgContainer, scales, map.rock, "rock");
//   drawCells(svgContainer, scales, map.lava, "lava");
// 
//   var groups = { path:svgContainer.append("g"),
//                   position:svgContainer.append("g") };
// 
//   $('#commands').on('input', executeCommands);
// 
//   drawMowerHistory(groups, scales, [start]);
// 
//   $('#commands').focus();
//   
// });

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

function drawCells(svgContainer, scales, data, cssClass) {
  var gridGroup = svgContainer.append("g");
  var cells = gridGroup.selectAll("rect")
		.data(data).enter().append("rect");
  var cellAttributes = cells
           .attr("x", function (d) { return scales.x(d.x); })
           .attr("y", function (d) { return scales.y(d.y); })
           .attr("width", function (d) { return squareLength; })
           .attr("height", function (d) { return squareLength; })
           .attr("class", cssClass);
}

function buildMap(gridSize, ratios) {
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

var squareLength = 40;
var gridSize = { x : 20, y : 4 };
var svgSize = getSvgSize(gridSize, squareLength);
var ratios = { thread1 : 0.4, thread2 : 0.3 };
var map = buildMap(gridSize, ratios);

var scales = getScale(gridSize, svgSize);
var svgContainer = d3.select("#display")
	.append("svg").attr("width", svgSize.width).attr("height", svgSize.height);

drawCells(svgContainer, scales, map.idle, "idle");
drawCells(svgContainer, scales, map.thread1, "thread1");

});
