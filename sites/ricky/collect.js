var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/Users/Peter/Library/Messages/chat.db');
var fs = require('fs');

//Ricky's phone number
var phoneNumber = "+16468860681";

var texts = [];
var handles = [];

db.all("SELECT ROWID FROM handle WHERE id='" + phoneNumber + "'", function(err1, rows1) {
	for (var i = 0; i < rows1.length; i++) handles.push(rows1[i]["ROWID"]);
	console.log(handles.length + " handles found.");
	for (var i = 0; i < handles.length; i++){
		var handle_id = handles[i];
		db.all("SELECT text, handle_id FROM message WHERE handle_id=" + handles[i], function(err, rows){
			console.log("Handle " + rows[0].handle_id);
			console.log("  " + rows.length + " rows added.");
			rows.forEach(function(row){
				if (row.text) texts.push(row.text);
			});
			console.log("  " + texts.length + " texts found.");
			fs.writeFileSync("./texts.json", JSON.stringify(texts));
			console.log("  " + "Texts saved to file.");
		});
	}
});

db.close();