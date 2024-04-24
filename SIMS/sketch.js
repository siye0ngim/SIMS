let bDoExport = false;
let field = [];
let rezX = 5;
let rezY = 2.5;
let cols, rows;
let video;
let width = 640;
let height = 480;

function setup() {
  createCanvas(640, 480);
  frameRate(60)
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  cols = width / rezX;
  rows = height / rezY;
  for (let i = 0; i < cols; i++) {
    let k = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
    }
    field.push(k);
  }
}

function drawLine(v1, v2) {
  stroke(0, 0, 0);
  strokeWeight(1);
  line(v1.x, v1.y, v2.x, v2.y);
  for (var i=0; i<hatchLines.length; i+=2) {
    var s = hatchLines[i];
    var e = hatchLines[i+1];
    line(s.x, s.y, e.x, e.y);
  }
}

function draw() {
  clear();
  image(video, 0, 0, width, height);
  let threshold = 245;
    loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i;
      let y = j;
      let c = color(
        pixels[(x+y*width) * 40],
        pixels[(x+y*width) * 40 +1],
        pixels[(x+y*width) * 40 +2]
      );
      let b = brightness(c);
      field[i][j] = b;
      fill(b);
      noStroke();
    }
  }
  const hbh = height;
  const hbw = width; 
  hatchLines = [];
  
  for (var hatchY=0; hatchY<hbh; hatchY+=5) {
    var row = hatchY*hbw;
    var bActive = false;
    var prevR = 0;
    for (var hatchX=0; hatchX<hbw; hatchX++) {
      var index = (row + hatchX) *40;
      var currR = pixels[(hatchX+hatchY*width) * 40 +1];
      if (hatchX == (hbw-1)){
        if (bActive){
          hatchLines.push(createVector(hatchX, hatchY)); // line end
          bActive = false; 
        }
      } else {
        if ((currR < 128) && (prevR >= 128)){
          hatchLines.push(createVector(hatchX+1, hatchY)); // line start
          bActive = true; 
        } else if ((currR >= 128) && (prevR < 128) && bActive){
          hatchLines.push(createVector(hatchX-1, hatchY)); // line end
          bActive = false; 
        }
      }
      prevR = currR;
    }
  }
  
  background(255);
  
  for (let i = 0; i < cols-1; i++) {
    for (let j = 0; j < rows-1; j++) {
      let x = i * rezX;
      let y = j * rezY;
      let a = createVector(x + rezX * 0.5, y            );
      let b = createVector(x + rezX, y + rezY * 0.5);
      let c = createVector(x + rezX * 0.5, y + rezY      );
      let d = createVector(x, y + rezY * 0.5);

      let threshold = 80;
      let c1 = field[i][j] < threshold ? 0 : 1;
      let c2 = field[i+1][j] < threshold ? 0 : 1;
      let c3 = field[i+1][j+1]  < threshold ? 0 : 1;
      let c4 = field[i][j+1] < threshold ? 0 : 1;
      let state = getState(c1, c2, c3, c4);
      stroke(0);
      strokeWeight(4);
      switch (state) {
      case 1:  
        drawLine(c, d);
        break;
      case 2:  
        drawLine(b, c);
        break;
      case 3:  
        drawLine(b, d);
        break;
      case 4:  
        drawLine(a, b);
        break;
      case 5:  
        drawLine(a, d);
        drawLine(b, c);
        break;
      case 6:  
        drawLine(a, c);
        break;
      case 7:  
        drawLine(a, d);
        break;
      case 8:  
        drawLine(a, d);
        break;
      case 9:  
        drawLine(a, c);
        break;
      case 10: 
        drawLine(a, b);
        drawLine(c, d);
        break;
      case 11: 
        drawLine(a, b);
        break;
      case 12: 
        drawLine(b, d);
        break;
      case 13: 
        drawLine(b, c);
        break;
      case 14: 
        drawLine(c, d);
        break;
      }
    } 
  }
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}

