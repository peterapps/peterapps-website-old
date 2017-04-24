var track = new Audio();

function randomSong(){
	return songs[Math.floor(Math.random() * songs.length)];
}

function newTrack(){
	if (track.pause) track.pause();
	document.getElementById("answer").style.display = "none";
	track = new Audio();
	var song = randomSong();
	track.src = "./music/" + song.file;
	document.getElementById("composer").innerHTML = song.composer;
	document.getElementById("song").innerHTML = song.name;
	var mov = document.getElementById("movement");
	if (song.movement){
		mov.innerHTML = song.movement;
		document.getElementById("movement-wrapper").style.display = "table-row";
	} else document.getElementById("movement-wrapper").style.display = "none";
	var start = 0;
	if (document.getElementById("random-minute").checked) start = Math.floor(Math.random() * (song.duration - 60));
	track.addEventListener('timeupdate', function (){
		var min = Math.floor(track.currentTime / 60) + ":";
		var sec = Math.round(track.currentTime % 60);
		if (sec < 10) sec = "0" + sec;
		document.getElementById("time").innerHTML = min + sec;
		if (track.currentTime >= start + 60) {
			track.pause();
		}
	}, false);
	var started = false;
	track.addEventListener("canplaythrough", function(){
		if (!started){
			console.log("Loaded " + track.src);
			track.currentTime = start;
			track.play();
			started = true;
		}
	});
}

function playTrack(){
	track.play();
}

function pauseTrack(){
	track.pause();
}

function seeAnswer(){
	document.getElementById("answer").style.display = "table";
}