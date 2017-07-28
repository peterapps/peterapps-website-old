window.addEventListener("load", init);

//Global variables
var canvas, ctx, players, cpuPlayer;
var itemImg;
var items = [];
var lastItem = 0;

//Useful functions
function cls(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function write(str, x, y){
	ctx.fillStyle = "black";
	var lines = str.split("\n");
	for (var i = 0; i < lines.length; i++){
		ctx.fillText(lines[i], x, y + (50 * i));
	}
}

function toTime(n){
	var seconds = (n / 60).toFixed(1);
	var minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;
	return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

//Gameplay
function init(){
	canvas = document.getElementsByTagName("canvas")[0];
	ctx = canvas.getContext("2d");
	ctx.font = "50px Impact";
	players = new Players(canvas);
	itemImg = document.querySelector("img[src=\"./img/idball.png\"]");
	launch();
}

function launch(){ //Launch screen
	players = new Players(canvas);
	items = [];
	//Clear
	cls();
	//Start text
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "100px Impact";
	write("Zak Attack", canvas.width/2, 100);
	ctx.font = "50px Impact";
	write("PRESS [ENTER] TO START", canvas.width/2, 300);
	//Instructions
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	write("Zach controls:\nWASD to move\nSPACE to attack\n\nPress 1 to toggle AI", 100, 400);
	ctx.textAlign = "right";
	write("Zak controls:\nARROWS to move\nENTER to attack\n\nPress 2 to toggle AI", canvas.width - 100, 400);
	//CPU player instructions
	cpuPlayer = [null, false, false];
	ctx.textAlign = "center";
	//Draw images
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.drawImage(document.querySelector("img[src=\"./img/zach-logo.png\"]"), 100, 100, 300, 300);
	ctx.strokeRect(100, 100, 300, 300);
	ctx.drawImage(document.querySelector("img[src=\"./img/zak-logo.png\"]"), canvas.width - 100 - 300, 100, 300, 300);
	ctx.strokeRect(canvas.width - 100 - 300, 100, 300, 300);
	//Wait for keypress
	document.addEventListener("keypress", begin);
	function begin(event){
		if (event.keyCode == 49 || event.keyCode == 50) { //Make P1/P2 a CPU
			var num = event.keyCode - 48;
			cpuPlayer[num] = !cpuPlayer[num];
			ctx.clearRect(0, canvas.height - 150, canvas.width, canvas.height - 150);
			write("Zach is a " + (cpuPlayer[1] ? "AI" : "human") + " player.\nZak is a " + (cpuPlayer[2] ? "AI" : "human") + " player", canvas.width/2, canvas.height - 150);
		}
		if (event.keyCode == 13) {
			start(); //Pressed enter
			document.removeEventListener("keypress", begin);
		}
	}
}

var p1, p2, stage, keys, timer;

function start(){
	cls();
	stage = players.stage;
	p1 = players.p1;
	p2 = players.p2;
	window.addEventListener("keydown", keydown);
	window.addEventListener("keyup", keyup);
	timer = 0;
	requestAnimationFrame(loop);
}

function loop(){
	cls();
	//Items
	itemSpawn();
	//Draw stage
	ctx.fillStyle = "brown";
	ctx.fillRect(stage.x, stage.y, stage.width, stage.height);
	//Player movements
	playerMove(p1);
	playerMove(p2);
	playerJump(p1);
	playerJump(p2);
	landing(p1);
	landing(p2);
	//Player physics (bumping into each other)
	/*if (playerCollision(p1, p2) && p1.velocityX > 0 && p1.x < p2.x) p1.velocityX = 0; //Was going right
	if (playerCollision(p1, p2) && p1.velocityX < 0 && p1.x > p2.x) p1.velocityX = 0; //Was going left
	if (playerCollision(p2, p1) && p2.velocityX > 0 && p2.x < p1.x) p2.velocityX = 0; //Was going right
	if (playerCollision(p2, p1) && p2.velocityX < 0 && p2.x > p1.x) p2.velocityX = 0; //Was going left*/
	//Player attacks
	playerAttack(p1, p2);
	playerAttack(p2, p1);
	//CPU
	if (cpuPlayer[1]) cpu(p1, p2);
	if (cpuPlayer[2]) cpu(p2, p1);
	//Draw players
	drawPlayer(p1, p2);
	drawPlayer(p2, p1);
	//Write text
	ctx.textBaseline = "top";
	ctx.textAlign = "left";
	write(toTime(timer), 10, 10);
	p1.health = Math.round((p1.health < 0) ? 0 : p1.health);
	p2.health = Math.round((p2.health < 0) ? 0 : p2.health);
	ctx.fillStyle = "black";
	ctx.textBaseline = "bottom";
	ctx.textAlign = "left";
	write("Zach: " + p1.health + "HP", stage.x + 50, canvas.height - 10);
	ctx.textAlign = "right";
	write("Zak: " + p2.health + "HP", stage.x + stage.width - 50, canvas.height - 10);
	//Loop if alive
	timer++;
	if (p1.health > 0 && p2.health > 0) requestAnimationFrame(loop);
	else { //Game over
		var winner = (p1.health > 0) ? "ZACH" : "ZAK";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		write("GAME OVER\n" + winner + " WINS", canvas.width/2, 300);
		window.removeEventListener("keydown", keydown);
		window.removeEventListener("keyup", keyup);
		setTimeout(launch, 5000);
	}
}

//Player functions
function keydown(event){
	//Player 1
	if (cpuPlayer != 1){
		if (event.keyCode == 65) p1.left = true; //A
		if (event.keyCode == 83) p1.down = true; //S
		if (event.keyCode == 68) p1.right = true; //D
	}
	//Player 2
	if (cpuPlayer != 2){
		if (event.keyCode == 37) p2.left = true; //Left arrow
		if (event.keyCode == 40) p2.down = true; //Down arrow
		if (event.keyCode == 39) p2.right = true; //Right arrow
	}
}
function keyup(event){
	//Player 1
	if (cpuPlayer != 1){
		if (event.keyCode == 87) p1.up = true; //W
		if (event.keyCode == 65) p1.left = false; //A
		if (event.keyCode == 83) p1.down = false; //S
		if (event.keyCode == 68) p1.right = false; //D
		if (event.keyCode == 32) p1.attack = true; //Spacebar
	}
	//Player 2
	if (cpuPlayer != 2){
		if (event.keyCode == 38) p2.up = true; //Up arrow
		if (event.keyCode == 37) p2.left = false; //Left arrow
		if (event.keyCode == 40) p2.down = false; //Down arrow
		if (event.keyCode == 39) p2.right = false; //Right arrow
		if (event.keyCode == 13) p2.attack = true; //Enter
	}
}

function drawPlayer(p, q){
	//Attacking sprites
	if (p.attacking > 0){
		var direction = (p.direction == 1) ? "right" : "left";
		var img = document.querySelector("img[src=\"" + p.sprite + "-attack-" + direction + ".png" + "\"]");
		if (p.powerup > 0) img = document.querySelector("img[src=\"" + p.sprite + "-powerup-" + direction + ".png" + "\"]");
		ctx.drawImage(img, p.x, p.y - p.height, p.width, p.height);
		p.attacking++;
		if (p.attacking > p.attackFPS) p.attacking = 0;
	} else {
		q.attacked = false;
		p.attacking = 0;
		if (p.velocityX == 0) { //Player is standing still
			var direction = (p.direction == 1) ? "right" : "left";
			var img = document.querySelector("img[src=\"" + p.sprite + "-standing-" + direction + ".png" + "\"]");
			ctx.drawImage(img, p.x, p.y - p.height, p.width, p.height);
		} else if (p.velocityX != 0){ //Running
			var direction = (p.direction == 1) ? "right" : "left";
			var frame = "";
			if (p.spriteTimer % (4 * p.spriteFPS) < p.spriteFPS) frame = 1;
			else if (p.spriteTimer % (4 * p.spriteFPS) >= p.spriteFPS && p.spriteTimer % (4 * p.spriteFPS) < 2 * p.spriteFPS) frame = 2;
			else if (p.spriteTimer % (4 * p.spriteFPS) >= 2 * p.spriteFPS && p.spriteTimer % (4 * p.spriteFPS) < 3 * p.spriteFPS) frame = 3;
			else frame = 4;
			var selector = "img[src=\"" + p.sprite + "-running-" + direction + "-" + frame + ".png" + "\"]";
			var img = document.querySelector(selector);
			ctx.drawImage(img, p.x, p.y - p.height, p.width, p.height);
		}
	}
	//Draw hitboxes
	ctx.lineWidth = 1;
	ctx.strokeStyle = "green";
	var multiplier = 1;
	if (p.powerup > 0) multiplier = 1.5;
	ctx.strokeRect(p.x - p.hitboxPadding.left - p.range * multiplier, p.y - p.height + p.hitboxPadding.bottom, p.width + p.hitboxPadding.left + p.hitboxPadding.right + p.range * multiplier * 2, p.height + p.hitboxPadding.top + p.hitboxPadding.bottom);
	ctx.strokeStyle = "blue";
	if (p.powerup > 0) {
		ctx.lineWidth = 5;
		ctx.strokeStyle = "purple";
	}
	else if (p.health < 20 || p.attacked) {
		ctx.strokeStyle = "red";
	}
	if (p.attacked) ctx.lineWidth = 3;
	ctx.strokeRect(p.x - p.hitboxPadding.left, p.y - p.height + p.hitboxPadding.bottom, p.width + p.hitboxPadding.left + p.hitboxPadding.right, p.height + p.hitboxPadding.top + p.hitboxPadding.bottom);
	p.spriteTimer++;
	//ctx.fillStyle = p.color;
	//ctx.fillRect(p.x, p.y - p.height, p.width, p.height);
}

function playerMove(p){
	if ((p.left || p.right) && !p.attacked){
		if (p.right){
			p.velocityX = (p.velocityX >= p.speed) ? p.velocityX + p.acceleration : p.speed;
			p.velocityX = (p.velocityX > p.maxSpeed) ? p.maxSpeed : p.velocityX;
			p.direction = 1;
		} else if (p.left){
			p.velocityX = (p.velocityX <= -p.speed) ? p.velocityX - p.acceleration : -p.speed;
			p.velocityX = (p.velocityX < -p.maxSpeed) ? -p.maxSpeed : p.velocityX;
			p.direction = -1;
		}
		p.x += p.velocityX;
	} else {
		if (p.velocityX > 0){ //Was going right
			p.velocityX -= p.deceleration;
			if (p.velocityX < 0) p.velocityX = 0;
			p.x += p.velocityX;
		} else if (p.velocityX < 0){ //Was going left
			p.velocityX += p.deceleration;
			if (p.velocityX > 0) p.velocityX = 0;
			p.x += p.velocityX;
		}
	}
	if (p.up && p.jumpState < p.jumps){
		p.jumpState++;
		p.up = false;
		p.jumping = true;
		p.velocityY = p.jump;
	}
}

function playerJump(p){
	if (p.jumping){
		p.y -= p.velocityY;
		p.velocityY -= p.gravity;
	}
}

function landing(p){
	if (p.x + p.width + p.hitboxPadding.right > stage.x && p.x - p.hitboxPadding.left < stage.x + stage.width && p.y + p.hitboxPadding.bottom >= stage.y){
		p.y = stage.y;
		p.jumping = false;
		p.velocityY = 0;
		p.jumpState = 0;
	} else {
		p.jumping = true;
	}
	//Off stage
	var boundaries = 100;
	if (p.x + p.width < -boundaries || p.x > canvas.width + boundaries || p.y - p.height > canvas.height + boundaries)
		p.health = 0;
}

function playerCollision(p, q){
	var multiplier = 1;
	if (p.powerup > 0) multiplier = 1.5;
	if (p.x + p.width + p.hitboxPadding.right + p.range * multiplier > q.x - q.hitboxPadding.left &&
			p.x + p.hitboxPadding.left - p.range * multiplier < q.x + q.width + q.hitboxPadding.right &&
			p.y + p.hitboxPadding.bottom > q.y - q.height - q.hitboxPadding.top &&
			p.y - p.height - p.hitboxPadding.top < q.y + q.hitboxPadding.bottom)
		return true;
	else return false;
}

function playerAttack(p, q){
	var multiplier = 1;
	if (p.powerup > 0) multiplier = 1.5;
	if (p.attack && p.attacking <= 0){
		p.attack = false;
		p.attacking = 1;
		if (playerCollision(p, q)){ //Attack
			//Check if player is facing the direction of other player
			if ((p.direction == 1 && p.x < q.x) || //Facing right, to the left of player
				p.direction == -1 && p.x > q.x) {//Facing left, to the right of player
				q.health -= p.attackStrength * multiplier;
				q.attacked = true;
				//Launch player in opposite direction
				if (p.direction == 1) q.velocityX = p.launchStrength * multiplier;
				else if (p.direction == -1) q.velocityX = -p.launchStrength * multiplier;
			}
		}
	}
}

function cpu(p, q){
	if (p.y > stage.y) { //Uh oh. We're falling!
		p.up = true;
		if (p.x + p.width < stage.x) {
			p.left = false;
			p.right = true;
		}
		else if (p.x > stage.x + stage.width) {
			p.right = false;
			p.left = true;
		}
	} else if (playerCollision(p, q) && p.attacking <= 0) { //Attack
		p.right = false;
		p.left = false;
		p.attack = true;
	}/* else if (playerCollision(q, p) && p.dodging == 0) { //Dodge. It's too dangerous to stay near
		if (p.right) {
			p.right = false;
			p.left = true;
		} else if (p.left){
			p.left = false;
			p.right = true;
		}
		p.dodging = p.direction;
		p.up = true;
	} else if (p.dodging != 0) { //More dodging
		if (Math.abs(p.x - q.x) >= 200) p.dodging = 0;
	}*/ else { //Go to enemy
		if (p.x < q.x) {
			p.right = true;
			p.left = false;
		}
		if (p.x > q.x) {
			p.left = true;
			p.right = false;
		}
	}
}

function itemCollision(p, item, i){
	if (p.attacking > 0 && p.attacking < 30 &&
			playerCollision(p, item) && 
			((p.direction == 1 && p.x < item.x) || (p.direction == -1 && p.x > item.x))){
		items.splice(i, 1);
		p.powerup = 1;
		lastItem = timer;
	}
}

function seconds(n){
	return n * 60;
}

function itemSpawn(){
	if (((timer - lastItem) % seconds(15) == 0 && timer > 0) || timer == seconds(10)) {
		items.push({
			"x": Math.round(Math.random() * canvas.width),
			"y": Math.round(Math.random() * canvas.height),
			"width": 100,
			"height": 100,
			"velocityX": Math.round(Math.random() * 10) - 5,
			"velocityY": Math.round(Math.random() * 10) - 5,
			"timer": 0,
			"duration": 1000,
			"hitboxPadding": {
				"top": 0,
				"bottom": 0,
				"left": 0,
				"right": 0
			}
		});
	}
	for (var i = 0; i < items.length; i++){
		var item = items[i];
		ctx.drawImage(itemImg, item.x, item.y, item.width, item.height);
		item.x += item.velocityX;
		item.y += item.velocityY;
		//Bounce off edges of canvas
		if (item.x < 0 || item.x + item.width > canvas.width) item.velocityX *= -1;
		if (item.y < 0 || item.y + item.height > canvas.height) item.velocityY *= -1;
		//Player collision
		itemCollision(p1, item, i);
		itemCollision(p2, item, i);
		//5 second limit on item
		item.timer++;
		if (item.timer > item.duration) items.splice(i, 1);
	}
	var duration = 500;
	if (p1.powerup > 0){
		p1.powerup++;
		if (p1.powerup > duration) p1.powerup = 0;
	}
	if (p2.powerup > 0){
		p2.powerup++;
		if (p2.powerup > duration) p2.powerup = 0;
	}
}