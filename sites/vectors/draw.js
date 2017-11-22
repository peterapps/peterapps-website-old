var canvas, ctx, x, y, xAxis, yAxis;

window.addEventListener("load", function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	xAxis = canvas.width / 2;
	yAxis = canvas.height / 2;
	generateVals(5, 30, 9, 60);
	document.getElementById("form").addEventListener("submit", function(event) {
		event.preventDefault();
		generate();
	}, false);
}, false);

function generateVals(am, aa, bm, ba){
	document.getElementById("a-mag").value = am;
	document.getElementById("a-dir").value = aa;
	document.getElementById("b-mag").value = bm;
	document.getElementById("b-dir").value = ba;
	generate();
}

function xy(v) {
	v.x = v.magnitude * Math.cos(v.direction * Math.PI / 180);
	v.y = v.magnitude * Math.sin(v.direction * Math.PI / 180);
}

function round2(n) {
	return (Math.round(n * 100) / 100).toFixed(2);
}

function drawVector(v, dashes) {
	var oldX = x, oldY = y;
	ctx.strokeStyle = v.color;
	ctx.setLineDash([]);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x += v.x;
	y -= v.y;
	ctx.lineTo(x, y);
	ctx.stroke();
	//x and y components
	if (dashes){
		ctx.setLineDash([5, 8]);
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x, oldY);
		ctx.lineTo(oldX, oldY);
		ctx.stroke();
		ctx.setLineDash([]);
	}
}

function displayTxt(v, c, inputs) {
	var tr = document.querySelector("tr" + c);
	tr.style.color = v.color;
	if (!inputs) {
		document.querySelector(c + " .mag").innerHTML = round2(v.magnitude);
		document.querySelector(c + " .angle").innerHTML = round2(v.direction);
	}
	document.querySelector(c + " .xcom").innerHTML = round2(v.x);
	document.querySelector(c + " .ycom").innerHTML = round2(v.y);
}

function scale(v, scl) {
	v.x *= scl;
	v.y *= scl;
}

function generate() {
	var a = {
		"magnitude": parseFloat(document.getElementById("a-mag").value),
		"direction": parseFloat(document.getElementById("a-dir").value),
		"color": "red"
	};
	var b = {
		"magnitude": parseFloat(document.getElementById("b-mag").value),
		"direction": parseFloat(document.getElementById("b-dir").value),
		"color": "blue"
	};
	xy(a);
	xy(b);
	var Rx = a.x + b.x;
	var Ry = a.y + b.y;
	var R = Math.sqrt(Rx * Rx + Ry * Ry);
	var angle = Math.atan2(Ry, Rx) * 180 / Math.PI;
	var r = {
		"magnitude": R,
		"direction": angle,
		"x": Rx,
		"y": Ry,
		"color": "green"
	};
	displayTxt(a, ".a", true);
	displayTxt(b, ".b", true);
	displayTxt(r, ".r", false);

	//Scale the vectors to fit the canvas
	var max = Math.max(
		a.x, a.y, b.x, b.y, r.x, r.y
	);
	var scl = (0.95 * canvas.width / 2) / max;
	scale(a, scl);
	scale(b, scl);
	scale(r, scl);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(xAxis, 0);
	ctx.lineTo(xAxis, 2 * yAxis);
	ctx.moveTo(0, yAxis);
	ctx.lineTo(2 * xAxis, yAxis);
	ctx.stroke();

	x = canvas.width / 2;
	y = canvas.height / 2;
	ctx.lineWidth = 1;
	drawVector(a, true);
	drawVector(b, true);

	x = canvas.width / 2;
	y = canvas.height / 2;
	ctx.lineWidth = 2;
	drawVector(r, false);
}