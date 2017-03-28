var canvas, ctx, redEl, blueEl, totalEl, pieEl, error, loop;

var red = 0;
var total = 0;
var started = false;
var frameRate = 1;
var dotsPerMs = 500;

window.addEventListener("load", function(){
	canvas = document.getElementsByTagName("canvas")[0];
	ctx = canvas.getContext("2d");
	redEl = document.getElementById("red");
	blueEl = document.getElementById("blue");
	totalEl = document.getElementById("total");
	piEl = document.getElementById("pi");
	error = document.getElementById("error");
});

function stop(){
	clearInterval(loop);
	started = false;
}

function reset(){
	stop();
	red = 0;
	total = 0;
	started = false;
	piEl.innerHTML = totalEl.innerHTML = redEl.innerHTML = blueEl.innerHTML = error.innerHTML = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function start(){
	if (!started){
		loop = setInterval(step, frameRate);
		started = true;
	}
}

function step() {
	for (var i = 0; i < dotsPerMs; i++){
		var x = (Math.random() * 2) - 1; //Returns value from -1 to 1
		var y = (Math.random() * 2) - 1; //Returns value from -1 to 1
		var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); //Return distance between (x, y) and (0, 0). Will be from 0 to 1
		if (r <= 1) { //If (x, y) is inside the circle, draw in red
			ctx.fillStyle = "red";
			red++
		} else { //If outside, draw in blue
			ctx.fillStyle = "blue";
		}
		total++
		//Draw a 1px dot
		ctx.fillRect((x * canvas.width/2) + canvas.width/2, (y * canvas.height/2) + canvas.height/2, 1, 1);
	}
	//Update table cells
	redEl.innerHTML = red.toString();
	blueEl.innerHTML = (total - red).toString();
	totalEl.innerHTML = total.toString();
	var calcPi = 4 * red / total;
	piEl.innerHTML = calcPi;
	error.innerHTML = (Math.abs((Math.PI - calcPi) / Math.PI) * 100).toString() + "%";
}
