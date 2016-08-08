var fretboard;

var rootSel;
var familySel;
var modeSel;
var intervalSel;
var stringsSel;

var generateButton;
var distanceRadio;

function preload() {
  fretboard = loadImage("images/fretboard_760.png");
}

function setup() {
  h2 = createElement('h2', '');
  
  createCanvas(760, 72);
  
  createP('');
  
  rootSel = createSlider(0, 11, 0, 1);
  rootSel.input(setName);
  
  familySel = createSelect();
  for (var i = 0; i < scales.length; i++) {
    familySel.option(scales[i].family, i);
  }
  familySel.changed(newModes);

  modeSel = createSelect();
  setModes();
  modeSel.changed(setName);

  intervalSel = createSelect();
  for (var i = 0; i < intervals.length; i++) {
    intervalSel.option(intervals[i], i+1);
  }
  
  stringsSel = createSelect();
  for (var i = 0; i < pairs.length; i++) {
    stringsSel.option(pairs[i][0] + ' and ' + pairs[i][1], i);
  }

  createP('');
  
  generateButton = createButton('Generate random');
  generateButton.mousePressed(generate);
  
  distanceRadio = createRadio();
  distanceRadio.option('Adjacent strings', 4);
  distanceRadio.option('At most two strings apart', 8);
  distanceRadio.option('At most three strings apart', 11);
  distanceRadio.option('At most four strings apart', 13);
  distanceRadio.option('Any distance', 14);
  
  setName();
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
  background(255);
  image(fretboard, 0, 0);
  console.log(familySel.value());
}