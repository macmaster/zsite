<?php include "header.php"; ?>

<script src="js/latency.js"></script>
<h2 class="pageHeader"> Quality of Service (QoS) </h2>
<div class="qosDesc">
  <p> Our project is oriented around improving quality of service in datacenters while increasing their utilization. Quality of service (QoS), as defined by our project, is defined by the amount of tail latency for each task on a datacenter. Tail latency is the amount of time a task goes over its deadline. For example, if a task has a deadline of 10ms and normally takes 10ms most of the time, any time over this would be the tail latency of the task. A large amount of tail latency is bad, because if this task is a critcal operation, a user's process could be severly hindered. 
  </p>
  <p> These types of QoS requirements are important to many datacenter applications. For example, when streaming a video on a cloud video service, such as NetFlix, each frame of the video has to be retrieved from a server in the cloud. This retrieval operation is a deadline sensitive task. If this task has a large tail latency, then this results in lag, since the frame of video was retrieved and displayed late. Thus, in cloud applications, ensuring that any deadline sensitive task completes on time is of utmost importance.
  </p>
</div>


<div id="qosVisual">
<h4 class="videoTitle figureHeader"> Original Video: <span id="origRateValue">30</span> fps </h4>
<video id="origVideo" src="videos/latency/30.mp4" muted autoplay loop controls
  width="50%" height="350" poster="http://dummyimage.com/700x350/2e2e2e/2e2e2e"></video><br><br>
<!-- <h6> Lagging Video: <span id="frameRateValue">30</span> fps </h6> -->
<!-- <video id="frameVideo" src="videos/latency/30.mp4" muted autoplay loop controls
  width="50%" height="350" poster="http://dummyimage.com/700x350/2e2e2e/2e2e2e"></video><br> -->

<!-- <input id="frameRateSlider" class="slider" type="range" min="1" max="30" value="50" 
  oninput="updateFrameRate(this, 'frameRateValue', 'frameVideo', 'origVideo');"><br><br> -->

<h4 class="videoTitle figureHeader"> Stuttering Video: <span id="stutterRateValue">Variable</span> fps </h4>
<video id="stutterVideo" src="videos/latency/stutter.mp4" muted autoplay loop controls
  width="50%" height="350" poster="http://dummyimage.com/700x350/2e2e2e/2e2e2e"></video><br><br>
</div>

<?php include "footer.php"; ?>
