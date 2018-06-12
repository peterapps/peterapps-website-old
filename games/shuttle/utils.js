var canvas, ctx;
keys = {};

window.addEventListener("load", function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	window.addEventListener("keydown", function(event){
		keys[event.keyCode] = true;
	}, false);
	window.addEventListener("keyup", function(event){
		keys[event.keyCode] = false;
	}, false);
	//Init
	requestAnimationFrame(loop);
}, false);

function text(lines){
	var fontSize = 25;
	var spacing = 1.15;
	var padding = 25;
	ctx.fillStyle = "black";
	ctx.font = fontSize + "px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	for (var i = 0; i < lines.length; i++){
		var line = lines[i];
		var x = padding;
		var y = padding + i * (fontSize * spacing);
		ctx.fillText(line, x, y);
	}
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function round2(num){
	return Math.round(num * 100) / 100;
};

function drawShuttle(elevation){
	var width = 23.79; // meters
	var height = 37.24; // meters
	var x = canvas.width / 2;
	var y = canvas.height - elevation - height;
	var marker = 200;
	var baseline = marker;
	//Shift up
	while (y < 0){
		y += canvas.height;
		baseline += canvas.height;
	}
	ctx.fillStyle = "gray";
	ctx.fillRect(x, y, width, height);
	//Draw marker
	ctx.fillRect(0, canvas.height - marker, canvas.width, 2);
	ctx.textBaseline = "bottom";
	ctx.fillText(baseline + " m", 1000, canvas.height - marker * 1.05);
}