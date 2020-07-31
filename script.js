/* global
 *    createCanvas
 *    colorMode,
 *    HSB,
 *    background,
 *    ellipse,
 *    random,
 *    width,
 *    height,
 *    rect,
 *    mouseX, mouseY,
 *    line
 *    text, cone
 *    sqrt
 *    color
 *    camera
 *    fill
 *    orbitControl
 *    normalMaterial
 *    rotateY, rotateX, rotateZ
 *    translate, cylinder, sphere
 *    push
 *    box
 *    pop
 *    WEBGL
 *    perspective, rotate
 *    PI
 *    keyCode
 *    UP_ARROW, ellipsoid
 *    DOWN_ARROW
 *    stroke
 *    tan
 *    THREE
 *    LEFT_ARROW
 *    RIGHT_ARROW
 *    ambientLight
 *    windowWidth, windowHeight
 *    angleMode, DEGREES
 *    createVector
 *    directionalLight
 *    key
 */

let zPosCam, xPosCam, yPosCam;
let roadWidth, roadHeight, roadDepth;
let foundationWidth, foundationHeight, foundationDepth;
let building1X, building1Y, building1Z; //top right foundation
let building2X, building2Y, building2Z; //topleft
let building3X, building3Y, building3Z; // bottom left
let building4X, building4Y, building4Z; // bottom right

let b1X, b1Y, b1Z, b1W, b1H, b1D;
let b2X, b2Y, b2Z, b2W, b2H, b2D;
let b3X, b3Y, b3Z, b3W, b3H, b3D;
let b4X, b4Y, b4Z, b4W, b4H, b4D;

let b1color, b2color, b3color, b4color;
let windowColor;
let foundationColor;
let pavementColor;
let grassColor;
let roadColor;

let mouseClick;

let v1, v2;

let y, z;

let ry, rx;

let place;

let cars, clouds;

let xPos, yPos, dir;

function setup() {
  //colorMode(HSB, 100);
  createCanvas(windowWidth, windowHeight, WEBGL);
  fill(0);
  //colorMode(HSB, 360, 100, 100);
  //camera position
  zPosCam = height / 2 / tan(PI / 6);
  xPosCam = width / 50 - 10;
  yPosCam = height / 30 - 70; //height/3

  y = yPosCam; //height/2; //height/2
  z = 10 + 90;

  //birds eye
  ry = 0;
  rx = 0;

  xPos = 1;

  mouseClick = false;

  b1color = color(254, 118, 111);
  b2color = color(253, 156, 199);
  b3color = color(254, 162, 122);
  b4color = color(59, 191, 225);
  foundationColor = color(255, 204, 108);
  grassColor = color(139, 203, 126);
  pavementColor = color(172, 158, 157);
  roadColor = color(100, 92, 89);
  windowColor = color(0, 112, 209);

  roadWidth = 600;
  roadHeight = 200;
  roadDepth = 600;

  foundationWidth = 150;
  foundationHeight = 12;
  foundationDepth = 150;

  building1X = 125;
  building1Y = 0;
  building1Z = -125;

  b1X = building1X;
  b1Y = building1Y;
  b1Z = building1Z - 5;
  b1W = foundationWidth - 65;
  b1H = 300;
  b1D = foundationDepth - 100;

  building2X = -125;
  building2Y = 0;
  building2Z = -125;

  b2X = building2X;
  b2Y = building2Y;
  b2Z = building2Z - 7.5;
  b2W = foundationWidth - 85;
  b2H = 300;
  b2D = foundationDepth - 82.5;

  building3X = -125;
  building3Y = 0;
  building3Z = 125;

  b3X = building3X;
  b3Y = building3Y;
  b3Z = building3Z - 16.5;
  b3W = foundationWidth - 88;
  b3H = 300;
  b3D = foundationDepth - 88;

  building4X = 125;
  building4Y = 0;
  building4Z = 125;

  b4X = building4X;
  b4Y = building4Y;
  b4Z = building4Z;
  b4W = foundationWidth - 55;
  b4H = 100;
  b4D = foundationDepth - 90;

  cars = [];
  clouds = [];
  dir = 1;
}

class Car {
  constructor(color, xPos, yPos) {
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.dir = 1;
  }

  draw() {
    //cars
    push();
    fill(this.color);
    // stroke(3)
    translate(-20, -20, 20);
    box(40, 20, 20);
    pop();

    push();
    fill(this.color);
    //stroke(3)
    translate(-20, -17, 20);
    box(70, 10, 20);
    pop();

    //windows of car
    push();
    fill(b4color);
    //stroke(3)
    translate(-7, -25, 20);
    box(15, 8, 15);
    pop();

    push();
    fill(b4color);
    //stroke(3)
    translate(-33, -25, 20);
    box(15, 8, 15);
    pop();

    //wheels
    push();
    fill("black");
    translate(-5, -12, 30);
    sphere(7, 10, 7);
    pop();

    push();
    fill("black");
    translate(-35, -12, 30);
    sphere(7, 10, 7);
    pop();

    push();
    fill("black");
    translate(-5, -12, 9);
    sphere(7, 10, 7);
    pop();

    push();
    fill("black");
    translate(-35, -12, 9);
    sphere(7, 10, 7);
    pop();
  }
}

class Cloud {
  constructor(xPos, yPos, zPos, width, height, depth) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;

    this.height = height;
    this.width = width;
    this.depth = depth;

    this.dir = 1;
  }

  draw() {
    push();
    fill("white");
    translate(this.xPos, this.yPos, this.zPos);
    box(this.width, this.height, this.depth);
    pop();
  }
}
function draw() {
  background(135, 206, 250);
  angleMode(DEGREES);
  // colorMode(HSB, 100);
  //(location x, y, z, pointing to x, y, z, up vector, x,y,z)
  camera(xPosCam, yPosCam, zPosCam, xPosCam, y, z, 0, 1, 0);
  normalMaterial();

  //   if (mouseClick == true) {
  //     //rotateX(mouseY / 2);
  //     ry -= 5;

  //   }

  rotateY(ry);
  rotateX(rx);
  //translate(width / 3, height / 5);

  //street lights
  //push()
  //fill(200)
  //cylinder()
  //
  //
  //pop()
  //
  //

  //clouds

  clouds.push(new Cloud(0, -300, 0, 90, 30, 30));
  clouds.push(new Cloud(100, -380, -200, 90, 30, 30));
  clouds.push(new Cloud(-199, -350, -400, 90, 30, 30));
  clouds.push(new Cloud(199, -350, 50, 90, 30, 30));

  //cloud 1
  if (clouds[0].xPos >= 200 || clouds[0].xPos <= -200) {
    clouds[0].dir *= -1;
  }

  if (clouds[0].dir == 1) {
    push();

    translate(clouds[0].xPos, 0, 0);
    clouds[0].draw();

    pop();

    clouds[0].xPos += 1;
  }
  if (clouds[0].dir == -1) {
    push();

    translate(clouds[0].xPos, 0, 0);
    clouds[0].draw();

    pop();

    clouds[0].xPos -= 1;

    //cloud 2
  }

    if (clouds[1].xPos >= 200 || clouds[1].xPos <= -200) {
      clouds[1].dir *= -1;
    }

    if (clouds[1].dir == 1) {
      push();

      translate(clouds[1].xPos, 0, 0);
      clouds[1].draw();

      pop();

      clouds[1].xPos += 1;
    }
    if (clouds[1].dir == -1) {
      push();

      translate(clouds[1].xPos, 0, 0);
      clouds[1].draw();

      pop();

      clouds[1].xPos -= 1;
    }
  
  //clouds 3
  
   if (clouds[2].xPos >= 200 || clouds[2].xPos <= -200) {
      clouds[2].dir *= -1;
    }

    if (clouds[2].dir == 1) {
      push();

      translate(clouds[2].xPos, 0, 0);
      clouds[2].draw();

      pop();

      clouds[2].xPos += 1;
    }
    if (clouds[2].dir == -1) {
      push();

      translate(clouds[2].xPos, 0, 0);
      clouds[2].draw();

      pop();

      clouds[2].xPos -= 1;
    }


//clouds 4

if (clouds[3].xPos >= 200 || clouds[3].xPos <= -200) {
      clouds[3].dir *= -1;
    }

    if (clouds[3].dir == 1) {
      push();

      translate(clouds[3].xPos, 0, 0);
      clouds[3].draw();

      pop();

      clouds[3].xPos += 1;
    }
    if (clouds[3].dir == -1) {
      push();

      translate(clouds[3].xPos, 0, 0);
      clouds[3].draw();

      pop();

      clouds[3].xPos -= 1;
    }

  //cars

  for (var i = 0; i < 2; i++) {
    cars.push(new Car(b1color, 0, 0));
  }

  for (var i = 0; i < 2; i++) {
    cars.push(new Car(b2color, 0, 0));
  }

  for (var i = 0; i < 1; i++) {
    cars.push(new Car(b3color, 0, 0));
  }

  //   push();
  //   translate(80,0,0);
  //   cars[1].draw();
  //   pop();

  if (cars[0].dir == 1) {
    push();
    translate(cars[0].xPos, 0, 0);
    cars[0].draw();
    pop();
    cars[0].xPos += 1;
  }

  if (cars[0].dir == -1) {
    push();
    translate(cars[0].xPos, 0, 0);
    cars[0].draw();
    pop();
    cars[0].xPos -= 1;
  }

  if (cars[0].xPos == 280 || cars[0].xPos == -220) {
    cars[0].dir *= -1;
  }

  //car 2

  push();
  rotateY(90);
  translate(100, 0, -40);

  if (cars[1].dir == 1) {
    push();
    translate(cars[1].yPos, 0, 0);
    cars[1].draw();
    pop();
    cars[1].yPos += 1;
  }

  if (cars[1].dir == -1) {
    push();
    translate(cars[1].yPos, 0, 0);
    cars[1].draw();
    pop();
    cars[1].yPos -= 1;
  }

  if (cars[1].yPos == 180 || cars[1].yPos == -220) {
    cars[1].dir *= -1;
  }

  pop();

  //car 3

  push();
  rotateY(0);
  translate(100, 0, 200);

  if (cars[2].dir == 1) {
    push();
    translate(cars[2].yPos, 0, 0);
    cars[2].draw();
    pop();
    cars[2].yPos += 1;
  }

  if (cars[2].dir == -1) {
    push();
    translate(cars[2].yPos, 0, 0);
    cars[2].draw();
    pop();
    cars[2].yPos -= 1;
  }

  if (cars[2].yPos == 180 || cars[2].yPos == -220) {
    cars[2].dir *= -1;
  }

  pop();

  //car 4

  push();
  rotateY(90);
  translate(50, 0, 200);

  if (cars[3].dir == 1) {
    push();
    translate(cars[3].yPos, 0, 0);
    cars[3].draw();
    pop();
    cars[3].yPos -= 1;
  }

  if (cars[3].dir == -1) {
    push();
    translate(cars[3].yPos, 0, 0);
    cars[3].draw();
    pop();
    cars[3].yPos += 1;
  }

  if (cars[3].yPos == 180 || cars[3].yPos == -220) {
    cars[3].dir *= -1;
  }

  pop();

  //car 5

  push();
  rotateY(90);
  translate(100, 0, -240);

  if (cars[4].dir == 1) {
    push();
    translate(cars[4].yPos, 0, 0);
    cars[4].draw();
    pop();
    cars[4].yPos -= 1;
  }

  if (cars[4].dir == -1) {
    push();
    translate(cars[3].yPos, 0, 0);
    cars[4].draw();
    pop();
    cars[4].yPos += 1;
  }

  if (cars[4].yPos == 160 || cars[4].yPos == -220) {
    cars[4].dir *= -1;
  }

  pop();

  // road lines

  for (var i = 40; i > -50; i -= 10) {
    push();
    fill(255);
    translate(-60, 1, i);
    box(25, 15, 5);
    pop();
  }

  for (var i = 40; i > -50; i -= 10) {
    push();
    fill(255);
    translate(-192, 1, i);
    box(25, 15, 5);
    pop();
  }
  push();
  fill(255);
  translate(-25, 1, -53);
  box(50, 15, 5);
  pop();

  for (var i = -60; i > -145; i -= 40) {
    push();
    fill(255);
    translate(0, 1, i);
    box(5, 15, 20);
    pop();
  }

  push();
  fill(255);
  translate(-50, 1, -225);
  box(5, 15, 50);
  pop();

  for (var i = -60; i > -185; i -= 40) {
    push();
    fill(255);
    translate(i, 1, -250);
    box(25, 15, 5);
    pop();
  }

  push();
  fill(255);
  translate(-225, 1, -200);
  box(50, 15, 5);
  pop();

  for (var i = -192; i < -60; i += 40) {
    push();
    fill(255);
    translate(-250, 1, i);
    box(5, 15, 20);
    pop();
  }

  for (var i = -85; i > -185; i -= 40) {
    push();
    fill(255);
    translate(i, 1, -0.5);
    box(20, 15, 5);
    pop();
  }

  push();
  fill(255);
  translate(226, 1, -53);
  box(50, 15, 5);
  pop();

  for (var i = -193; i < -50; i += 40) {
    push();
    fill(255);
    translate(250, 1, i);
    box(5, 15, 30);
    pop();
  }
  push();
  fill(255);
  translate(26, 1, 53);
  box(50, 15, 5);
  pop();

  for (var i = 63; i < 180; i += 40) {
    push();
    fill(255);
    translate(0, 1, i);
    box(5, 15, 25);
    pop();
  }

  push();
  fill(255);
  translate(-220, 1, 53);
  box(50, 15, 5);
  pop();

  for (var i = 63; i < 180; i += 40) {
    push();
    fill(255);
    translate(-250, 1, i);
    box(5, 15, 25);
    pop();
  }

  push();
  fill(255);
  translate(-198, 1, 222);
  box(5, 15, 50);
  pop();

  for (var i = -188; i < 0; i += 40) {
    push();
    fill(255);
    translate(i, 1, 250);
    box(25, 15, 5);
    pop();
  }

  for (var i = 50; i < 200; i += 40) {
    push();
    fill(255);
    translate(i, 1, 250);
    box(25, 15, 5);
    pop();
  }
  for (var i = 0; i > -50; i -= 10) {
    push();
    fill(255);
    translate(i, 1, 190);
    box(5, 15, 25);
    pop();
  }

  for (var i = 200; i > 50; i -= 40) {
    push();
    fill(255);
    translate(25, 1, i);
    box(40, 15, 1);
    pop();
  }
  //PARKINg lot
  push();
  fill(255);
  translate(45, 1, 130);
  box(1, 15, 140);
  pop();

  push();
  fill(255);
  translate(225, 1, 198);
  box(50, 15, 5);
  pop();

  for (var i = 80; i < 200; i += 40) {
    push();
    fill(255);
    translate(250, 1, i);
    box(5, 15, 20);
    pop();
  }
  push();
  fill(255);
  translate(198, 1, 25);
  box(5, 15, 50);
  pop();

  for (var i = 180; i > 40; i -= 40) {
    push();
    fill(255);
    translate(i, 1, 3);
    box(25, 15, 5);
    pop();
  }

  for (var i = 180; i > 40; i -= 40) {
    push();
    fill(255);
    translate(i, 1, -250);
    box(25, 15, 5);
    pop();
  }

  // trees

  push();
  fill(0);
  translate(-80, -10, 80);
  cylinder(1.5, 50, 40);
  pop();

  for (var i = -55; i < -30; i += 10) {
    push();
    translate(-81, i, 80);
    rotate(180);
    fill(16, 100, 100);
    cone(10, 30, 18);
    pop();
  }

  push();
  fill(0);
  translate(-80, -10, 110);
  cylinder(1.5, 50, 40);
  pop();

  for (var i = -55; i < -30; i += 10) {
    push();
    translate(-80, i, 110);
    rotate(180);
    fill(16, 100, 100);
    cone(10, 30, 18);
    pop();
  }

  push();
  fill(0);
  translate(-80, -10, 140);
  cylinder(1.5, 50, 40);
  pop();

  for (var i = -55; i < -30; i += 10) {
    push();
    translate(-80, i, 140);
    rotate(180);
    fill(16, 100, 100);
    cone(10, 30, 18);
    pop();
  }

  push();
  fill(0);
  translate(-80, -10, 170);
  cylinder(1.5, 50, 40);
  pop();

  for (var i = -55; i < -30; i += 10) {
    push();
    translate(-80, i, 170);
    rotate(180);
    fill(16, 100, 100);
    cone(10, 30, 10);
    pop();
  }

  push();
  fill(0);
  translate(80, -10, -80);
  cylinder(1.5, 50, 40);
  pop();

  for (var i = -55; i < -30; i += 10) {
    push();
    translate(80, i, -80);
    rotate(180);
    fill(16, 100, 100);
    cone(10, 30, 10);
    pop();
  }

  push();
  fill(0);
  translate(110, -10, -80);
  cylinder(1.5, 50, 40);
  pop();

  for (var i = -55; i < -30; i += 10) {
    push();
    translate(110, i, -80);
    rotate(180);
    fill(16, 100, 100);
    cone(10, 30, 10);
    pop();
  }

  push();
  fill(0);
  translate(140, -10, -80);
  cylinder(1.5, 50, 40);
  pop();

  for (var i = -55; i < -30; i += 10) {
    push();
    translate(140, i, -80);
    rotate(180);
    fill(16, 100, 100);
    cone(10, 30, 10);
    pop();
  }

  push();
  fill(0);
  translate(170, -10, -80);
  cylinder(1.5, 50, 40);
  pop();

  for (var i = -55; i < -30; i += 10) {
    push();
    translate(170, i, -80);
    rotate(180);
    fill(16, 100, 100);
    cone(10, 30, 10);
    pop();
  }

  // other type of trees
  for (var i = 90; i < 170; i += 9) {
    push();
    translate(i, -10, 170);
    fill(16, 100, 100);
    ellipsoid(5, 4, 3);
    pop();
  }
  for (var i = 90; i < 170; i += 9) {
    push();
    translate(i, -15, 170);
    fill(16, 100, 100);
    sphere(5, 4, 5);
    pop();
  }

  for (var i = 90; i < 170; i += 9) {
    push();
    translate(i, -10, 80);
    fill(16, 100, 100);
    ellipsoid(5, 4, 3);
    pop();
  }
  for (var i = 90; i < 170; i += 9) {
    push();
    translate(i, -15, 80);
    fill(16, 100, 100);
    sphere(5, 4, 5);
    pop();
  }

  for (var i = -160; i < -80; i += 9) {
    push();
    translate(i, -10, -80);
    fill(16, 100, 100);
    ellipsoid(5, 4, 3);
    pop();
  }
  for (var i = -160; i < -80; i += 9) {
    push();
    translate(i, -15, -80);
    fill(16, 100, 100);
    sphere(5, 4, 5);
    pop();
  }

  for (var i = 50; i < 150; i += 9) {
    push();
    translate(i, -10, -200);
    fill(16, 100, 100);
    ellipsoid(5, 4, 3);
    pop();
  }
  for (var i = 50; i < 150; i += 9) {
    push();
    translate(i, -15, -200);
    fill(16, 100, 100);
    sphere(5, 4, 5);
    pop();
  }

  //foundation
  push();
  fill(roadColor);
  translate(0, 95);
  box(roadWidth, roadHeight, roadDepth);
  pop();
  // foundation of each building

  //foundation top right
  push();
  fill(foundationColor);
  translate(building1X, building1Y, building1Z);
  box(foundationWidth, foundationHeight, foundationDepth);
  pop();

  //grey part 1

  push();
  fill(pavementColor);
  translate(building1X, building1Y, building1Z); //-6
  box(
    foundationWidth / (foundationWidth / 105),
    foundationHeight + 10,
    foundationDepth / 2 - 5
  );
  pop();

  // green part 1
  push();
  fill(grassColor);
  translate(building1X, building1Y, building1Z + 43.75);
  box(
    foundationWidth / (foundationWidth / 105),
    foundationHeight + 3,
    foundationDepth / 10
  );
  pop();

  push();
  fill(grassColor);
  translate(building1X, building1Y, building1Z - 43.75);
  box(
    foundationWidth / (foundationWidth / 105),
    foundationHeight + 3,
    foundationDepth / 10
  );
  pop();

  //white borders 1
  push();
  fill(255);
  translate(building1X + 71.25, building1Y, building1Z);
  box(foundationWidth / 20, foundationHeight + 5, foundationDepth);
  pop();

  push();
  fill(255);
  translate(building1X - 71.25, building1Y, building1Z);
  box(foundationWidth / 20, foundationHeight + 5, foundationDepth);
  pop();

  push();
  fill(255);
  translate(building1X, building1Y, building1Z - 71.25);
  box(foundationWidth, foundationHeight + 5, foundationDepth / 20);
  pop();

  push();
  fill(255);
  translate(building1X, building1Y, building1Z + 71.25);
  box(foundationWidth, foundationHeight + 5, foundationDepth / 20);
  pop();

  //building top right

  push();
  fill(b1color);
  translate(b1X, b1Y, b1Z);
  box(b1W, b1H, b1D);
  pop();

  //window top right

  for (var i = -135; i <= -60; i += 35) {
    push();
    fill(b4color);
    translate(b1X - 20, b1Y + i, b1Z - 25);
    box(35, 20, 5);
    pop();
  }

  for (var i = -135; i <= -60; i += 35) {
    push();
    fill(b4color);
    translate(b1X + 20, b1Y + i, b1Z - 25);
    box(35, 20, 5);
    pop();
  }

  for (var i = -135; i <= -60; i += 35) {
    push();
    fill(b4color);
    translate(b1X + 20, b1Y + i, b1Z + 25);
    box(35, 20, 5);
    pop();
  }

  for (var i = -135; i <= -60; i += 35) {
    push();
    fill(b4color);
    translate(b1X - 20, b1Y + i, b1Z + 25);
    box(35, 20, 5);
    pop();
  }

  for (var i = -135; i <= -60; i += 35) {
    push();
    fill(b4color);
    translate(b1X + 42.5, b1Y + i, b1Z + 11.25);
    box(5, 20, 17.5);
    pop();
  }

  for (var i = -135; i <= -60; i += 35) {
    push();
    fill(b4color);
    translate(b1X + 42.5, b1Y + i, b1Z - 11.25);
    box(5, 20, 17.5);
    pop();
  }

  for (var i = -135; i <= -60; i += 35) {
    push();
    fill(b4color);
    translate(b1X - 42.5, b1Y + i, b1Z + 11.25);
    box(5, 20, 17.5);
    pop();
  }

  for (var i = -135; i <= -60; i += 35) {
    push();
    fill(b4color);
    translate(b1X - 42.5, b1Y + i, b1Z - 11.25);
    box(5, 20, 17.5);
    pop();
  }

  push();
  fill(b4color);
  translate(b1X, b1Y + i, b1Z - 25);
  box(60, 25, 5);
  pop();

  push();
  fill(b4color);
  translate(b1X, b1Y + i, b1Z + 25);
  box(60, 25, 5);
  pop();

  //door top right

  push();
  fill(b4color);
  translate(b1X - 42.5, b1Y + i + 4, b1Z);
  box(5, 32, 30);
  pop();

  //brim top right

  push();
  fill("white");
  translate(b1X - 40, b1Y - 155, b1Z);
  box(10, 10, 67.5 + 3);
  pop();

  push();
  fill("white");
  translate(b1X + 40, b1Y - 155, b1Z);
  box(10, 10, 67.5 + 3);
  pop();

  push();
  fill("white");
  translate(b1X, b1Y - 155, b1Z - 30);
  box(65 + 8, 10, 10);
  pop();

  push();
  fill("white");
  translate(b1X, b1Y - 155, b1Z + 30);
  box(65 + 8, 10, 10);
  pop();

  //foundation top left

  push();

  fill(foundationColor);
  translate(building2X, building2Y, building2Z);
  box(foundationWidth, foundationHeight, foundationDepth);
  pop();

  //grey part 2

  push();
  fill(pavementColor);
  translate(building2X, building2Y, building2Z - 8.75);
  box(
    foundationWidth / (foundationWidth / 105),
    foundationHeight + 2,
    foundationDepth / 2 + 12.5
  );
  pop();

  // green part 2
  push();
  fill(grassColor);
  translate(building2X, building2Y, building2Z + 43.75);
  box(
    foundationWidth / (foundationWidth / 105),
    foundationHeight + 3,
    foundationDepth / 10
  );
  pop();

  // WHITE BORDERs 2
  push();
  fill(255);
  translate(building2X + 71.25, building2Y, building2Z);
  box(foundationWidth / 20, foundationHeight + 5, foundationDepth);
  pop();

  push();
  fill(255);
  translate(building2X - 71.25, building2Y, building2Z);
  box(foundationWidth / 20, foundationHeight + 5, foundationDepth);
  pop();

  push();
  fill(255);
  translate(building2X, building2Y, building2Z - 71.25);
  box(foundationWidth, foundationHeight + 5, foundationDepth / 20);
  pop();

  push();
  fill(255);
  translate(building2X, building2Y, building2Z + 71.25);
  box(foundationWidth, foundationHeight + 5, foundationDepth / 20);
  pop();

  //building top left

  push();
  fill(b2color);
  translate(b2X, b2Y, b2Z);
  box(b2W, b2H, b2D);
  pop();

  //windows top left

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X, b2Y + i, b2Z - 33.75);
    box(25, 35, 5);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X, b2Y + i - 10, b2Z - 33.75);
  box(25, 28, 5);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X + 23.75 + 1, b2Y + i, b2Z - 33.75);
    box(12.5 + 2, 35, 5);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X + 23.75 + 1, b2Y + i - 10, b2Z - 33.75);
  box(12.5 + 2, 28, 5);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X - 23.75 - 1, b2Y + i, b2Z - 33.75);
    box(12.5 + 2, 35, 5);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X - 23.75 - 1, b2Y + i - 10, b2Z - 33.75);
  box(12.5 + 2, 28, 5);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X, b2Y + i, b2Z + 33.75);
    box(25, 35, 5);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X, b2Y + i - 10, b2Z + 33.75);
  box(25, 28, 5);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X + 23.75 + 1, b2Y + i, b2Z + 33.75);
    box(12.5 + 2, 35, 5);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X + 23.75 + 1, b2Y + i - 10, b2Z + 33.75);
  box(12.5 + 2, 28, 5);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X - 23.75 - 1, b2Y + i, b2Z + 33.75);
    box(12.5 + 2, 35, 5);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X - 23.75 - 1, b2Y + i - 10, b2Z + 33.75);
  box(12.5 + 2, 28, 5);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X - 32.5, b2Y + i, b2Z);
    box(5, 35, 25);
    pop();
  }

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X - 32.5, b2Y + i, b2Z + 27.5 + 1);
    box(5, 35, 12.5 + 2);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X - 32.5, b2Y + i - 10, b2Z + 27.5 + 1);
  box(5, 28, 12.5 + 2);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X - 32.5, b2Y + i, b2Z - 27.5 - 1);
    box(5, 35, 12.5 + 2);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X - 32.5, b2Y + i - 10, b2Z - 27.5 - 1);
  box(5, 28, 12.5 + 2);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X + 32.5, b2Y + i, b2Z);
    box(5, 35, 25);
    pop();
  }

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X + 32.5, b2Y + i, b2Z + 27.5 + 1);
    box(5, 35, 12.5 + 2);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X + 32.5, b2Y + i - 10, b2Z + 27.5 + 1);
  box(5, 28, 12.5 + 2);
  pop();

  for (var i = -122.5; i <= -72.5; i += 50) {
    push();
    fill(b4color);
    translate(b2X + 32.5, b2Y + i, b2Z - (27.5 + 1));
    box(5, 35, 12.5 + 2);
    pop();
  }

  push();
  fill(b4color);
  translate(b2X + 32.5, b2Y + i - 10, b2Z - 27.5 - 1);
  box(5, 28, 12.5 + 2);
  pop();

  //door top left

  push();
  fill("white");
  translate(b2X - 32.5, b2Y - 26, b2Z);
  box(5, 35, 35);
  pop();

  push();
  fill("white");
  translate(b2X + 32.5, b2Y - 26, b2Z);
  box(5, 35, 35);
  pop();

  //brim top left

  push();
  fill("white");
  translate(b2X - 32.5, b2Y - 150, b2Z);
  box(10, 10, 67.5 + 8);
  pop();

  push();
  fill("white");
  translate(b2X + 32.5, b2Y - 150, b2Z);
  box(10, 10, 67.5 + 8);
  pop();

  push();
  fill("white");
  translate(b2X, b2Y - 150, b2Z - 33.75);
  box(65 + 8, 10, 10);
  pop();

  push();
  fill("white");
  translate(b2X, b2Y - 150, b2Z + 33.75);
  box(65 + 8, 10, 10);
  pop();

  //foundation bottom left
  push();
  fill(foundationColor);
  translate(building3X, building3Y, building3Z);
  box(foundationWidth, foundationHeight, foundationDepth);
  pop();

  //grey part 3

  push();
  fill(pavementColor);
  translate(building3X - 8.75, building3Y, building3Z);
  box(
    foundationWidth / 2 + 12.5,
    foundationHeight + 2,
    foundationDepth / (foundationDepth / 105)
  );
  pop();

  // green part 3
  push();
  fill(grassColor);
  translate(building3X + 43.75, building3Y, building3Z);
  box(
    foundationWidth / 10,
    foundationHeight + 3,
    foundationDepth / (foundationDepth / 105)
  );
  pop();

  //white borderS
  push();
  fill(255);
  translate(building3X + 71.25, building3Y, building3Z);
  box(foundationWidth / 20, foundationHeight + 5, foundationDepth);
  pop();

  push();
  fill(255);
  translate(building3X - 71.25, building3Y, building3Z);
  box(foundationWidth / 20, foundationHeight + 5, foundationDepth);
  pop();

  push();
  fill(255);
  translate(building3X, building3Y, building3Z - 71.25);
  box(foundationWidth, foundationHeight + 5, foundationDepth / 20);
  pop();

  push();
  fill(255);
  translate(building3X, building3Y, building3Z + 71.25);
  box(foundationWidth, foundationHeight + 5, foundationDepth / 20);
  pop();

  //building bottom left

  push();
  fill(b3color);
  translate(b3X, b3Y, b3Z);
  box(b3W, b3H, b3D);
  pop();

  //windows bottom left

  push();
  fill(b4color);
  translate(b3X - 31.5, b3Y - 97.5, b3Z);
  box(5, 85, 11);
  pop();

  for (var i = -128.5; i <= -66.5; i += 31) {
    push();
    fill(b4color);
    translate(b3X - 31.5, b3Y + i, b3Z + 16);
    box(5, 23, 11);
    pop();
  }

  for (var i = -128.5; i <= -66.5; i += 31) {
    push();
    fill(b4color);
    translate(b3X - 31.5, b3Y + i, b3Z - 16);
    box(5, 23, 11);
    pop();
  }

  push();
  fill(b4color);
  translate(b3X + 31.5, b3Y - 82, b3Z);
  box(5, 116, 11);
  pop();

  for (var i = -128.5; i <= -35.5; i += 31) {
    push();
    fill(b4color);
    translate(b3X + 31.5, b3Y + i, b3Z + 16);
    box(5, 23, 11);
    pop();
  }

  for (var i = -128.5; i <= -35.5; i += 31) {
    push();
    fill(b4color);
    translate(b3X + 31.5, b3Y + i, b3Z - 16);
    box(5, 23, 11);
    pop();
  }

  push();
  fill(b4color);
  translate(b3X, b3Y - 82, b3Z - 31.5);
  box(11, 116, 5);
  pop();

  for (var i = -128.5; i <= -35.5; i += 31) {
    push();
    fill(b4color);
    translate(b3X + 16, b3Y + i, b3Z - 31.5);
    box(11, 23, 5);
    pop();
  }

  for (var i = -128.5; i <= -35.5; i += 31) {
    push();
    fill(b4color);
    translate(b3X - 16, b3Y + i, b3Z - 31.5);
    box(11, 23, 5);
    pop();
  }

  push();
  fill(b4color);
  translate(b3X, b3Y - 97.5, b3Z + 31.5);
  box(11, 85, 5);
  pop();

  for (var i = -128.5; i <= -66.5; i += 31) {
    push();
    fill(b4color);
    translate(b3X + 16, b3Y + i, b3Z + 31.5);
    box(11, 23, 5);
    pop();
  }

  for (var i = -128.5; i <= -66.5; i += 31) {
    push();
    fill(b4color);
    translate(b3X - 16, b3Y + i, b3Z + 31.5);
    box(11, 23, 5);
    pop();
  }

  //door left bottom

  push();
  fill(b4color);
  translate(b3X - 31.5, b3Y - 20, b3Z);
  box(5, 40, 32);
  pop();

  push();
  fill("white");
  translate(b3X - 31.5, b3Y - 44, b3Z);
  box(10, 8, 63);
  pop();

  push();
  fill(b4color);
  translate(b3X, b3Y - 20, b3Z + 31.5);
  box(32, 40, 5);
  pop();

  push();
  fill("white");
  translate(b3X, b3Y - 44, b3Z + 31.5);
  box(63, 8, 10);
  pop();

  //brim bottom left

  push();
  fill("white");
  translate(b3X - 32.5, b3Y - 150, b3Z);
  box(10, 10, 67.5 + 8);
  pop();

  push();
  fill("white");
  translate(b3X + 32.5, b3Y - 150, b3Z);
  box(10, 10, 67.5 + 8);
  pop();

  push();
  fill("white");
  translate(b3X, b3Y - 150, b3Z - 33.75);
  box(65 + 8, 10, 10);
  pop();

  push();
  fill("white");
  translate(b3X, b3Y - 150, b3Z + 33.75);
  box(65 + 8, 10, 10);
  pop();

  //foundation bottom right
  push();
  fill(pavementColor);
  translate(building4X, building4Y, building4Z);
  box(foundationWidth, foundationHeight, foundationDepth);
  pop();

  // green part 4

  push();
  fill(grassColor);
  translate(building4X, building4Y, building4Z + 43.75);
  box(
    foundationWidth / (foundationWidth / 105),
    foundationHeight + 3,
    foundationDepth / 10
  );
  pop();

  push();
  fill(grassColor);
  translate(building4X, building4Y, building4Z - 43.75);
  box(
    foundationWidth / (foundationWidth / 105),
    foundationHeight + 3,
    foundationDepth / 10
  );
  pop();

  //white borders
  push();
  fill(255);
  translate(building4X + 71.25, building4Y, building4Z);
  box(foundationWidth / 20, foundationHeight + 5, foundationDepth);
  pop();

  push();
  fill(255);
  translate(building4X - 71.25, building4Y, building4Z);
  box(foundationWidth / 20, foundationHeight + 5, foundationDepth);
  pop();

  push();
  fill(255);
  translate(building4X, building4Y, building4Z - 71.25);
  box(foundationWidth, foundationHeight + 5, foundationDepth / 20);
  pop();

  push();
  fill(255);
  translate(building4X, building4Y, building4Z + 71.25);
  box(foundationWidth, foundationHeight + 5, foundationDepth / 20);
  pop();

  //building bottom right

  push();
  fill(windowColor);
  translate(b4X, b4Y, b4Z);
  box(b4W, b4H, b4D);
  pop();

  //windows bottom right

  push();
  fill(b4color);
  translate(b4X, b4Y - 25, b4Z + 30);
  box(25, 30, 5);
  pop();

  push();
  fill(b4color);
  translate(b4X + 30, b4Y - 25, b4Z + 30);
  box(25, 30, 5);
  pop();

  push();
  fill(b4color);
  translate(b4X - 30, b4Y - 25, b4Z + 30);
  box(25, 30, 5);
  pop();

  push();
  fill(b4color);
  translate(b4X, b4Y - 25, b4Z - 30);
  box(25, 30, 5);
  pop();

  push();
  fill(b4color);
  translate(b4X + 30, b4Y - 25, b4Z - 30);
  box(25, 30, 5);
  pop();

  push();
  fill(b4color);
  translate(b4X - 30, b4Y - 25, b4Z - 30);
  box(25, 30, 5);
  pop();

  push();
  fill(b4color);
  translate(b4X + 47.5, b4Y - 25, b4Z);
  box(5, 30, 40);
  pop();

  push();
  fill(b4color);
  translate(b4X - 47.5, b4Y - 34.5, b4Z);
  box(5, 10, 50);
  pop();

  // door bottom right

  push();
  fill(b4color);
  translate(b4X - 47.5, b4Y - 10, b4Z);
  box(5, 30, 20);
  pop();

  pop();
}

function mousePressed() {
  mouseClick = true;
}

function mouseReleased() {
  mouseClick = false;
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    zPosCam -= 50;
    z -= 50;
  }

  if (keyCode == DOWN_ARROW) {
    zPosCam += 50;
    z += 50;
  }

  if (keyCode == LEFT_ARROW) {
    xPosCam -= 50;
  }

  if (keyCode == RIGHT_ARROW) {
    xPosCam += 50;
  }

  if (key == "a") {
    ry += 10;
  }

  if (key == "d") {
    ry -= 10;
  }
  if (key == "w") {
    rx -= 20;
  }
  if (key == "s") {
    rx += 20;
  }
  
  if (key == "p") {
    yPosCam -= 20;
    y -= 20;
  }
  
  if (key == "o") {
    yPosCam += 20;
    y+= 20;
  }
}

function drawGrid() {
  stroke(200);
  fill(120);
  for (var x = -width; x < width; x += 40) {
    line(x, -height, x, height);
    text(x, x + 1, 12);
  }
  for (var y = -height; y < height; y += 40) {
    line(-width, y, width, y);
    text(y, 1, y + 12);
  }
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
