window.addEventListener("load", function(){
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");
	document.querySelector("#noise").oninput();

	class Point {
		constructor(x_, y_){
	  	this.x = x_;
	    this.y = y_;
	  }
	  draw(color = "black"){
	  	ctx.fillStyle = color;
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, 5, 0, 2*Math.PI);
	    ctx.fill();
	  }
		static noise(amount){
			return (Math.random() * amount * 2) - amount + 1;
		}
	  static distance(a, b) {
	    var dx = a.x - b.x;
	    var dy = a.y - b.y;
	    return Math.hypot(dx, dy) * this.noise(document.querySelector("#noise").value);
	  }
	}
	class Beacon extends Point {
		constructor(x_, y_, color_ = "gray"){
	  	super(x_, y_);
	    this.color = color_;
	  }
	  draw(color = this.color){
	  	super.draw(color);
	  }
	  drawRing(robot){
	  	ctx.strokeStyle = this.color;
	    ctx.lineWidth = 1;
	    var radius = Point.distance(this, robot);
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, radius, 0, 2*Math.PI);
			// ctx.moveTo(this.x, this.y);
			// ctx.lineTo(robot.x, robot.y);
	    ctx.stroke();
	  }
	}
	class Robot extends Point {
		constructor(x_, y_){
	  	super(x_, y_);
	    this.beacons = [];
	  }
	  draw(){
	  	super.draw("red");
	  }
	  moveX(dx){
	  	this.x += dx;
	  }
	  moveY(dy){
	  	this.y += dy;
	  }
	  addBeacons(arr){
	  	var bot = this;
	  	arr.forEach(function(b){
	    	bot.beacons.push(b);
	    })
	  }
	  addBeacon(b){
	  	this.addBeacons([b]);
	  }
	  rings(){
	  	var bot = this;
	  	this.beacons.forEach(function(beacon){
	    	beacon.draw();
	    	//beacon.drawRing(bot);
	    });
	  }
	  closest3(){
	  	var distances = [];
	    var bot = this;
	    this.beacons.forEach(function(b){
	    	distances.push({"b": b, "r": Point.distance(b, bot)});
	    });
	    distances.sort(function(a,b){return a.r - b.r;});
	    return [distances[0].b, distances[1].b, distances[2].b];
	  }
	  triangulate(){
	  	var closest = this.closest3();
	    var bot = this;
	    closest.forEach(function(b){
	    	//b.drawRing(bot);
				b.draw("yellow");
	    });
	  	var a = closest[0];
	    var b = closest[1];
	    var c = closest[2];
	    var da = Point.distance(this, a);
	    var db = Point.distance(this, b);
	    var dc = Point.distance(this, c);
	    var A = -2*a.x + 2*b.x;
	    var B = -2*a.y + 2*b.y;
	    var C = da*da - db*db - a.x*a.x + b.x*b.x - a.y*a.y + b.y*b.y;
	    var D = -2*b.x + 2*c.x;
	    var E = -2*b.y + 2*c.y;
	    var F = db*db - dc*dc - b.x*b.x + c.x*c.x - b.y*b.y + c.y*c.y;
	    return new Point(
	    	(C*E - F*B) / (E*A - B*D),
	      (C*D - A*F) / (B*D - A*E)
	    );
	  }
	}

	//Key listeners
	var mapped = {"LEFT": 37, "RIGHT": 39, "UP": 38, "DOWN": 40};
	var mapped = {
		37: "LEFT", 39: "RIGHT", 38: "UP", 40: "DOWN",
		65: "LEFT", 68: "RIGHT", 87: "UP", 83: "DOWN"
	};
	var keys = {};
	function toggleKey(event, val){
		if (event.keyCode in mapped){
			event.preventDefault();
			keys[mapped[event.keyCode]] = val;
		}
	}
	window.addEventListener("keydown", function(event){
		toggleKey(event, true);
	});
	window.addEventListener("keyup", function(event){
		toggleKey(event, false);
	});

	//Init
	var bot = new Robot(canvas.width/2, canvas.height/2);
	for (var i = 0; i < 20; i++){
		bot.addBeacon(new Beacon(
	  	Math.floor(Math.random() * canvas.width),
	    Math.floor(Math.random() * canvas.height)
	  ));
	}

	function loop(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	  if (keys["LEFT"]) bot.moveX(-2);
	  if (keys["RIGHT"]) bot.moveX(2);
	  if (keys["UP"]) bot.moveY(-2);
	  if (keys["DOWN"]) bot.moveY(2);
	  bot.draw();
	  bot.rings();
	  var p = bot.triangulate();
	  p.draw("blue");
	  var e_x = p.x - bot.x;
	  var e_y = p.y - bot.y;
	  var error = Math.sqrt(e_x*e_x + e_y*e_y);
	  //error = Math.round(error * 100) / 100;
	  document.querySelector("#error").innerHTML = "Error: " + Math.round(error) + "px";
	  requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);
}, false);
