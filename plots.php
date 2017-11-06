<?php include "header.php"; ?>

<h2>Experiment With Resource Allocation</h2>
<script src="js/oooPlot.js"></script>
<script src="js/smtPlot.js"></script>
<a class="item" onclick="Plotly.d3.csv('/csv/smt.csv', plotSMTScatter)">scatter</a>
<a class="item" onclick="Plotly.d3.csv('/csv/smt.csv', plotSMTSurface)">surface</a>

<div id="plot"><script>Plotly.d3.csv('/csv/smt.csv', plotSMTScatter);</script></div>
<?php include "footer.php"; ?>
