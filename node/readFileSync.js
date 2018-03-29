/**
 * Created by Administrator on 2018/3/29 0029.
 */
   //同步执行

let fs = require('fs');

let path = require('path');

let file_path = path.resolve(__dirname,'mytest.json');

let content = fs.readFileSync(file_path);

console.log(content.toString())