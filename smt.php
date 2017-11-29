<?php include "header.php"; ?>

<h2 class="pageHeader">What is Simultaneous Multithreading (SMT)?</h2>
<script src="js/smt.js"></script>
<div id="threadPlots">

  <div id="coarse" class="mtDesc">
    <h3 class="subHeader"> Coarse-Grain Multithreading </h3>
    <p> Coarse-grain multithreading is the simplest type of multithreading that can be implemented on a processor. It is where one thread runs on the processor until it is blocked by a long latency event that stalls the processor. One example of a long latency event could be a cache miss that would take hundreds of CPU cycles to retrieve the data. In a normal non-multithreaded processor, the thread would have to wait for the stall to finish. However, on a coarse-grain multithreaded processor, this stalled thread would be switched out for another thread that is ready to run. Once the stalled thread is ready to run, it would be put back into the processor to finish running.
    </p>
    <div id="coarsePlot" class="threadPlot">
      <h4 class="figureHeader"> Figure 1: Coarse-Grain Multithreading </h4>
    </div>
  </div>

  <br>

  <div id="fine" class="mtDesc">
    <h3 class="subHeader"> Fine-Grain Multithreading </h3>
    <p> Fine-grain multithreading is similar to coarse-grain multithreading such that once one thread has a stall, another thread is run on the processor. However, fine-grain multithreading chooses to run another thread after every clock cycle. This means that if there is a stall, the ready to run thread would insert a single instruction into the processor to run. The processor would continually run between the two threads in this fashion, using instructions from whichever thread was ready. This type of multithreading further increases the utilization of the processor compared to coarse-grain multithreading.
    </p>
    <div id="finePlot" class="threadPlot">
      <h4 class="figureHeader"> Figure 2: Fine-Grain Multithreading </h4>
    </div>
  </div>

  <br>

  <div id="smt" class="mtDesc">
    <h3 class="subHeader"> Simultaneous Multithreading </h3>
    <p> The purpose of simultaneous multithreading (SMT) is to run multiple threads at the same time by sharing a single processor's resources. This is done by the processor issuing instructions from different threads based on how each thread is stalled or not. This type of multithreading tries to use as many of the processor's resources at a time so that the entire processor is in use. Furthermore, this does not require software support as this type of parallelism is implemented in the processor rather than in the operating system.
    </p>
    <div id="smtPlot" class="threadPlot">
      <h4 class="figureHeader"> Figure 3: Simultaneous Multithreading </h4>
    </div>
  </div>

</div>
<?php include "footer.php"; ?>
