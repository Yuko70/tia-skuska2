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


let gX = 50;
let gY = 350;
let gA = 0;

let running = false;
let timer = 0;

let fly = new Audio();
let boom = new Audio();

document.onkeydown = pressedKey;


drawBG();
ready();

function drawBG() {
  
  let imageBG = new Image();
  imageBG.src = 'https://raw.githubusercontent.com/yuko70/tia-skuska2/master/spacebg.jpg';
  ctx.drawImage(imageBG, 0, 0, canvasbg.width, canvasbg.height);
}

function ready() {
  ctx.font = "30px Arial";
  ctx.fillText("Press Enter to start", 80, 350); 
}

function pressedKey(ev) {
  let event = window.event ? window.event : ev;

  if (event.keyCode == '38') {
    // console.log("up"); 
    if (bY >= 10) {
      bY -= 10;
      sdWing.play();
    }
  }
  else if (event.keyCode == '40') {
    // console.log("down"); 
    if (bY <= 700-36) {
      bY += 10;
      sdSwoosh.play();
    }
  }
  else if (event.keyCode == '13' && running === false) {
    // console.log("enter");
    drawBG();
    start();
  }
  
}

function start() {
  running = true;
  timer = new Date().getTime();
  score = 0;
  requestAnimationFrame(update);
  pipearr = [];
  pipearr[0] = {
      x : 400,
      y : 200
  };
  timer = 0;
  lives = 3;
  bX = 50;
  bY = 350; 
  addscore = false;
}

function ulives() {

  let xliv = 280;
  let yliv = 10;
  for (let i = 0; i < lives; i++) {
    ctxG.drawImage(bird, xliv, yliv);
    xliv += 40;
  }
  if (lives === 0) {
    sdDie.play();
    running = false;
    ctxG.font = "30px Arial";
    ctxG.fillText("You DIE", 80, 390);
    ctxG.fillText("Your score: " + score, 80, 430);
    ctxG.fillText("Press Enter to start", 80, 470); 
  }
}





let tik = 0;
let collide = false;

let pipearr = [];
let addscore = false;

function update(){
  if (new Date().getTime() - timer > 80) {
    timer = new Date().getTime();
    tik += 1;
    // console.log(tik);
  }

  ctxG.clearRect(0, 0, cvsgame.width, cvsgame.height);
  

  for (let i = 0; i < pipearr.length; i++) {

    if (pipearr[i].x === -53) {
      pipearr.shift();
    }

    // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);  
    ctxG.drawImage(pipeUp, 0, 0, 52, 500, pipearr[i].x, -500+pipearr[i].y, 52, 500);
    ctxG.drawImage(pipeMiddle, 0, 0, 52, 200, pipearr[i].x, pipearr[i].y + space, 52, 200);
    ctxG.drawImage(pipeDown, 0, 0, 52, 500, pipearr[i].x, pipearr[i].y + space +200+ space, 52, 500);

    pipearr[i].x--;

    if (pipearr[i].x === 200) {
      pipearr.push({
        x : 400,
        y : Math.floor(Math.random() * 200) + 10  
        });
    }


    // colisions
    if (bX + 35 >= pipearr[i].x && 
        bX <= pipearr[i].x + 50 && 
       (bY <= pipearr[i].y || (bY >= pipearr[i].y + space && bY <= pipearr[i].y + space + 200) || bY >= pipearr[i].y + space + 200 + space-25) && collide === false 
       ) {
         collide = true;
         lives--;
           sdHit.play();
    }
    else {
      if (bX >= pipearr[i].x+52 ) {
        collide = false;
      }
      if (bX >= pipearr[i].x+52 && bX <= pipearr[i].x+53 && addscore === false && collide !== true) {
        score += 5;
        addscore = true;
      }

      if (bX >= pipearr[i].x+53) {
        addscore = false;
      }

    }

  }


  ctxG.font = "30px Arial";
  ctxG.fillText("SCORE: " + score, 10, 35);
  ctxG.drawImage(bird, bX, bY);

  ulives();

  if (running) {
    requestAnimationFrame(update);
  }
  
    
}