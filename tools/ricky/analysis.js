var fs = require('fs');

var data = JSON.parse(fs.readFileSync("./texts.json"));
var texts = [];

//Filter out punctuation
for (var i = 0; i < data.length; i++){
	data[i] = data[i].replace(/'/g,'');
	var txt = data[i].split(/\W/);
	for (var j = 0; j < txt.length; j++){
		txt[j] = txt[j].toLowerCase();
		if (!(txt[j].length > 0)) txt.splice(j, 1);
	}
	texts.push(txt);
}

//Different occurrences
var words = {};
var totalWords = 0;
var phrases = {};
var totalPhrases = 0;
var phraseLengths = [];
var selectFromLength = {};

for (var i = 0; i < texts.length; i++){
	var txt = texts[i];
	if (txt.length > 0 && txt[0].length > 0){
		//Phrase (referring to a text)
		var phrase = txt.join(" ");
		if(!phrases[phrase]) phrases[phrase] = 0;
		phrases[phrase]++;
		phraseLengths.push(txt.length);
		totalPhrases++;
		//Word
		for (var j = 0; j < txt.length; j++){
			var word = txt[j];
			if (!selectFromLength[txt.length]) selectFromLength[txt.length] = [];
			selectFromLength[txt.length].push(word);
			if (!words[word]) words[word] = 0;
			words[word]++;
			totalWords++;
		}
	}
}
console.log(totalWords + " unique words");
console.log(totalPhrases + " unique texts");

//Different frequencies
var wordFreqs = [];
for (var i in words){
	wordFreqs.push([i, words[i]]);
}
var phraseFreqs = [];

for (var i in phrases){
	phraseFreqs.push([i, phrases[i]]);
}

//Sort frequencies
function sortFreq(a, b){
	return b[1] - a[1]; //Sort in descending order
}

wordFreqs.sort(sortFreq);
phraseFreqs.sort(sortFreq);

//Write data to file
fs.writeFileSync("./frequencies.json", JSON.stringify({
	"lengths": phraseLengths,
	"frequencies": selectFromLength
}));
/*fs.writeFileSync("./frequencies.json", JSON.stringify({
	"words": words,
	"phrases": phrases,
	"lengths": phraseLengths,
	"select": selectWords
}));*/