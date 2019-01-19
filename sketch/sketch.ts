let mic: p5.AudioIn
let fft: p5.FFT

/*
function setup() {
  createCanvas(710,400);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(200);

  var spectrum = fft.analyze();

  beginShape();
  for (let i = 0; i<spectrum.length; i++) {
   vertex(i, map(spectrum[i], 0, 255, height, 0) );
  }
  endShape();
}
*/

function setup() {
  createCanvas(320,200);
  frameRate(10)
}

function draw() {
  background(200);

  let step = 10
  let lines: p5.Vector[][] = []

  // set up the lines (maybe in setup instead?)
  for (let i = step; i <= this.width - step; i += step) {
    let line: p5.Vector[] = []

    for (let j = step; j <= this.width - step; j += step) {
      // let r = random(0,10)
      let distanceToCenter = Math.abs(j - this.width / 2)
      let variance = Math.max(this.width / 2 - 50 - distanceToCenter, 0);
      let r = Math.random() * variance / 2 * -1;

      line.push(createVector(j, i + r))
    }
    lines.push(line)
  }

  // actually do the drawing
  stroke(0)
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length-1; j++) {
      const p1 = lines[i][j]
      const p2 = lines[i][j+1]
      line(p1.x, p1.y, p2.x, p2.y)
    }
  }
}