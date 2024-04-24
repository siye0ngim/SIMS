let bDoExport = false;
let recording = false;
let field = [];
let rezX = 3;
let rezY = 5;
let cols, rows;
let video;
let width = 640;
let height = 480;
let frameCount = 0;
let writer; 

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  pixelDensity(1);
  
  cols = width / rezX;
  rows = height / rezY;
  for (let i = 0; i < cols; i++) {
    let k = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
    }
    field.push(k);
  }
  recording = false;
}

function drawLine(v1, v2){
  stroke(0);
  strokeWeight(1);
  line(v1.x, v1.y, v2.x, v2.y);
  
  if (recording && frameCount == 1){
    mappedV1X = map(v1.x, 0, 640, 0, 200);
    mappedV1Y = map(v1.y, 0, 480, 0, 150)
    mappedV2X = map(v2.x, 0, 640, 0, 200);
    mappedV2Y = map(v2.y, 0, 480, 0, 150);
    let distance = dist(v1.x, v1.y, v2.x, v2.y);
    let extrusionValue = distance * 0.35;
    let lineToWrite = "G0 X" + mappedV1X + " Y" + mappedV1Y + " Z" + frameCount + "\nG1 X" + mappedV2X + " Y" + mappedV2Y + " Z" + frameCount + " E" + extrusionValue.toFixed(3);
    writer.write(lineToWrite + "\n"); 
  }
}

function hatchDraw(x, y, w, h) {
  for (let i = x; i < x + w + h; i += rezX) {
    let v1 = createVector(i, y);
    let v2 = createVector(i - rezX, y);
    drawLine(v1, v2);
  }
}

function draw() {
  clear();
  let hatchThreshold = 80; //80;
  let marchThreshold = 80;
  
  if (recording) {
    frameCount++; 
  }

  video.loadPixels();
  noStroke(); 
  let vpix = video.pixels;
  for (let j = 0; j < rows; j++) {
    let y = j*rezY;
    const yw = y*width;
    
    for (let i = 0; i < cols; i++) {
      let x = i*rezX; 
      let index = (yw + x)*4;
       let r = vpix[index   ];
       let g = vpix[index +1];
       let b = vpix[index +2];
     
      let bri = (r+g+b)/3;
      field[i][j] = bri;
      // fill(bri+100); 
      // rect(x,y,rezX,rezY);
    }
  }
  
    // marching squares
  let bDrawMarchingSquares = true; 
  if(bDrawMarchingSquares);
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < cols-1; i++) {
      for (let j = 0; j < rows-1; j++) {
        let x = i * rezX;
        let y = j * rezY;
        let a = createVector(x + rezX * 0.5, y            );
        let b = createVector(x + rezX, y + rezY * 0.5);
        let c = createVector(x + rezX * 0.5, y + rezY      );
        let d = createVector(x, y + rezY * 0.5);

        let c1 = field[i][j] < marchThreshold ? 0 : 1;
        let c2 = field[i+1][j] < marchThreshold ? 0 : 1;
        let c3 = field[i+1][j+1]  < marchThreshold ? 0 : 1;
        let c4 = field[i][j+1] < marchThreshold ? 0 : 1;
        let state = getState(c1, c2, c3, c4);

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
        default:
          if (state == 0) {
            let x = i * rezX;
            let y = j * rezY;
            hatchDraw(x, y, rezX, rezY);
          }
          break;
        }
      } 
    }
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}

function keyPressed(){
  if (key == " "){
    recording = !(recording);
    if (recording) {
      frameCount = 0;
      writer = createWriter('gcode.txt');
    } else {
      writer.close();
    }
  }
}
