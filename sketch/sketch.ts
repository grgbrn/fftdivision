let mic: p5.AudioIn;
let fft: p5.FFT;
let step = 40;
let yellowLine = 0;
const backgroundColor = 200;
let fs = false;

function setup() {
  createCanvas(1000, 800);
  frameRate(10)

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 32);
  fft.setInput(mic);

  stroke(0);
  strokeWeight(5);
  fill(backgroundColor);
}
function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs);
}
function draw() {
  background(backgroundColor);
  if(frameCount % 30 == 1){
    yellowLine = int(random(this.width / step) - 3);
  }
  let spectrum = fft.analyze();
  
  
  let lines: p5.Vector[][] = []

  // set up the lines (maybe in setup instead?)
  for (let i = 2*step; i <= this.width - step; i += step) {
    let line: p5.Vector[] = []

    let sv = map(spectrum[i/step], 0, 255, 0, step / 8);
  
    for (let j = 0; j <= this.width; j += step) {
      
      let distanceToCenter = Math.abs(j - this.width / 2)
      let variance = Math.max(this.width / 2 - 50 - distanceToCenter, 0);

      let r = sv*noise(i + frameCount/10.0, j + frameCount / 10.0) * variance / 2 * -1;

      line.push(createVector(j, i + r))
    }
    
    lines.push(line)
  }

  // actually do the drawing

  for (let i = 0; i < lines.length; i++) {
    if(yellowLine == i) {
      stroke(250, 201, 1)
    }

    beginShape()
    vertex(0, this.height) // D
    for (let cnt = 0; cnt < lines[i].length; cnt++) {
      let p = lines[i][cnt]
      curveVertex(p.x, p.y)
    }
    vertex(this.width, this.height) // C
    endShape(CLOSE)
    stroke(0);
  }
}

