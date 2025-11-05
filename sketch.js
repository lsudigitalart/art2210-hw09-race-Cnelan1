let racers = [];
let finish = 700;
let gameOver = false;
let winner;
let boostedRacer;
let boostTime = 0;
let randomBoost;
let img;

let palette = []; // color palette

function setup() {
createCanvas(800, 400);
img = loadImage('CrossBG.jpg')
img2 = loadImage('RaceLine.png')

// pastels
palette = [
color(255,153,153), // red
color(255,204,153), // orange
color(255,255,153), // yellow
color(204,255,153), // green
color(153,255,204), // teal
color(153,204,255), // blue
color(153,153,255), // blurple
color(204,153,255), //purple
color(255,253,255) //pink

];

startRace();
}

function draw() {
background(220);

image(img,0,0);
image(img2,0,0);

stroke(0);
line(finish, 0, finish, height);


for (let r of racers) {
r.display();
if (!gameOver) r.move();
}


if (!gameOver && boostTime <= 0 && random() < 0.02) {
boostedRacer = random(racers);
boostTime = 30;
}

if (boostTime > 0 && boostedRacer) {
boostedRacer.x += random(4, 9);
boostTime--;
}


for (let r of racers) {
if (r.x > finish && !gameOver) {
gameOver = true;
winner = r;
}
}
}

function mousePressed() {
startRace();
}

function startRace() {
racers = [];
gameOver = false;
winner = null;
boostedRacer = null;
boostTime = 0;

let shapes = ["circle", "square", "triangle", "pentagon"];
randomBoost = int(random(shapes.length)); 

for (let i = 0; i < shapes.length; i++) {
let r = new Racer();
let col = random(palette);
let y = 100 + i * 70;
let lucky = i === randomBoost;
let baseSpeed = random(1, 4);
r.setupRacer(shapes[i], col, y, lucky, baseSpeed);
racers.push(r);
}
}

class Racer {
setupRacer(shape, col, y, lucky, baseSpeed) {
this.shape = shape;
this.col = col;
this.y = y;
this.x = 50;
this.lucky = lucky;
this.size = 40;
this.baseSpeed = baseSpeed;
}

move() {
let s = this.baseSpeed + random(0, 1);
if (this.lucky) s += 1;
this.x += s;
}

display() {
fill(this.col);
strokeWeight(2);
push();
translate(this.x, this.y);

if (this.shape == "circle") {
ellipse(0, 0, this.size);
} else if (this.shape == "square") {
rectMode(CENTER);
rect(0, 0, this.size, this.size);
} else if (this.shape == "triangle") {
triangle(-20, 20, 0, -20, 20, 20);
} else if (this.shape == "pentagon") {
beginShape();
for (let i = 0; i < 5; i++) {
let a = TWO_PI * i / 5 - PI / 2;
vertex(cos(a) * 20, sin(a) * 20);
}
endShape(CLOSE);
}

pop();
}
}
