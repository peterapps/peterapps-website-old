var fs = require('fs');
var path = require('path');
var filter = new RegExp("https://peterapps.github.io/ipa/","gi");

var files = fs.readdirSync(__dirname);
for (var i = 0; i < files.length; i++){
	var fileName = files[i];
	if (fileName.indexOf(".html") > 0){
		//Replace file contents
		var file = fs.readFileSync(fileName, 'utf8');
		fs.writeFileSync(fileName, file.replace(filter, "https://rawgit.com/peterapps/peterapps.github.io/master/ipa/"));
	}
}