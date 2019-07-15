function plot(nacaCode) {
	// http://airfoiltools.com/airfoil/naca4digit
	// https://en.wikipedia.org/wiki/NACA_airfoil
	// https://www.desmos.com/calculator/yinxige4bi

	var M = parseInt(nacaCode.charAt(0)); // Maximum camber (% of chord)
	var P = parseInt(nacaCode.charAt(1)); // Position of max camber (which tenth)
	var XX = parseInt(nacaCode.substring(2, 4)); // Max thickness (% of chord)

	var m = M / 100.0;
	var p = P / 10.0;
	var t = XX / 100.0;

	function camber(x) { // Camber line, y_c
		if (0 <= x && x < p) { // Front
			return (m / p * p) * (2 * p * x - x * x);
		} else if (P <= x && x <= 1) { // Back
			return (m / Math.pow(1 - p, 2)) * (1 - 2 * p + 2 * p * x - x * x);
		} else return false;
	}

	function gradient(x) { // Derivative of camber line, dy_c / dx
		if (0 <= x && x < p) { // Front
			return (2 * m / (p * p)) * (p - x);
		} else if (p <= x && x <= 1) { // Back
			return (2 * m / Math.pow(1 - p, 2)) * (p - x);
		} else return false;
	}

	function thickness(x) { // Thickness distribution, y_t
		var a0 = 0.2969,
			a1 = -0.126,
			a2 = -0.3516,
			a3 = 0.2843;
		var a4 = -0.1015; // -0.1036 for a closed trailing edge
		return (t / 0.2) // for 20% thick airfoil
			*
			(a0 * Math.sqrt(x) + a1 * x + a2 * x * x + a3 * x * x * x + a4 * x * x * x * x);
	}

	function theta(x) { // Angle used to draw thickness perpendicular to camber line
		return Math.atan(gradient(x));
	}

	function surface(x) { // Argument: theta
		var x_c = x;
		var y_c = camber(x);
		var y_t = thickness(x);
		var th = theta(x);
		return {
			x_U: x_c - y_t * Math.sin(th),
			y_U: y_c + y_t * Math.cos(th),
			x_L: x_c + y_t * Math.sin(th),
			y_L: y_c - y_t * Math.cos(th)
		};
	}

	var cambers = [];
	var coords_U = [];
	var coords_L = [];
	for (var beta = 0; beta <= Math.PI; beta += 0.04) {
		var x = (1 - Math.cos(beta)) / 2.0;
		cambers.push([x, camber(x)]);
		var sur = surface(x);
		coords_U.push([sur.x_U, sur.y_U]);
		coords_L.push([sur.x_L, sur.y_L]);
	}

	// Draw!
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	ctx.clearRect(0, 0, w, h);

	// Draw axes
	ctx.strokeStyle = "gray";
	ctx.beginPath();
	for (var i = 0; i <= 1; i += 0.1) {
		ctx.moveTo(0, i * h);
		ctx.lineTo(w, i * h);
	}
	for (var i = 0; i <= 1; i += 0.1) {
		ctx.moveTo(i * w, 0);
		ctx.lineTo(i * w, h);
	}
	ctx.stroke();
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(0, h / 2);
	ctx.moveTo(w, h / 2);
	ctx.stroke();

	// Draw arr
	function draw_arr(arr) {
		ctx.beginPath();
		ctx.moveTo(0, h / 2);
		for (var i = 0; i < arr.length; i++) {
			var x = arr[i][0] * w;
			var y = h / 2 - (arr[i][1] * w);
			ctx.lineTo(x, y);
		}
		ctx.stroke();
	}

	ctx.strokeStyle = "purple";
	draw_arr(cambers);
	ctx.strokeStyle = "green";
	draw_arr(coords_U);
	ctx.strokeStyle = "red";
	draw_arr(coords_L);
}