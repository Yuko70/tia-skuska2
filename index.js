// Import stylesheets
import './style.css';

let cvsgame = document.getElementById("game");
let ctxG = cvsgame.getContext("2d");

let canvasbg = document.getElementById("bg");
let ctx = canvasbg.getContext("2d");


let sdDie = document.getElementById("c1");
let sdHIndex = 1;
let sdPIndex = 1;

function playHit() {
  let sound = document.getElementById("a" + sdHIndex);
  sdHIndex += 1;
  if (sdHIndex > 5) sdHIndex = 1;
  sound.play();
}

function playPoint() {
  let sound = document.getElementById("b" + sdPIndex);
  sdPIndex += 1;
  if (sdPIndex > 5) sdPIndex = 1;
  sound.play();
}


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
let speed = 2;

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
    createBullet();
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
  enemyarr = [];
  bulletarr = [];
  enemyindex = [];
  bulletindex = [];
  createEnemy();
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
  let eX = Math.floor(Math.random() * (800-w/2)); 
  let eY = h/2;

  enemyarr.push({
        x : eX,
        y : eY
        });
}

function createBullet() {
  playHit();
  bulletarr.push({
        sx : 400 + 25 /2,
        sy : 520 + 75 /2,
        cx : Math.sin(gA * Math.PI / -180),
        cy : Math.cos(gA * Math.PI / 180)
        });
  console.log(bulletarr);
}

let tik = 0;
let enemyarr = [];
let addscore = false;
let enemyator = 0;

let enemyindex = [];
let bulletindex = [];

function update(){
  if (new Date().getTime() - timer > 100) {
    timer = new Date().getTime();
    tik += 1;
    enemyator++;
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
  ctxG.restore();

  // create enemies
  if (enemyator > 12) {
    enemyator = 0;
    createEnemy();
  }
  // painting enemies, moving enemies
  for (let i = 0; i < enemyarr.length; i++) {
    ctxG.beginPath();
    ctxG.rect(enemyarr[i].x, enemyarr[i].y, 25, 25); 
    ctxG.fillStyle = "#FFFFFF";
    ctxG.fill();
    enemyarr[i].y += 1;
    if (enemyarr[i].y >= 525) {
      lives--;
    }
  }

  // bullets  

    for (let j = 0; j < bulletarr.length; j++) {
      ctxG.beginPath();
      ctxG.rect(bulletarr[j].sx, bulletarr[j].sy, 25, 25); 
      bulletarr[j].sx -= bulletarr[j].cx * speed;
      bulletarr[j].sy -= bulletarr[j].cy * speed;
      ctxG.fillStyle = "#FF0000";
      ctxG.fill();
    }
  

  //kolizie
  for (let i = 0; i < enemyarr.length; i++) {
      for (let j = 0; j < bulletarr.length; j++) {
        if ( (enemyarr[i].x < bulletarr[j].sx + 25) &&
             (enemyarr[i].y < bulletarr[j].sy + 25) &&
             (enemyarr[i].x + 25 > bulletarr[j].sx) &&
             (enemyarr[i].y + 25 > bulletarr[j].sy) ) {
          
          // console.log("mame HIiiT");
          // enemyindex.push(i);
          // bulletindex.push(j);
          enemyarr.splice(i, 1);
          bulletarr.splice(j, 1);
          score++;

          playPoint();
        }
      }
  }
 
  ctxG.font = "30px Arial";
  ctxG.fillStyle = "white";
  ctxG.fillText("SCORE: " + score, 10, 35);

  ulives();

  if (running) {
    requestAnimationFrame(update);
  }
  
    
}