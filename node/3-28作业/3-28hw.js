/**
 * Created by Administrator on 2018/3/29 0029.
 */


let fs = require('fs');

let path = require('path');


let list_path = path.resolve(__dirname,'table.html');

let file_path = path.resolve(__dirname,'config.json');

fs.readFile(file_path,function(err,data){
        if (err) console.error(err)

    var jso = JSON.parse(data);
    var tablestr = jso.map(function(item){
        return `
        <tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.sex}</td>

        </tr>
        `

    }).reduce(function(a,b){
        return a+b;
    })


        var str = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>3-28作业</title>
</head>
<body>
        <table>${tablestr}</table>
</body>
</html>


`;
    fs.writeFile(list_path,str,function(err2,a){
        if (err2) console.error(err2)

    })




});
