var letters = {
	"abcd": "🔠",
	"abc": "🔤",
	"ng": "🆖",
	"ok": "🆗",
	"up": "🆙",
	"cool": "🆒",
	"new": "🆕",
	"free": "🆓",
	"sos": "🆘",
	"ab": "🆎",
	"cl": "🆑",
	"wc": "🚾",
	"id": "🆔",
	"zzz": "💤",
	"atm": "🏧",
	"a": "🅰️",
	"b": "🅱️",
	"o": "🅾️",
	"p": "🅿️",
	"i": "ℹ️",
	"m": "Ⓜ️",
	"x": "❎",
	"100": "💯",
	"10": "🔟",
	"1234": "🔢",
	"0": "0️⃣",
	"1": "1️⃣",
	"2": "2️⃣",
	"3": "3️⃣",
	"4": "4️⃣",
	"5": "5️⃣",
	"6": "6️⃣",
	"7": "7️⃣",
	"8": "8️⃣",
	"9": "9️⃣",
	"!\\?": "⁉️",
	"!!": "‼️",
	"!": "❗️",
	"\\?": "❓"
};

window.addEventListener("load", function(){
	generate();
	reverse();
	document.getElementById("in").addEventListener("input", generate, false);
	document.getElementById("in2").addEventListener("input", reverse, false);
	document.getElementById("out").addEventListener("click", selectThis, false);
	document.getElementById("out2").addEventListener("click", selectThis, false);
}, false);

function generate(){
	var text = document.getElementById("in").value;
	var result = text;
	for (var l in letters){
		var rule = new RegExp(l, "gi");
		result = result.replace(rule, letters[l]);
	}
	document.getElementById("out").innerHTML = result;
}

function reverse(){
	var text = document.getElementById("in2").value;
	var result = text;
	for (var l in letters){
		var rule = new RegExp(letters[l], "gi");
		result = result.replace(rule, l);
	}
	document.getElementById("out2").innerHTML = result;
}

function selectThis(){
	var node = this;
	if (document.body.createTextRange) {
		var range = document.body.createTextRange();
		range.moveToElementText(node);
		range.select();
	} else if (window.getSelection) {
		var selection = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(node);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		console.warn("Could not select text: Unsupported browser.");
	}
}