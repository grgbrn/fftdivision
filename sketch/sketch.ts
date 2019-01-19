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

const backgroundColor = 200;

function setup() {
  createCanvas(320,200);
  frameRate(10)

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 32);
  fft.setInput(mic);
}

function draw() {
  background(backgroundColor);

  let spectrum = fft.analyze();

  let step = 10
  let lines: p5.Vector[][] = []

  // set up the lines (maybe in setup instead?)
  for (let i = step; i <= this.width - step; i += step) {
    let line: p5.Vector[] = []

    let sv = map(spectrum[i/step], 0, 255, 0, 2);

    for (let j = 0; j <= this.width; j += step) {
      let distanceToCenter = Math.abs(j - this.width / 2)
      let variance = Math.max(this.width / 2 - 50 - distanceToCenter, 0);

      let r = sv*noise(i + frameCount/10.0, j + frameCount / 10.0) * variance / 2 * -1;

      line.push(createVector(j, i + r))
    }
    // console.log(`n=${i} sv=${sv}`)
    lines.push(line)
  }

  // console.log(`lines=${lines.length}`);

  // actually do the drawing
  stroke(0)
  fill(backgroundColor)

  for (let i = 0; i < lines.length-12; i++) {

    beginShape()

    //let yy = lines[i].y
    //vertex(-10, yy) // A

    vertex(0, this.height) // D
    //vertex(0, yy)
    
    for (let cnt = 0; cnt < lines[i].length; cnt++) {
      let p = lines[i][cnt]
      if(cnt <= 3 || cnt > lines[i].length-3) {
        vertex(p.x, p.y)
      }
      else {
        curveVertex(p.x, p.y)
      }
    }
  
    //vertex(this.width, yy)
    //vertex(this.width, yy) // B
    vertex(this.width, this.height) // C
    

    endShape(CLOSE)
  }
}

