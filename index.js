// Import stylesheets
import './style.css';

let cvsgame = document.getElementById("game");
let ctxG = cvsgame.getContext("2d");

let canvasbg = document.getElementById("bg");
let ctx = canvasbg.getContext("2d");


let sdDie = document.getElementById("c1");
let sdH1 = document.getElementById("a1");
let sdH2 = document.getElementById("a2");
let sdH3 = document.getElementById("a3");
let sdH4 = document.getElementById("a4");
let sdH5 = document.getElementById("a5");

let sdP1 = document.getElementById("b1");
let sdP2 = document.getElementById("b2");
let sdP3 = document.getElementById("b3");
let sdP4 = document.getElementById("b4");
let sdP5 = document.getElementById("b5");


let score = 0;
let lives = 1;

// GUUN
let gX = 50;
let gY = 350;
let gA = 0;
let angle = 0;

let running = false;
let timer = 0;

let fly = new Audio();
let boom = new Audio();

document.onkeydown = pressedKey;
document.onkeyup = releasedKey;


let tik = 0;
let enemyarr = [];
let bulletarr = [];
let addscore = false;



drawBG();
ready();

function drawBG() {
  let imageBG = new Image();
  imageBG.src = 'https://raw.githubusercontent.com/yuko70/tia-skuska2/master/spacebg.jpg';
  ctx.drawImage(imageBG, 0, 0, canvasbg.width, canvasbg.height);
}

function ready() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Press Enter to start", 300, 300); 
}

function pressedKey(ev) {
  let event = window.event ? window.event : ev;

  if (event.keyCode == '37') {
    // console.log("left"); 
    angle = -2;
  }
  else if (event.keyCode == '39') {
    // console.log("right"); 
    angle = 2;
  }
  else if (event.keyCode == '13' && running === false) {
    // console.log("enter"); 
    drawBG();
    start();
  }

}

function releasedKey(ev) {
  let event = window.event ? window.event : ev;
  if (event.keyCode == '32') {
    // console.log("space");
    createEnemy();
  }
  else if (event.keyCode == '37') {
    // console.log("left"); 
    angle = 0;
  }
  else if (event.keyCode == '39') {
    // console.log("right"); 
    angle = 0;
  }

}

function start() {
  running = true;
  timer = new Date().getTime();
  score = 0;
  requestAnimationFrame(update);
  // pipearr = [];
  // pipearr[0] = {
  //     x : 400,
  //     y : 200
  // };
  timer = 0;
  lives = 3;
  gA = 0;
  addscore = false;
  ctx.beginPath();
  ctx.moveTo(0, 550);
  ctx.lineTo(800, 550);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.stroke(); 
}

function ulives() {

  if (lives === 0) {
    sdDie.play();
    running = false;
    ctxG.font = "30px Arial";
    ctxG.fillText("You DIE", 80, 390);
    ctxG.fillText("Your score: " + score, 80, 430);
    ctxG.fillText("Press Enter to start", 80, 470); 
  }
}


function createEnemy() {
  let w = 25;
  let h = 25
  let eX = Math.floor(Math.random() * (800-w/2)) + w/2; 
  let eY = h/2;

  enemyarr.push({
        x : eX,
        y : eY
        });
}

function createBullet() {
  bulletarr.push({
        sx : 400 + 25 /2,
        sy : 520 + 75 /2,
        cx : Math.cos(angle * Math.PI / 180),
        cy : Math.sin(angle * Math.PI / 180)

        });
}




let tik = 0;
let enemyarr = [];
let addscore = false;


function update(){
  if (new Date().getTime() - timer > 80) {
    timer = new Date().getTime();
    tik += 1;
  }

  ctxG.clearRect(0, 0, cvsgame.width, cvsgame.height);

  gA += angle;

  ctxG.save();
    ctxG.beginPath();
    ctxG.translate( 400 + 25 /2, 520 + 75 /2);
    ctxG.rotate(gA * Math.PI / 180);
    ctxG.rect(-25/2, -75/2, 25, 75); 
    ctxG.fillStyle = "#FFFFFF";
    ctxG.fill();
    // ctxG.stroke();
  ctxG.restore();


  // create enemies
  if (new Date().getTime() - timer > 1000) {
    console.log("create enemy");
  }





  ctxG.font = "30px Arial";
  ctxG.fillStyle = "white";
  ctxG.fillText("SCORE: " + score, 10, 35);

  ulives();

  if (running) {
    requestAnimationFrame(update);
  }
  
    
}