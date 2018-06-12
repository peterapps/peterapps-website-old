// Important constants
var g = 9.80665; // meters per second squared or Newtons per kilogram
var G = 6.67408e-11; // N * m^2 / kg^2
var M = 5.9723e24; // kilograms
var rE = 6.378e6; // meters

// Details about our shuttle (Shuttle Atlantis)
var m = 122683; // kilograms
var y = 0; // meters
var v = 0; // meters per second
var vx = 0;
var vy = 0;
var thrusters = 0; // Newtons
var pi = Math.PI;
var theta = pi/2;

var fps = 1 / 60;
function loop(){
	clear();
	// Adjust thrusters
	if (keys[38]) thrusters += 10000; // up arrow
	if (keys[40]) thrusters -= 10000; // down arrow
	if (thrusters < 0) thrusters = 0;
	
	// Side thrusters!
	if (keys[37]) theta += 0.1; // left arrow
	if (keys[39]) theta -= 0.1; // right arrow
	if (theta < 0) theta += 2 * pi;
	if (theta > 2 * pi) theta -= 2 * pi;
	
	//Calculate stuff
	var r = rE + y; // meters
	var W = G * M * m / (r * r); // Newtons
	var Fnet = thrusters - W; // Newtons
	var a = Fnet / m; // meters per second squared
	
	//Move the shuttle
	vy += a * fps;
	y += vy * fps;
	if (y < 0){
		a = 0;
		vy = 0;
		y = 0;
		Fnet = 0;
	}
	var gForce = 1 + a / 9.8;
	
	drawShuttle(y);
	
	// HUD
	text([
		"Use the up and down arrows to adjust the thrusters.",
		//"Use the left and right arrows to activate the side thrusters.",
		"",
		"Mass (kg): " + m,
		"Thrusters (N): " + Math.round(thrusters),
		"Weight (N): " + Math.round(W),
		"Net force (N): " + Math.round(Fnet),
		"Acceleration (m/s^2): " + round2(a),
		"Velocity (m/s): " + round2(vy),
		"Altitude (m): " + Math.round(y),
		"g-forces (g): " + round2(gForce)
	]);
	requestAnimationFrame(loop);
}