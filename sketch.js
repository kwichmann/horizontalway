var fretboard;

var rootSel;
var familySel;
var modeSel;
var intervalSel;
var stringsSel;

var playButton;
var stopButton;
var volSlider;
var loadCow;

var generateButton;
var distanceRadio;

var h2;
var canvasDiv;
var canvas;
var inputDiv;
var playDiv;
var generateDiv;

var drones = [];

function preload() {
  fretboard = loadImage("images/fretboard_760.png");
}

function setup() {
  h2 = select('#h2');
  canvasDiv = select('#canvasDiv');
  inputDiv = select('#inputDiv');
  playDiv = select('#playDiv');
  generateDiv = select('#generateDiv');  
  
  canvas = createCanvas(760, 76);
  canvas.parent(canvasDiv);
  
  rootSel = createSlider(0, 11, 3, 1);
  rootSel.parent(inputDiv);
  rootSel.input(nRoot);
  
  familySel = createSelect();
  familySel.parent(inputDiv);
  for (var i = 0; i < scales.length; i++) {
    familySel.option(scales[i].family, i);
  }
  familySel.changed(newModes);

  modeSel = createSelect();
  modeSel.parent(inputDiv);
  setModes();
  modeSel.input(setName);

  intervalSel = createSelect();
  intervalSel.parent(inputDiv);
  for (var i = 0; i < intervals.length; i++) {
    intervalSel.option(intervals[i], i + 1);
  }
  
  stringsSel = createSelect();
  stringsSel.parent(inputDiv);
  for (var i = 0; i < pairs.length; i++) {
    stringsSel.option(pairs[i][0] + ' and ' + pairs[i][1], i);
  }

  playButton = createButton('Play');
  playButton.parent(playDiv);
  playButton.mousePressed(playDrone);
  stopButton = createButton('Stop');
  stopButton.parent(playDiv);
  stopButton.mousePressed(stopDrone);
  volSlider = createSlider(0, 1, 0.5, 0.01);
  volSlider.parent(playDiv);
  loadCow = createImg('images/freak_cow.png');
  loadCow.style('width', '50px');
  loadCow.parent(playDiv);

  generateButton = select('#generateButton');
  generateButton.mousePressed(generate);
  
  distanceRadio = createRadio();
  distanceRadio.parent(generateDiv);
  distanceRadio.option('Adjacent strings', 5);
  distanceRadio.option('At most two strings apart', 9);
  distanceRadio.option('At most three strings apart', 12);
  distanceRadio.option('At most four strings apart', 14);
  distanceRadio.option('Any', 15);
  distanceRadio.value(5);
  
  setName();

  colorMode(HSB);
  strokeWeight(2);
  
}

function nRoot() {
  setName();
  stopDrone();
}

function setName() {
  h2.html(notes[rootSel.value()] + ' ' + scales[familySel.value()].modes[modeSel.value()]);
}

function setModes() {
  for (var i = 0; i < scales[familySel.value()].modes.length; i++) {
    modeSel.option(scales[familySel.value()].modes[i], i);
  }
}

function remModes() {
  modeSel.elt.innerHTML = '';
}

function newModes() {
  remModes();
  setModes();
  setName();
}

function generate() {
  nRoot = floor(random(0, 12));
  rootSel.value(nRoot);
  
  nMode = floor(random(0, 7));
  modeSel.value(nMode);
  
  nInterval = floor(random(1, 6));
  intervalSel.value(nInterval);
  
  nStrings = floor(random(0, distanceRadio.value()));
  stringsSel.value(nStrings);
  
  setName();
  stopDrone();
}

function draw() {
  background(51);
  image(fretboard, 0, 0);
  
  drawScale(pairs[stringsSel.value()][0], intervalSel.value());
  drawScale(pairs[stringsSel.value()][1], 0);
  
  setVol();
  setCow();
}

function dot(string, fret, hu, root) {
  if (string < 1 || string > 6 || fret < 0 || fret > 24) {
    return null;
  }
  if (fret == 0) {
    x = 13
  } else {
    x = 990 - 962 * pow (2, - (fret - .5) / 12);
  }
  y = string * 11.2 - 3;
  if (root) {
    stroke(0, 0, 255);
  } else {
    stroke(0);
  }
  fill(hu, 255, 255);
  ellipse(x, y, 12, 8);
  
  noStroke();
  fill(0, 0, 255);
  ellipse(x - 2, y - 1, 3, 2);
}

function makeMode(scal, deg) {
  var offset = scal[deg];
  var shiftedNote;
  var nMode = [];
  for (var i = 0; i < 7; i++) {
    shiftedNote = (scal[(i + deg) % 7] + 12 - offset) % 12;
    nMode.push(shiftedNote);
  }
  return nMode;
}

function drawScale(string, cOffset) {
  theMode = makeMode(scales[familySel.value()].notes, modeSel.value());
  theMode.sort(function(a, b){return a-b});
  
  for (var i = 0; i < 7; i++) {
    var fret = (rootSel.value() + theMode[i] - stringOffset[string]) % 12;
    var hu = noteHues[(i + 7 - cOffset) % 7];
    dot(string, fret, hu, i == 0);
    dot(string, fret + 12, hu, i == 0);
    dot(string, fret + 24, hu, i == 0);
  }  
}
