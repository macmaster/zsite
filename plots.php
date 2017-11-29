<?php include "header.php"; ?>

<h2 class="pageHeader">Experiment With Resource Allocation</h2>
<script src="js/plot.js"></script>

<p class="plotDesc">
Click the various menu buttons to plot a benchmark. The plot is interactive. 
Scrolling the mouse allows you to zoom in and zoom out from the plot.
The axes are labeled as follows: 
</p> 

<p style="text-align: center; border: 2px solid #ffffff" class="plotDesc">
x = Reorder Buffer Size (Entries)<br>
y = Data Cache size (KB)<br>
z = Total Execution Cycles
</p>

<div id="plotMenu">
<!-- good benchmarks -->
<div id="plotGoodMenu" class="plotSubMenu">
<a class="plotItem" onclick="plotPurge('branch_good');
Plotly.d3.csv('/csv/branch_good_smt.csv', plotSMTSurface);
Plotly.d3.csv('/csv/branch_good_ooo.csv', plotOOOSurface);
">branch_good</a>
<a class="plotItem" onclick="plotPurge('dcache_good');
Plotly.d3.csv('/csv/dcache_good_smt.csv', plotSMTSurface);
Plotly.d3.csv('/csv/dcache_good_ooo.csv', plotOOOSurface);
">dcache_good</a>
<a class="plotItem" onclick="plotPurge('icache_good');
Plotly.d3.csv('/csv/icache_good_smt.csv', plotSMTSurface);
Plotly.d3.csv('/csv/icache_good_ooo.csv', plotOOOSurface);
">icache_good</a>
</div>

<div id="plotMissMenu" class="plotSubMenu">
<a class="plotItem" onclick="plotPurge('branch_miss');
Plotly.d3.csv('/csv/branch_miss_smt.csv', plotSMTSurface);
Plotly.d3.csv('/csv/branch_miss_ooo.csv', plotOOOSurface);
">branch_miss</a>
<a class="plotItem" onclick="plotPurge('dcache_miss');
Plotly.d3.csv('/csv/dcache_miss_smt.csv', plotSMTSurface);
Plotly.d3.csv('/csv/dcache_miss_ooo.csv', plotOOOSurface);
">dcache_miss</a>
<a class="plotItem" onclick="plotPurge('icache_miss');
Plotly.d3.csv('/csv/icache_miss_smt.csv', plotSMTSurface);
Plotly.d3.csv('/csv/icache_miss_ooo.csv', plotOOOSurface);
">icache_miss</a>
</div>
</div>

<div id="plot"><script> initPlot('branch_good'); 
Plotly.d3.csv('/csv/branch_good_smt.csv', plotSMTSurface);
Plotly.d3.csv('/csv/branch_good_ooo.csv', plotOOOSurface);
</script></div>
<?php include "footer.php"; ?>
