var fretboard;

var rootSel;
var familySel;
var modeSel;
var intervalSel;
var stringsSel;

var generateButton;
var distanceRadio;

var nameDiv;
var h2;
var canvasDiv;
var canvas;
var inputDiv;

function preload() {
  fretboard = loadImage("images/fretboard_760.png");
}

function setup() {
  
  nameDiv = createDiv('');
  h2 = createElement('h2', '');
  h2.parent(nameDiv);
  
  canvasDiv = createDiv('');
  canvas = createCanvas(760, 72);
  canvas.parent(canvasDiv);
  
  inputDiv = createDiv('');
  rootSel = createSlider(0, 11, 3, 1);
  rootSel.parent(inputDiv);
  rootSel.input(setName);
  
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

  generateButton = createButton('Generate random');
  generateButton.mousePressed(generate);
  
  distanceRadio = createRadio();
  distanceRadio.style('display', 'inline-block');
  distanceRadio.option('Adjacent strings', 4);
  distanceRadio.option('At most two strings apart', 8);
  distanceRadio.option('At most three strings apart', 11);
  distanceRadio.option('At most four strings apart', 13);
  distanceRadio.option('Any distance', 14);
  
  setName();

  colorMode(HSB);
  strokeWeight(2);
  
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
  
}

function draw() {
  background(51);
  image(fretboard, 0, 0);
  
  drawScale(pairs[stringsSel.value()][0], intervalSel.value());
  drawScale(pairs[stringsSel.value()][1], 0);
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
