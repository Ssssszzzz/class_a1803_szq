/**
 * Created by Administrator on 2018/3/28.
 */

    let fs = require('fs');
    let path = require('path');
    var users;
    var mypp = path.join(__dirname,'config.JSON');

    fs.readFile(mypp,function(err,data){
        if(err) console.log(err);
       users=JSON.parse(data)
       //console.log(users)
    });



var str;

for(var i = 0;i<users.length;i++){
        str+="<tr>"
        str="<th><td>"+users[i].name+"</td><td>"+users[i].age+"</td><td>"+users[i].sex+"</td></th>"
        str+="</tr>"
        document.getElementById('tablelist').innerHTML+=str;
}