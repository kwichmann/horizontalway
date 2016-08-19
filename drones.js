var angle = 0;
var loading = false;
var playing = -1;

function playDrone() {
  note = rootSel.value();
  if (drones[note]) {
    if (drones[note].isPlaying()) {
      drones[note].pause();
      playButton.html('Play');
    } else {
      startDrone();
    }
  } else {
    var droneFile = 'drones/' + note + '.mp3';
    drones[note] = loadSound(droneFile, startDrone);
    loading = true;
  }
}

function startDrone() {
  note = rootSel.value();
  drones[note].play();
  playing = note;
  playButton.html('Pause');
  angle = angle % 360;
  loading = false;
}

function setVol() {
  note = rootSel.value();
  if (drones[note]) {
    drones[note].setVolume(volSlider.value());
  }
}

function setCow(perc) {
  if (loading) {
    angle = angle + 5;
  } else {
    angle = lerp(angle, 0, 0.1);
  }
  rot = 'rotate(' + angle + 'deg)';
  loadCow.style('-webkit-transform', rot);
  loadCow.style('-moz-transform', rot);
  loadCow.style('-o-transform', rot);
  loadCow.style('-ms-transform', rot);
  loadCow.style('transform', rot);
}

function stopDrone() {
  playButton.html('Play');
  if (playing >= 0) {
    drones[playing].stop();
  }
}
