var fighters, images, fighterNames, names, game, keyboard;
fighters = {
	 //Fighter		Name		Color		Rage		Attack		Defense		Knockback		Speed		Jump
	"Eason":	[	"Eason",	"#A213C3",	60,			5,			0.05,		15,				8,			15		],
	"Ricky":	[	"Ricky",	"#404040",	80,			10,			0.20,		30,				3,			7		],
	"Vinay": 	[	"Vinay",	"#00FF00",	100,		7,			0.35,		26,				5,			10		],
	"Zach": 	[	"Zach",		"#17390E",	120,		6,			0.15,		16,				7,			12		],
	"John": 	[	"John",		"#6499F1",	110,		3,			0.10,		10,				5,			5		]
 };
 fighterNames = [];
 for (var i in fighters) fighterNames.push(i);

var names = [false, false];
function chooseP(name, p, color1, color2){
	if (names[p - 1] != false){
		var el = document.querySelector(".chooser.p" + p + "." + names[p - 1]);
		el.style.backgroundColor = color1;
		el.style.color = color2;
	}
	if (names[p - 1] == name){
		names[p - 1] = false;
	} else {
		names[p - 1] = name;
		var el = document.querySelector(".chooser.p" + p + "." + name);
		el.style.backgroundColor = color2;
		el.style.color = "white";
	}
	if (names[0] != false && names[1] != false){
		document.querySelector("tr.startRow").style.display = "table-row";
	} else document.querySelector("tr.startRow").style.display = "none";
}
function chooseP1(name){
	chooseP(name, 1, "buttonface", "red");
}
function chooseP2(name){
	chooseP(name, 2, "buttonface", "blue");
}
 
 function init(){
	 keyboard = new Keyboard();
	 images = {};
 }
 window.addEventListener("load", init, false);
 
 function setup(){
	 loadSprites(0);
 }
 
 function setupGame(){
	var stage = new Stage(1200, 1000);
    game = new Game(1600, 900, stage);
	var f1 = new Fighter(fighters[names[0]]);
    var p1 = new Player("WASD", "left", f1, stage, keyboard);
    var f2 = new Fighter(fighters[names[1]]);
    var p2 = new Player("arrows", "right", f2, stage, keyboard);
    
    game.setPlayers(p1, p2);
	 
    game.start();
 }
 
 function loadSprites(i){
	 if (i < fighterNames.length){
		 var img = new Image();
		 img.addEventListener("load", function(){
			 loadSprites(i + 1);
		 }, false);
		 img.src = "./sprites/" + fighterNames[i].toLowerCase() + ".png";
		 images[fighterNames[i]] = img;
	 } else setupGame();
 }
 
class Keyboard {
    constructor(){
        this.pressed = {};
        this.keys = {8: "BACKSPACE", 9: "TAB", 13: "ENTER", 16: "SHIFT", 17: "CTRL", 18: "ALT", 19: "PAUSEBREAK", 20: "CAPSLOCK", 27: "ESC", 32: "SPACE", 33: "PAGEUP", 34: "PAGEDOWN", 35: "END", 36: "HOME", 37: "LEFTARROW", 38: "UPARROW", 39: "RIGHTARROW", 40: "DOWNARROW", 45: "INSERT", 46: "DELETE", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 91: "LEFTWINDOWKEY", 92: "RIGHTWINDOWKEY", 93: "SELECTKEY", 96: "NUMPAD0", 97: "NUMPAD1", 98: "NUMPAD2", 99: "NUMPAD3", 100: "NUMPAD4", 101: "NUMPAD5", 102: "NUMPAD6", 103: "NUMPAD7", 104: "NUMPAD8", 105: "NUMPAD9", 106: "MULTIPLY", 107: "ADD", 109: "SUBTRACT", 110: "DECIMALPOINT", 111: "DIVIDE", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NUMLOCK", 145: "SCROLLLOCK", 186: "SEMICOLON", 187: "EQUALSIGN", 188: "COMMA", 189: "DASH", 190: "PERIOD", 191: "FORWARDSLASH", 192: "GRAVEACCENT", 219: "OPENBRACKET", 220: "BACKSLASH", 221: "CLOSEBRACKET", 222: "SINGLEQUOTE"};
        window.addEventListener("keydown", this.keydown.bind(this), false);
        window.addEventListener("keyup", this.keyup.bind(this), false);
        this.init();
    }
    init(){
        for (var num in this.keys){
           var letter = this.keys[num];
           this.pressed[letter] = false;
        }
    }
    keypress(event, value){
        //event.preventDefault();
        this.pressed[this.keys[event.keyCode]] = value;
    }
    keydown(event){
        this.keypress(event, true);
    }
    keyup(event){
        this.keypress(event, false);
    }
 }
 
 
 
 
 

class Location {
    constructor(x, y) {
        this.x=x;
        this.y=y;
    }
    distanceTo(loc) { //double distanceTo(Location loc)
        return Math.sqrt((Math.pow(this.x, 2)+Math.pow(loc.x, 2))
        +(Math.pow(this.y, 2)+Math.pow(loc.y, 2)));
    }
 }
 
 
 
 
 
 class Game {
    constructor(width, height, stage){ //HUD(Canvas canvas, Stage stage)
		this.div = document.createElement("div");
		this.div.style = "position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; background-color: black;";
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
		this.div.appendChild(this.canvas);
		document.body.appendChild(this.div);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.translate(width/2, height - 100);
        this.stage = stage;
        this.background = "lightblue";
        this.players = Array(2);
    }
	destroy(){
		this.div.parentElement.removeChild(this.div);
	}
    start(){ //void start()
        this.time = 180;
        requestAnimationFrame(this.loop.bind(this));
    }
    loop(){
		 var over = this.gameOver();
        //Stuff
        this.ctx.clearRect(-this.width/2, -(this.height - 100), this.width, this.height);
		 this.update();
        this.draw();
        this.time -= 1/60;
        if (!over) requestAnimationFrame(this.loop.bind(this));
		 else {
			 this.ctx.font = "128px Arial";
			 this.ctx.fillStyle = "black";
			 this.ctx.textAlign = "center";
			 this.ctx.textBaseline = "middle";
			 this.ctx.fillText("GAME OVER", 0, -(this.height - 100) + this.height/2);
			 setTimeout(this.destroy.bind(this), 3000);
		 }
    }
    draw(){
        this.drawBackground();
        this.drawStage();
        this.drawFighters();
        this.drawStats();
    }
    drawBackground(){
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(-this.width/2, -(this.height-100), this.width, this.height);
    }
    drawStage(){
        this.ctx.fillStyle = this.stage.background;
        this.ctx.fillRect(-this.stage.width/2, 0, this.stage.width, this.stage.height);
    }
    drawFighters(){
        for (var i = 0; i < this.players.length; i++){
			 var p = this.players[i];
           p.fighter.sprite.draw(this.ctx, p.location, p.direction);
        }
    }
    drawStats(){
        this.ctx.fillStyle = "black";
		 this.ctx.font = "30px Arial";
		 this.ctx.textBaseline = "top";
		 this.ctx.textAlign = "center";
        this.ctx.fillText(this.formatTime(), 0, -(this.height - 100) + 10);
		 this.ctx.textAlign = "left";
        this.ctx.fillText("P1: "+Math.round(this.players[0].damage), -this.width/2 + 10, -(this.height - 100) + 10);
		 this.ctx.textAlign = "right";
        this.ctx.fillText("P2: "+Math.round(this.players[1].damage), this.width/2 - 10, -(this.height - 100) + 10);
    }
    setPlayers(a, b){ //void setFighter1(Fighter fighter)
        a.other = b;
        b.other = a;
        a.fighter.sprite.color = "red";
        b.fighter.sprite.color = "blue";
        this.players[0] = a;
        this.players[1] = b;
    }
	 dead(p){
		 //if (this.players[p].health < 0) console.log("His health is " + this.players[p].health);
		 var xDead = this.players[p].location.x + this.players[p].fighter.sprite.width < -this.width/2 - 10 || this.players[p].location.x > this.width/2 + 10;
		 if (xDead) console.log("His x is " + this.players[p].location.x);
		 var yDead = this.players[p].location.y > 100;
		if (yDead) console.log("His y is " + this.players[p].location.y);
		 return xDead || yDead;
	 }
    gameOver(){ //boolean gameOver()
		 if (this.dead(0))
			 console.log("Player One died");
		 if (this.dead(1))
			 console.log("Player Two died");
		 if (this.time <= 0) {
			 console.log("Time has run out!");
		 }
		 return this.dead(0) || this.dead(1) || (this.time <= 0);
    }
    formatTime() {
        return Math.floor(this.time/60) + ":" + (this.time % 60 < 10 ? "0" : "") + Math.floor(this.time % 60);
    }
	 update(){
		 for (var i = 0; i < this.players.length; i++){
			 this.players[i].update();
		 }
	 }
 }
 
 
 
 
 
 class Stage {
    constructor(width, height){ //Stage(double width, double height)
        this.width = width;
        this.height = height;
        this.background = "brown";
        this.location = new Location(-width/2, 0);
		 this.fighter = {
			 sprite: {
				 width: width,
				 height: height
			 }
		 };
    }
 }
 
 
 
 
 
 class Sprite {
    constructor(img){
        this.image = img;
		 this.animations = {"standing": 0, "attacking": 1};
        this.animation = "standing";
        this.width = 64;
        this.height = 128;
		 this.color = "black";
	    this.thick = 2;
    }
    draw(ctx, loc, dir){
        //Spritesheet stuff
		 var sx = this.animations[this.animation] * 64;
		 var sy = 0;
		 var sw = this.width;
		 var sh = this.height;
		 //Direction stuff
		 var x = loc.x;
		 if (dir == -1) {
			 ctx.scale(-1, 1);
			 x = -loc.x - this.width;
		 }
		 ctx.drawImage(this.image, sx, sy, sw, sh, x, loc.y, this.width, this.height);
		 //Draw hitbox
		 ctx.strokeStyle = this.color;
		 ctx.lineWidth = this.thick;
		 ctx.strokeRect(x, loc.y, this.width, this.height);
		 //Draw hitbox with padding
		 var padding = 20;
		 ctx.strokeRect(x - padding, loc.y - padding, this.width + padding*2, this.height + padding*2);
		 if (dir == -1) ctx.scale(-1, 1);
    }
 }
 
 
 
 
 
 class Player {
    constructor(scheme, side, fighter, stage, keyboard) {
       if (side == "left"){
          this.location = new Location(-stage.width/2 + 20, -fighter.sprite.height*2);
			this.direction = 1;
       }
       else if (side=="right") {
          this.location = new Location(stage.width/2 - 20 - fighter.sprite.width, -fighter.sprite.height*2);
			this.direction = -1;
       }
       else {
          this.location = new Location(0, -fighter.sprite.height*2);
			this.direction = 0;
       }
		this.prevLoc = new Location(this.location.x, this.location.y);
       this.keyboard = keyboard;
       this.scheme=scheme;
       this.fighter=fighter;
       this.damage=0;
       this.stage = stage;
       this.velocity = {x: 0, y: 0};
       this.acceleration = {x: 0, y: 0};
		this.attackedCD = 0;
       this.jumps = 0;
		this.jumpCD = 0; //jump cooldown... All Julian's idea! Yay!
		this.jumpPress = false;
		this.attackPress = false;
		this.attackCD = 0; //attack cooldown... Both of our ideas
		this.attacked = 0;
       if (this.scheme == "WASD"){
          this.controls = {
             LEFT: "A",
             RIGHT: "D",
             JUMP: "W",
             ATTACK: "V"
          };
       } else if (this.scheme == "arrows"){
          this.controls = {
             LEFT: "LEFTARROW",
             RIGHT: "RIGHTARROW",
             JUMP: "UPARROW",
             ATTACK: "SHIFT" //"NUMPAD5"
          };
       }
    }
    keyPressed(key){
       return this.keyboard.pressed[this.controls[key]];
    }
    doControls(){
		var attacked = (this.attackedCD > 0);
	    this.acceleration.x = 0;
		if (!attacked && this.keyPressed("LEFT")) this.acceleration.x -= this.fighter.speed;
		if (!attacked && this.keyPressed("RIGHT")) this.acceleration.x += this.fighter.speed;
		if (this.acceleration.x == 0 && Math.abs(this.velocity.x)){ //Decelerate from friction and air resistance
			if (this.collision(this.stage)){ //On the floor
				this.acceleration.x = -1;
			} else { //In the air
				this.acceleration.x = -0.5;
			}
			this.acceleration.x *= Math.sign(this.velocity.x)
		}
		if (this.attackedCD > 0) {
			this.attackedCD += 1/60;
			if (this.attackedCD >= 0.75) this.attackedCD = 0;
		}
		if (!attacked && this.keyPressed("JUMP") && this.jumps < 2 && this.jumpCD <= 0) {
          this.velocity.y = this.fighter.jump;
          this.jumps++;
       }
		if (this.jumps >= 0){
			this.jumpCD += 1/60;
			if (this.jumpCD > 0.01 && !this.keyPressed("JUMP")) this.jumpCD = 0;
		}
       if (!attacked && this.keyPressed("ATTACK") && this.attacks < 1 && this.attackCD <= 0){
			this.attack();
			this.attacks++;
		}
		if (this.attacks > 0){
			this.attackCD += 1/60;
			if (this.attackCD > 0.5 && !this.keyPressed("ATTACK")){
				this.attackCD = 0;
			}
		}
    }
    update(){
       this.doControls();
       this.velocity.x += this.acceleration.x;
	   if (Math.abs(this.velocity.x) < 0.6) this.velocity.x = 0;
       if (this.attackedCD == 0 && Math.abs(this.velocity.x) > this.fighter.speed) {
          this.velocity.x = this.fighter.speed * Math.sign(this.velocity.x); //Cap the speed at the fighter's speed
       }
       //this.location.x += this.velocity.x;
       this.velocity.y += this.acceleration.y;
       if (!this.touchingStage()) this.velocity.y += -0.5; //Gravity
       //this.location.y -= this.velocity.x;
		this.location = {x: this.location.x + this.velocity.x, y: this.location.y - this.velocity.y};
		if (this.attackCD == 0) this.attacks = 0;
		if (this.velocity.x != 0 && this.attackedCD == 0) this.direction = Math.sign(this.velocity.x);
       //if (this.collision(this.stage).up){
		if (this.touchingStage()){
          this.location.y = -this.fighter.sprite.height - 2;
          if (this.jumps > 0) this.jumps = 0;
			//if (!this.keyPressed("JUMP")) this.jumpCD = 0;
       }
	    if (this.attackedCD > 0) this.fighter.sprite.thick = 4;
	    else this.fighter.sprite.thick = 2;
		//Sprite
		if (this.fighter.sprite.animationCD > 0) this.fighter.sprite.animationCD -= 1/60;
		else {
			this.fighter.sprite.animationCD = 0;
			this.fighter.sprite.animation = "standing";
		}
		this.multiplier = 1;
		if (this.damage > 20){
			//this.multiplier = Math.pow(2, 0.2 * this.damage);
			//CALCULATE MULTIPLIER
			this.multiplier += 0.005 * (this.damage - 20);
		}
    }
	touchingStage(){
		return this.location.y + this.fighter.sprite.height >= this.stage.location.y
			//&& this.location.y + this.fighter.sprite.height <= this.stage.location.y + 100
			&& this.location.x + this.fighter.sprite.width >= -this.stage.width/2
			&& this.location.x <= this.stage.width/2;
	}
    collision(o) { //Use for the stage
		var padding = 0;
       var rect1 = {x: this.location.x - padding, y: this.location.y - padding, width: this.fighter.sprite.width + padding*2, height: this.fighter.sprite.height + padding*2};
       var rect2 = {x: o.location.x, y: o.location.y, width: o.fighter.sprite.width, height: o.fighter.sprite.height};
       if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y){ //Make sure they're colliding
			return { //Assumes that both have same dimensions
				up: rect1.y + rect1.height < rect2.y + rect2.height,
				below: rect1.y > rect2.y,
				right: rect1.x > rect2.x,
				left: rect1.x < rect2.x
			};
		} else return {up: false, below: false, left: false, right: false};
    }
	pCollision(o){
		//To-do: replace with bitmap collision rather than rectangular bounding box
		var padding = 20;
		var rect1 = {x: this.location.x - padding, y: this.location.y - padding, width: this.fighter.sprite.width + padding*2, height: this.fighter.sprite.height + padding*2};
       var rect2 = {x: o.location.x - padding, y: o.location.y - padding, width: o.fighter.sprite.width + padding*2, height: o.fighter.sprite.height + padding*2};
       return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;
	}
    attack() { //checks if opponent is in attack range
		this.fighter.sprite.animation = "attacking";
		this.fighter.sprite.animationCD = 0.2;
		var col = this.pCollision(this.other);
		if (col){
			if ( (this.direction == 1 && this.location.x < this.other.location.x) || (this.direction == -1 && this.location.x > this.other.location.x) ) {
				var me = this.multiplier;
				if (this.damage > this.fighter.threshold) me *= 1.5;
				if (this.other.damage > 20) me += this.other.multiplier;
				me /= 2;
				this.fighter.attack(this.other, this.direction, me);
			}
		}
    }
}

 class Fighter {
	//Fighter				Name		Color		Rage		Attack		Defense		Knockback		Speed		Jump	Sprite
    //constructor(name, color, rage, attack, defense, knockback, speed, jump) {
	constructor(args){
       this.name = args[0];
		this.threshold = args[2];
		this.rage = false;
		this.atk = args[3];
		this.defense = args[4];
		this.knockback = args[5];
		this.speed = args[6];
		this.jump = args[7];
		this.sprite = new Sprite(images[this.name]);
		this.sprite.color = args[1];
		this.animationCD = 0;
    }
    attack(other, dir, multiplier) { //void attack(Player other)
       other.damage += (1 - other.fighter.defense) * (this.atk * multiplier);
		other.velocity.x = dir * (1 - other.fighter.defense) * this.knockback * multiplier;
		other.attackedCD = 1/60;
    }
 }
