

let colorStep = 0
let backgroundColors: p5.Color[]

let mic: p5.AudioIn;
let fft: p5.FFT;
let step = 40;
let yellowLine = 0;
let fs = false;

function setup() {
  createCanvas(1000, 800);
  frameRate(10)
  colorMode(HSB)

  backgroundColors = [
    color("#292458"),
    color("#3a748b"),
    color("#2c5158")
  ]

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 32);
  fft.setInput(mic);

  stroke(0);
  strokeWeight(5);
}
function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs);
}
function draw() {
  // need to clamp colorStep from 0->1
  colorStep += 0.01
  if (colorStep > 1) {
    colorStep = 0.0
    // pop the first color off the array and move it to the end
    let tmp = backgroundColors.shift()
    backgroundColors.push(tmp)
  }
  let backgroundColor = lerpColor(backgroundColors[0], backgroundColors[1], colorStep)
  background(backgroundColor)
  // end background color morph

  if(frameCount % 30 == 1){
    yellowLine = 2 + int(random(this.width / step) - 2);
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
  stroke(255)
  fill(backgroundColor)

  for (let i = 0; i < lines.length; i++) {
    if(yellowLine == i) {
      stroke(color("#fac901")) // stroke(250, 201, 1)
    }

    beginShape()
    vertex(0, this.height) // D
    for (let cnt = 0; cnt < lines[i].length; cnt++) {
      let p = lines[i][cnt]
      curveVertex(p.x, p.y)
    }
    vertex(this.width, this.height) // C
    endShape(CLOSE)
    stroke(255);
  }
}
