/**
 * Created by Administrator on 2018/3/29 0029.
 */

let  fs = require('fs');
let  path = require('path');
let  json_path = path.resolve(__dirname,'3-28random.html')
let bgc;
    if(Math.floor(Math.random()*2+1) ==1){
            bgc = path.resolve(__dirname,'random1.json')
    }else {
            bgc = path.resolve(__dirname,'random2.json')
    }
fs.readFile(bgc,function(err,data){
    if (err) console.error(err)

        jso = JSON.parse(data)
      var bgcolor = jso.map(function(item){
            return item.background
        })


     var str = `
<!DOCTYPE html>
<html lang="en">
<style>
    body{
    background:${bgcolor}
    }
</style>
<head>
    <meta charset="UTF-8">
    <title>3-28作业</title>
</head>
<body>
</body>
</html>

`;

    fs.writeFile(json_path,str,function(err,data){
        if (err) console.log(err);
        console.log(bgc)
    })
})