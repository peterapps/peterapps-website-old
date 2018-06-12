window.onload=function(){


var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

document.title = "Jetpack Face";

canvas.style.width = window.innerWidth.toString() + "px";
canvas.style.height = window.innerHeight.toString() + "px";

window.addEventListener("orientationchange", function(){
    canvas.style.width = window.innerWidth.toString() + "px";
    canvas.style.height = window.innerHeight.toString() + "px";
}, false);

function backgroundColor(x){
    c.fillStyle=x;
    c.fillRect(0,0,500,300);
}

score = 0;
health = 1;
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame || 
                            function(x){
                                setTimeout(x, 1000/60);        
                            };
function cls(){
    backgroundColor("green");
    gr();
    c.fillStyle = "black";
    c.font='20px Arial';
    c.fillText("Score: " + score.toString(), 10, 280);
    c.fillText("Health: " + health.toString(), 410, 280);
}

function button(x,y,w,h,a){
    window.addEventListener("mousedown", doMouseDown, false);
    window.addEventListener("touchstart", doMouseDown, false);
    function doMouseDown(event) {
        var widthDifference = window.innerWidth / canvas.width;
        var heightDifference = window.innerHeight / canvas.height;
        var xPos, yPos;
        if (event.pageX){
            xPos = event.pageX;
            yPos = event.pageY;
        } else {
            xPos = event.touches[0].pageX;
            yPos = event.touches[0].pageY;
        }
        xPos = xPos / widthDifference;
        yPos = yPos / heightDifference;
        var buttonObj = {"x":x,"y":y,"width":w,"height":h};
        var touchObj = {"x":xPos,"y":yPos,"width":0,"height":0};
        if (collision(buttonObj,touchObj) === true){
            a();
            window.removeEventListener("mousedown", doMouseDown, false);
            window.removeEventListener("touchstart", doMouseDown, false);
        }
    }
}

function wr(txt, x, y){
    c.fillStyle = "black";
    c.fillText(txt, x, y);
}

function getRandomInt(upperLimit){
    return (Math.floor(Math.random()*upperLimit) + 1);
}

document.ontouchstart = function(e){ 
    e.preventDefault(); 
};

function gr(){
    c.fillStyle = "brown";
    c.fillRect(0,250,500,50);
}

timeOfPlaying = 0;
newBox = false;
boxes = [];
touchPos = false;
spritePos = 225;
timeOfTop = 0;
spriteColor = "yellow";
spriteRate = 2;
spriteLand = 2;
boxRate = 2;
powerups = [];
timeOfPowerup = 0;
currentPowerup = false;
ninjaPowerup = false;
laserPowerup = false;
powerup3 = false;
boxNumber = 100;
boxColor = "gray";
boxDamage = 1;
jetpackFaceX = false;
scoreRate = 1;

function newPowerup(){
    var r = getRandomInt(8);
    if (r == 1){
        powerups.push({"x":500,"y":getRandomInt(200),
                       "width":40,"height":40,"name":"powerup",
                   "img":document.getElementById("powerup")});
    } else if (r == 2){
        powerups.push({"x":500,"y":getRandomInt(200),
                       "width":40,"height":40,"name":"health",
                   "img":document.getElementById("health")});
    } else if (r == 3){
        powerups.push({"x":500,"y":getRandomInt(200),
                       "width":40,"height":40,"name":"ice",
                   "img":document.getElementById("ice")});
    } else if (r == 4){
        powerups.push({"x":500,"y":getRandomInt(200),
                       "width":40,"height":40,"name":"fire",
                   "img":document.getElementById("fire")});
    } else if (r == 5){
        powerups.push({"x":500,"y":getRandomInt(200),
                       "width":40,"height":40,"name":"ninja",
                   "img":document.getElementById("ninja")});
    } else if (r == 6){
        powerups.push({"x":500,"y":getRandomInt(200),
                       "width":40,"height":40,"name":"laser",
                   "img":document.getElementById("laser")});
    } else if (r == 7){
        powerups.push({"x":500,"y":getRandomInt(200),
                       "width":40,"height":40,"name":"powerup2",
                   "img":document.getElementById("powerup2")});
    } else {
        powerups.push({"x":500,"y":getRandomInt(200),
                       "width":40,"height":40,"name":"powerup3",
                   "img":document.getElementById("powerup3")});
    }
}

window.addEventListener("touchstart",twoTouches,false);
window.addEventListener("contextmenu",function(event){
    event.preventDefault();
    event.touches = [1,2,3];
    twoTouches(event);
},false);
window.addEventListener("mousedown",function(event){
    if (!event.touches){
        event.touches = [1];
        twoTouches(event);
    }
},false);

function jetpackFacePowerup3(event){
    var widthDifference = window.innerWidth / canvas.width;
    var heightDifference = window.innerHeight / canvas.height;
    var xPos, yPos;
    if (event.pageX){
        xPos = event.pageX;
        yPos = event.pageY;
    } else {
        xPos = event.touches[0].pageX;
        yPos = event.touches[0].pageY;
    }
    xPos = xPos / widthDifference;
    yPos = yPos / heightDifference;
    for (var i = 0; i < boxes.length; i++){
        var boxCoord = {"x":boxes[i].x,"y":boxes[i].y,
                        "width":30,"height":70};
        if (collision(boxCoord,{"x":xPos,"y":yPos,
                                "width":50,"height":50})){
            boxColor = "#99FFFF";
            drawBox(boxes[i].x,boxes[i].y);
            boxes.splice(i,1);
            boxColor = "gray";
        }
    }
}

function twoTouches(event){
    if(event.touches.length == 2){
        spriteRate = 4;
        spriteLand = 4;
        scoreRate = 3;
        if(!currentPowerup || boxColor !== "#33CCFF" || boxColor !== "red" || !ninjaPowerup || !laserPowerup || !powerup3){
            boxNumber = 70;
            boxRate = 3;
            spriteColor = "red";
        }
    } else if(event.touches.length == 3){
        spriteRate = 8;
        spriteLand = 10;
        scoreRate = 6;
        if(!currentPowerup || boxColor !== "#33CCFF" || boxColor !== "red" || !ninjaPowerup || !laserPowerup || !powerup3){
            boxNumber = 50;
            boxRate = 5;
            spriteColor = "#606060";
        }
    } else if (event.touches.length == 1){
        spriteRate = 2;
        spriteLand = 2;
        scoreRate = 1;
        if(!currentPowerup || boxColor !== "#33CCFF" || boxColor !== "red" || !ninjaPowerup || !laserPowerup || !powerup3){
            boxNumber = 100;
            boxRate = 2;
            spriteColor = "orange";
        }
    }
}

function sprite(){
    c.beginPath();
    c.arc(250, spritePos, 20, 0, 2 * Math.PI);
    c.closePath();
    c.stroke();
    c.fillStyle = spriteColor;
    c.fill();
    c.drawImage(document.querySelector("img"),225,(spritePos - 25),50,50);
}

function drawBox(x,y){
    c.fillStyle = boxColor;
    c.fillRect(x,y,30,70);
}

function collision(object1, object2){
    if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
		object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
            // The objects are touching
        return true;
    } else {
        return false;
    }
}

window.addEventListener("touchstart", touchPosTrue, false);
window.addEventListener("touchend", touchPosFalse, false);

window.addEventListener("mousedown", touchPosTrue, false);
window.addEventListener("mouseup", touchPosFalse, false);

function touchPosTrue(){touchPos = true;}
function touchPosFalse(){touchPos = false;}

start();
function start(){
    cls();
    spriteColor = "yellow";
    sprite();
    c.fillStyle = "black";
    c.font='30px Arial';
    c.fillText("TAP TO START", 150, 150);
    button(0,0,500,300,play);
    c.font='20px Arial';
    c.fillText("Avoid the boxes.", 180, 185);
    timeOfPlaying = 0;
    newBox = false;
    boxes = [];
    touchPos = false;
    spritePos = 225;
    timeOfTop = 0;
    spriteRate = 2;
    spriteLand = 2;
    boxRate = 2;
    powerups = [];
    timeOfPowerup = 0;
    boxNumber = 100;
    score = 0;
    health = 1;
    boxColor = "gray";
    boxDamage = 1;
    currentPowerup = false;
    ninjaPowerup = false;
    laserPowerup = false;
    powerup3 = false;
    jetpackFaceX = false;
    scoreRate = 1;
}
function play(){
    cls();
    sprite();
    requestAnimationFrame(box);
}

function box(){
    var done = false;
    if (currentPowerup){
        boxRate = 1;
    }
    if (boxColor == "#33CCFF"){
        spriteColor = "#33CCFF";
    }
    if (boxColor == "red"){
        spriteColor = "#FF6600";
    }
    if (currentPowerup){
        spriteColor = "blue";
    }
    if (ninjaPowerup){
        spriteColor = "#111111";
    }
    if (laserPowerup){
        spriteColor = "#FF3333";
    }
    if (powerup3){
        spriteColor = "#99FFFF";
    }
    if (timeOfTop == 1){
        alert("Don't hang out at the top!");
        spritePos = 200;
        touchPos = false;
    }
    if ((timeOfPlaying % 1000) === 0 && timeOfPlaying >= 600){
        newPowerup();
    }
    if ((timeOfPlaying % boxNumber) === 0 && timeOfPlaying > 1){
        newBox = true;
    } else {
        c.fillStyle = "black";
        c.font='30px Arial';
        c.fillText("Tap to jump", 200, 30);
    }
    if (newBox === true){
        var yCoord = getRandomInt(200);
        drawBox(500,yCoord);
        boxes.push({"x":500,"y":yCoord});
        newBox = false;
    }
    if (touchPos === true){
        if (spritePos > -5){
            spritePos -= spriteRate;
            timeOfTop = 0;
        } else if (timeOfTop <= 0){
            timeOfTop = 180;
        }
    } else {
        if (!currentPowerup || boxColor !== "#33CCFF"){
            spriteColor = "yellow";
        }
        if (boxColor == "#33CCFF"){
            spriteColor = "#33CCFF";
        }
        if (boxColor == "red"){
            spriteColor = "#FF6600";
        }
        if (currentPowerup){
            spriteColor = "blue";
            boxNumber = 300;
        }
        if (ninjaPowerup){
            spriteColor = "#111111";
        }
        if (laserPowerup){
            spriteColor = "#FF3333";
        }
        if (powerup3){
            spriteColor = "#99FFFF";
        }
        if (spritePos < 224){
            spritePos += spriteLand;
            timeOfTop = 0;
        } else if (spritePos == 224){
            spritePos++;
            timeOfTop = 0;
        }
    }
    if (boxes.length > 0){
        cls();
        sprite();
    }
    if (ninjaPowerup){
        boxRate = 10;
        boxNumber = 10;
    }
    for (var b = 0; b < boxes.length; b++){
        boxes[b].x -= boxRate;
        drawBox(boxes[b].x, boxes[b].y);
        var spriteCoord = {"x":230,"y":spritePos-20,
                           "width":40,"height":40};
        var boxCoord = {"x":boxes[b].x,"y":boxes[b].y,
                        "width":30,"height":70};
        if (collision(spriteCoord, boxCoord) === true){
            health -= boxDamage;
            boxes[b].x = -40;
            if (spriteColor == "#33CCFF" || spriteColor == "#FF6600"){
                score += 500;
            }
        }
        if (boxes[b].x < -30){
            boxes.splice(b, 1);
        }
    }
    for (var i = 0; i < powerups.length; i++){
        powerups[i].x -= 4;
        var powerup = powerups[i];
        c.drawImage(powerup.img, powerup.x, powerup.y,
                    powerup.width, powerup.width);
        var spriteCoord2 = {"x":230,"y":spritePos-20,
                           "width":40,"height":40};
        if (collision(spriteCoord2,powerup) === true && powerup.name == "powerup"){
            score += 1000;
            boxRate = 1;
            boxNumber = 300;
            timeOfPowerup = 600;
            spriteColor = "blue";
            powerups[i].x = -40;
            currentPowerup = true;
        } else if (collision(spriteCoord2,powerup) === true && powerup.name == "health"){
            score += 500;
            health++;
            powerups[i].x = -40;
        } else if (collision(spriteCoord2,powerup) === true && powerup.name == "ice"){
            score += 1000;
            powerups[i].x = -40;
            timeOfPowerup = 600;
            spriteColor = "#33CCFF";
            powerups[i].x = -40;
            boxColor = "#33CCFF";
            boxDamage = 0;
        } else if (collision(spriteCoord2,powerup) === true && powerup.name == "fire"){
            score += 1000;
            powerups[i].x = -40;
            timeOfPowerup = 600;
            spriteColor = "#FF6600";
            powerups[i].x = -40;
            boxColor = "red";
            boxDamage = 0;
        } else if (collision(spriteCoord2,powerup) === true && powerup.name == "ninja"){
            score += 2000;
            powerups[i].x = -40;
            timeOfPowerup = 400;
            spriteColor = "#111111";
            powerups[i].x = -40;
            boxDamage = 0;
            boxRate = 10;
            boxNumber = 10;
            ninjaPowerup = true;
        } else if (collision(spriteCoord2,powerup) === true && powerup.name == "laser"){
            score += 2000;
            powerups[i].x = -40;
            timeOfPowerup = 500;
            spriteColor = "#FF3333";
            powerups[i].x = -40;
            boxDamage = 0;
            laserPowerup = true;
        } else if (collision(spriteCoord2,powerup) === true && powerup.name == "powerup2"){
            score += 5000;
            powerups[i].x = -40;
            newPowerup();
            newPowerup();
            newPowerup();
            newPowerup();
        } else if (collision(spriteCoord2,powerup) === true && powerup.name == "powerup3"){
            score += 2000;
            powerups[i].x = -40;
            timeOfPowerup = 600;
            spriteColor = "#99FFFF";
            powerup3 = true;
            window.addEventListener("touchstart",
                                    jetpackFacePowerup3, false);
            window.addEventListener("mousedown",
                                    jetpackFacePowerup3, false);
        }
        if (powerups[i].x < -40){
            powerups.splice(i, 1);
        }
    }
    if (ninjaPowerup === true){
        for (var e = 0; e < 10; e++){
            var ninjaPowerupX = getRandomInt(500);
            var ninjaPowerupY = getRandomInt(250);
            c.drawImage(document.getElementById("ninja"),
                        ninjaPowerupX,ninjaPowerupY,40,40);
        }
        if (timeOfPowerup > 60){
            spritePos = 100;
        } else {
            boxRate = 2;
            boxNumber = 100;
            boxes.pop();
            boxes.pop();
        }
    }
    if (laserPowerup === true){
        var laserPowerupX = 120;
        if (timeOfPowerup < 60){
            laserPowerupX = timeOfPowerup + 60;
        }
        var spriteCoord3 = {"x":250 - laserPowerupX,"y":spritePos-laserPowerupX,
                           "width":laserPowerupX*2,"height":laserPowerupX*2};
        for (b = 0; b < boxes.length; b++){
            var boxCoord2 = {"x":boxes[b].x,"y":boxes[b].y,
                            "width":30,"height":70};
            if (collision(spriteCoord3, boxCoord2) === true){
                boxColor = "red";
                drawBox(boxes[b].x, boxes[b].y);
                boxColor = "gray";
                boxes.splice(b,1);
            }
        }
        c.beginPath();
        c.arc(250, spritePos, laserPowerupX, 0, 2 * Math.PI);
        c.closePath();
        c.stroke();
        c.fillStyle = "rgba(255, 0, 0, 0.5)";
        c.fill();
        
    }
    if (powerup3 === true){
        for (var v = 0; v < boxes.length; v++){
            for (var r = 0; r < 10; r++){
                var powerupX = getRandomInt(60) + boxes[v].x - 30;
                var powerupY = getRandomInt(100) + boxes[v].y - 30;
                c.drawImage(document.getElementById("powerup3"),
                            powerupX,powerupY,40,40);
            }
        }
    }
    if (timeOfPowerup == 1){
        boxRate = 2;
        boxNumber = 100;
        spriteColor = "yellow";
        boxColor = "gray";
        boxDamage = 1;
        currentPowerup = false;
        ninjaPowerup = false;
        laserPowerup = false;
        powerup3 = false;
        window.removeEventListener("touchstart",
                                jetpackFacePowerup3, false);
        window.removeEventListener("mousedown",
                                jetpackFacePowerup3, false);
    } else if (timeOfPowerup > 1){
        c.fillStyle = "blue";
        c.font='30px Arial';
        c.fillText("POWERUP", 150, 40);
        c.font='15px Arial';
        c.fillText("TIME LEFT OF POWERUP: " +  (Math.floor(timeOfPowerup/60)+1).toString() , 130, 280);
    }
    timeOfPlaying++;
    timeOfTop -= 1;
    timeOfPowerup -= 1;
    score += scoreRate;
    if (health > 0){
        requestAnimationFrame(box);
    } else {
        gameDone();
    }
}

function gameDone(){
    backgroundColor("black");
    c.fillStyle = "red";
    c.font='30px Arial';
    c.fillText("Game over", 200, 150);
    c.font='20px Arial';
    c.fillText("Your score was: " + score, 195, 195);
    if (jetpackFaceX){
        c.fillStyle = "red";
        c.fillText("Hacked", 10, 25);
    }
    c.fillStyle = "yellow";
    c.fillRect(150,200,250,100);
    button(150,200,250,100,start);
    c.fillStyle = "black";
    c.font='20px Arial';
    c.fillText("Tap to Try Again", 210, 230);
    spritePos = 225;
    score = 0;
    health = 1;
}


}