function Players(canvas){
	this.stage = {
		"x": 150,
		"y": canvas.height - 100,
		"width": canvas.width - 300,
		"height": 100
	};
	this.p1 = { //Zach
		"health": 100,
		"color": "red",
		"width": 208,
		"height": 240,
		"speed": 2,
		"maxSpeed": 10,
		"velocityX": 0,
		"velocityY": 0,
		"acceleration": 0.1,
		"deceleration": 0.25,
		"gravity": 0.3,
		"jump": 14,
		"jumps": 2,
		"jumpState": 0,
		"attacking": 0,
		"attackFPS": 30,
		"attackStrength": 10,
		"launchStrength": 15,
		"spriteFPS": 10,
		"spriteTimer": 0,
		"sprite": "./img/zach",
		"hitboxPadding": {
			"top": 0,
			"bottom": 0,
			"left": -50,
			"right": -50
		},
		"range": 25,
		"direction": 1,
		"powerup": 0,
		"x": this.stage.x + 100,
		"y": canvas.height - 100
	};
	this.p2 = { //Zak
		"health": 100,
		"color": "blue",
		"width": 231,
		"height": 250,
		"speed": 3,
		"maxSpeed": 8,
		"velocityX": 0,
		"velocityY": 0,
		"acceleration": 0.05,
		"deceleration": 0.2,
		"gravity": 0.7,
		"jump": 25,
		"jumps": 2,
		"jumpState": 0,
		"attacking": 0,
		"attackFPS": 30,
		"attackStrength": 15,
		"launchStrength": 10,
		"spriteFPS": 7,
		"spriteTimer": 0,
		"sprite": "./img/zak",
		"hitboxPadding": {
			"top": 0,
			"bottom": 0,
			"left": -50,
			"right": -50
		},
		"range": 20,
		"powerup": 0,
		"direction": -1,
		"x": this.stage.x + this.stage.width - 231 - 100,
		"y": canvas.height - 100
	};
}