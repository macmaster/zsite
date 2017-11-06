<?php include "header.php"; ?>

<h2>Experiment With Resource Allocation</h2>
<script src="js/plot.js"></script>
<a class="item" onclick="
Plotly.d3.csv('/csv/smt.csv', replotScatter);
// Plotly.d3.csv('/csv/ooo.csv', plotScatter);
">scatter</a>
<a class="item" onclick="
Plotly.d3.csv('/csv/smt.csv', replotSurface);
// Plotly.d3.csv('/csv/ooo.csv', plotSurface);
">surface</a>

<div id="plot"><script> initPlot(); 
Plotly.d3.csv('/csv/smt.csv', plotSurface);
// Plotly.d3.csv('/csv/ooo.csv', plotSurface);
</script></div>
<?php include "footer.php"; ?>
