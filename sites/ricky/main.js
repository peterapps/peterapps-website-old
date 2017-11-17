function rand(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}

var data;

window.addEventListener("load", function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText);
			for (var i = 0; i < 15; i++) generate();
		}
	};
	xhttp.open("GET", "./frequencies.json", true);
	xhttp.send();
}, false);

function generate(){
	var length = rand(data.lengths);

	var quote = [];
	for (var i = 0; i < length; i++){
		var word = rand(data.frequencies[length]);
		quote.push(word);
	}
	var txt = quote.join(" ");
	txt = txt.charAt(0).toUpperCase() + txt.substring(1);
	var ol = document.getElementById("quote");
	var li = document.createElement("li");
	li.innerHTML = txt;
	ol.insertBefore(li, ol.firstChild);
}

var loop = false;
function start(){
	if (!loop) loop = setInterval(generate, 50);
}
function stop(){
	clearInterval(loop);
	loop = false;
}
function clearQuotes(){
	var ol = document.getElementById("quote");
	var li = ol.firstChild;
	ol.innerHTML = li.outerHTML;
}