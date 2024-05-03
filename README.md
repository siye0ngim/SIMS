**1. SIMS - Souvenir in Moments**

My goal with SIMS is twofold: to capture the essence of human movement and to democratize the creation of personalized art. Utilizing motion capture technology, I intend to precisely translate dynamic gestures into 3D-printable souvenirs. This process not only preserves the beauty of fleeting moments but also empowers individuals to engage with digital fabrication in a meaningful way. 

The methods combine expertise in computer vision, 3D modeling, and additive manufacturing to streamline the creation of personalized artifacts. The motion outline capture algorithm is done by merging the marching squares technique and hatching on p5.js. While the algorithm is capturing frame by frame outline, the code will translate every frame to G-Code, the only extension accepted by the 3d printer, to sculpt the received outlines. By integrating these technologies, I intend to bridge the gap between digital and physical realms, offering a novel approach to artistic expression and real-time capture. 

My goal with SIMS aligns with the ethos of my studies as an ETB student at CMU's BFA program. Through this project, I aim to bridge the realms of digital art, interactive installation, and technology-driven expression. By utilizing motion capture technology and real-time 3D printing, I'm exploring innovative avenues within electronic art and media.

**2. Code Output**

I used p5.js for creating initial graphics to webcam photobooth. I used marching squares algorithm and implemented hatching techniques to make in 3D printable.

**A. Marching Squares**

The Marching Squares algorithm is a computer graphics algorithm introduced in the 1980s that can be used for contouring. We can use the Marching Squares algorithm to draw the lines of constant:
- altitude on a topographical map
- temperature on a temperature heat map
- pressure on a contour map for a pressure field
Marching squares takes a 2D image and an iso-value as input and outputs a list of vertices and edges that form closed polygons. The method consists of a number of steps: Applying a threshold using the iso-value. Creating a dual grid of cells with corners at the pixel centers.

<img width="1260" alt="Screen Shot 2024-05-02 at 11 10 25 PM" src="https://github.com/siye0ngim/SIMS/assets/114831016/838cf1b8-e02e-418b-8e95-da539786438a">

**B. Hatching**

Lines are drawn horizontally in default state among the case files. If you look at this code block:

```
default:
if (state == 0) {
  let x = i * rezX;
  let y = j * rezY;
  hatchDraw(x, y, rezX, rezY);
}
break;
```

Simply it draws a hatching line among every resolution of pixel if it's a blank pixel.

![sims](https://github.com/siye0ngim/SIMS/assets/114831016/dc31208e-d28b-443c-8b63-b2a164f1d98f)

**C. Printing in GCODE**

```
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
```
Pretty self-explanatory. GCODEs work in X[X value] Y[Y value] Z[Z value]. Every line that is drawn by the hatching or marching squares are called to this function to print its coordinates. The variable extrusionValue is converted to string + rounded down to 3 figures for PLA filaments. Everything else is a normal GCODE function commands. Refer to this link for documentation: https://docs.duet3d.com/en/User_manual/Reference/Gcodes

**3. Final process**

Final process looks pretty good for 1 frame.

<img height="400" alt="Screen Shot 2024-05-02 at 5 49 15 PM" src="https://github.com/siye0ngim/SIMS/assets/114831016/b2d646a7-1d7d-4f7c-9e2f-12338cc23a53">
<img height="400" alt="Screen Shot 2024-05-02 at 5 49 21 PM" src="https://github.com/siye0ngim/SIMS/assets/114831016/62afc7e3-6b60-4560-8feb-b57083219b0c">

Aiming to work on the 3-Dimensional aspect of it over summer!
