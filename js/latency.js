function updateFrameVideo(videoId, frameRate) {
  console.log(`${videoId} new frame rate : ${frameRate}`);
  var video = document.getElementById(videoId);
  video.src = `videos/latency/${frameRate}.mp4`
  video.load();
}

function replayOriginal(origId) {
  var origVideo = document.getElementById(origId);
  origVideo.load();
  // origVideo.pause();
  // origVideo.currentTime = 0;
  // origVideo.play();
}

function updateFrameRate(slider, valueId, videoId, origId) {
  var output = document.getElementById(valueId);
  frameRate = slider.value;
  output.innerHTML = frameRate;
  updateFrameVideo(videoId, frameRate);
  replayOriginal(origId);
}
