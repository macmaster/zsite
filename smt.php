<?php include "header.php"; ?>

<h2>What is Simultaneous Multithreading (SMT)?</h2>
<script src="js/smt.js"></script>
<div id="threadPlots">

<div id="coarse" class="mtDesc"><p>
The simplest type of multithreading occurs when one thread runs until it is blocked by an event that normally would create a long-latency stall. Such a stall might be a cache miss that has to access off-chip memory, which might take hundreds of CPU cycles for the data to return. Instead of waiting for the stall to resolve, a threaded processor would switch execution to another thread that was ready to run. Only when the data for the previous thread had arrived, would the previous thread be placed back on the list of ready-to-run threads.
</p>Figure 1: Coarse-grained Multithreading
<div id="coarsePlot" class="threadPlot"></div>
</div>

<br>

<div id="fine" class="mtDesc"><p>
The purpose of interleaved multithreading is to remove all data dependency stalls from the execution pipeline. Since one thread is relatively independent from other threads, there is less chance of one instruction in one pipelining stage needing an output from an older instruction in the pipeline. Conceptually, it is similar to preemptive multitasking used in operating systems; an analogy would be that the time slice given to each active thread is one CPU cycle.
</p>Figure 2: Fine-grained Multithreading
<div id="finePlot" class="threadPlot"></div>
</div>

<br>

<div id="smt" class="mtDesc"><p>
The most advanced type of multithreading applies to superscalar processors. Whereas a normal superscalar processor issues multiple instructions from a single thread every CPU cycle, in simultaneous multithreading (SMT) a superscalar processor can issue instructions from multiple threads every CPU cycle. Recognizing that any single thread has a limited amount of instruction-level parallelism, this type of multithreading tries to exploit parallelism available across multiple threads to decrease the waste associated with unused issue slots.
</p>Figure 3: Simultaneous Multithreading
<div id="smtPlot" class="threadPlot"></div>
</div>

</div>
<?php include "footer.php"; ?>
