const fs = require("fs");
var data = fs.readFileSync("notes.json");
var myObject = JSON.parse(data);
var args = process.argv.slice(2);
var ERROR = `
Invalid Syntax!!!`
try{

if (args[0] === "add") {
  var title = args[1];
  var body = args[2];
  var titleArr = title.split("=");
  var bodyArr = body.split("=");
  let newData = {
    title: titleArr[1],
    body: bodyArr[1],
  };

  myObject.push(newData);
  var newData2 = JSON.stringify(myObject, null, 2);
  fs.writeFile("notes.json", newData2, (err) => {
    if (err) throw err;
    console.log("New Note Created!");
  });


} else if (args[0] === "remove") {
  var title = args[1];
  var titleArr = title.split("=");

  fs.readFile("notes.json", (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    var filtered = obj.filter((item) => {
      return item.title !== titleArr[1];
    });
    console.log(filtered);
    var newData2 = JSON.stringify(filtered);
    fs.writeFile("notes.json", newData2, (err) => {
      if (err) throw err;
      console.log("Note removed!");
    });
  });
 
} else if (args[0] === "list") {
    fs.readFile("notes.json", (err, data) => {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log("Your Notes:");
        for (let i = 0; i < obj.length; i++) {
            console.log(obj[i].title);
        }      
    }) 


} else if (args[0] === "read") {
    var title = args[1];
    var titleArr = title.split("=");

    fs.readFile("notes.json", (err, data) => {
        if (err) throw err;
        obj = JSON.parse(data);
        var result = obj.filter(function(e){return e.title == titleArr[1]})
        console.log(result[0].body); 
    })


} else {
  console.log(ERROR);
}
}catch(err){
  console.log(ERROR)
}
