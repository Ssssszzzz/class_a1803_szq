/**
 * Created by Administrator on 2018/3/28 0028.
 */


let fs = require('fs');
let path = require('path');
/*console.log("当前路径",__dirname);
console.log("当前文件",__filename)*/

//fs.readFile('文件名',获取到数据后的处理函数);
//fs.writeFile('文件名',文件内容,写完字后干什么);

var mypp = path.join(__dirname,'3-28/htmlmain.html');

fs.readFile(mypp,function(err,data){
      if (err) console.error(err);
    console.log(data.toString())


});

var users = [
{name:'张三',age:18,sex:'男'},
{name:'魏红',age:18,sex:'女'},
{name:'建国',age:18,sex:'男'},
{name:'二狗',age:18,sex:'男'}
];


fs.writeFile(
    path.join(__dirname,'../mytest.json'),
    JSON.stringify(users,null),
    function(err,a){
        console.log(err,a);
    });

background