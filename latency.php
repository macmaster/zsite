<?php include "header.php"; ?>

<h2>What is Task Latency?</h2>
<script src="js/latency.js"></script>

<div class="latencyDesc"><p>
Latency is a time interval between the stimulation and response, or, from a more general point of view, 
a time delay between the cause and the effect of some physical change in the system being observed.
Latency is physically a consequence of the limited velocity with which any physical interaction can propagate.
The magnitude of this velocity is always less than or equal to the speed of light.
Therefore, every physical system will experience some sort of latency, regardless of the nature of stimulation that it has been exposed to.
</p>

<p>
The precise definition of latency depends on the system being observed and the nature of stimulation. 
In communications, the lower limit of latency is determined by the medium being used for communications. 
In reliable two-way communication systems, latency limits the maximum rate that information can be transmitted, 
as there is often a limit on the amount of information that is "in-flight" at any one moment. 
In the field of human–machine interaction, perceptible latency has a strong effect on user satisfaction and usability.
</p></div>

<div id="latencyVisual">
<h6> Original Rate (30 fps): <span id="origRateValue">30</span> </h6>
<video id="origVideo" src="videos/latency/30.mp4" muted autoplay loop controls
  width="50%" height="350" poster="http://dummyimage.com/700x350/2e2e2e/2e2e2e"></video><br><br>
<h6> Frame Rate (1-30 fps): <span id="frameRateValue">30</span> </h6>
<video id="frameVideo" src="videos/latency/30.mp4" muted autoplay loop controls
  width="50%" height="350" poster="http://dummyimage.com/700x350/2e2e2e/2e2e2e"></video><br><br>

<input id="frameRateSlider" class="slider" type="range" min="1" max="30" value="50" 
  oninput="updateFrameRate(this, 'frameRateValue', 'frameVideo', 'origVideo');">
</div>

<?php include "footer.php"; ?>
