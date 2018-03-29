/**
 * Created by Administrator on 2018/3/27 0027.
 */
var canvs = document.getElementById("can");
var ctx = canvs.getContext("2d");

var ScoreOption={
    0:20,
    1:50,
    2:100,
    3:800,
    4:2000
}

/**
 * 画棋盘
 */
function drawPan() {
    ctx.strokeStyle = "#666";
    for (var i = 0; i < 15; i++) {
        let x1 = 15, x2 = 435, y = 30 * i + 15;
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke(); //画横线

        ctx.beginPath();
        ctx.textAlign="center";
        ctx.fillText(i,i*30+15,5); //水平的行号
        ctx.closePath();

        ctx.moveTo(y, x1);
        ctx.lineTo(y, x2);
        ctx.stroke(); //画竖线

        ctx.beginPath();
        ctx.textBaseline="middle";
        ctx.fillText(i,5,y); //垂直的行号
        ctx.closePath();
    }
}
drawPan();

var G = {
    black : false
};

canvs.onclick = function(e){//盘面的点击事件
    var x= e.offsetX,
        y= e.offsetY;
    x=Math.floor(x/30);
    y=Math.floor(y/30);
    //这个点是不是已经落子了
    var p =  getPoints(x,y);
    if(p.color!=0)return;
    drawZi(x,y,(G.black=!G.black));

    $E.emit('luo-zi-over',x,y,G.black);//触发落子事件
};


//8,3
function drawZi(x,y,black) {//画子
    if(!(x>=0 && x<15 &&y>=0 && y<15)) throw "超出取值范围"
    x=x*30+15;
    y=y*30+15;
    ctx.beginPath();
    if(black){
        ctx.arc(x, y, 13, 0, 2 * Math.PI);
    }else{
        ctx.arc(x, y, 11, 0, 2 * Math.PI);
    }

    ctx.closePath();
    //var cgt = ctx.createRadialGradient(x,y,8,x,y,0);
    //cgt.addColorStop(0,"#333");
    //cgt.addColorStop(1,"#aaa");
    if(black){
         ctx.fillStyle = "#333";
    }else{
        ctx.fillStyle = "#eee";
        ctx.lineWidth = "5";
        ctx.stroke();
    }
    ctx.fill();
}


(function(w){

    var points = [];//所有的點
    var fangAns = [];//所有的方案
    var pointOne = [];
    function Point(x,y){//点对象
        this.x = x;
        this.y = y;
        this.fangAns = [];//该点所经过的所有的方案
        this.color = 0;// 0:all,1:black,2:white
        this.add=function(fangAn){
            this.fangAns.push(fangAn);
        }
        this.pingFen = function(){
            this.score = 0;
            // 方案多的
            // 方案的step多的
            this.score += this.fangAns.map(function (fangan) {
                if(fangan.color==3)return 0;//废弃的方案没分
                return ScoreOption[fangan.step];
            }).reduce(function (p,c) {
                return p+c;
            });
            // 没有被限制的
            // 是不是自己的

        }
    }
    function getPoints(x,y){
        return points[x][y];
    }
    function FangAn(){
        this.points=[];
        this.step  = 0;
        this.color = 0;//0:all,1:black,2:white,3:all-non
        this.add=function(x,y){
            var p = getPoints(x,y);//获取一个点
            this.points.push(p);//将点添加到数组
            p.add(this);//在点中添加本方案
        }
    }
    var fangan = null;
    for(var i =0;i<15;i++){//把所有的子装入容器
        points[i]=[];
        for(var j=0;j<15;j++){
            points[i][j]=new Point(i,j);//装入二维数组
            pointOne.push(points[i][j]);//装入一维数组
        }
    }

    for(var x=0;x<15;x++){
        for(var y=0;y<11;y++){
            //加入一竖：x不动，y+1
            fangan = new FangAn();
            for(var k=0;k<5;k++){
                fangan.add(x,y+k);//.points.push(new Point(x,y+k));
            }
            fangAns.push(fangan);
        }
    }

    for(var x=0;x<15;x++){
        for(var y=0;y<11;y++){
            //加入一竖：x不动，y+1
            fangan = new FangAn();
            for(var k=0;k<5;k++){
                fangan.add(y+k,x);//.points.push(new Point(y+k,x));
            }
            fangAns.push(fangan);
        }
    }

    for(var x=0;x<11;x++){
        for(var y=0;y<11;y++){
            //加入一竖：x不动，y+1
            fangan = new FangAn();
            for(var k=0;k<5;k++){
                fangan.add(x+k,y+k);//.points.push(new Point(x+k,y+k));
            }
            fangAns.push(fangan);
        }
    }
    for(var x=14;x>3;x--){
        for(var y=0;y<11;y++){
            //加入一竖：x不动，y+1
            fangan = new FangAn();
            for(var k=0;k<5;k++){
                fangan.add(x-k,y+k);//.points.push(new Point(x-k,y+k));
            }
            fangAns.push(fangan);
        }
    }
    w.fangAns = fangAns;
    w.getPoints = getPoints;
    w.pointOne = pointOne;
    //console.log(fangAns);
})(window);



 $E.on('luo-zi-over',function(x,y,black){
    //alert(`${x}:${y}-${black}`);
    var points = getPoints(x,y);
    points.color = black?1:2;
     var over = points.fangAns.some(function(item){
        //如果5子相连就成了
             var color = black?1:2;
                // 否则
        //    就把方案的color改成己方的
             if(item.color==3){

             }else if(item.color!=color&&item.color!=0){//duifang
                item.color=3;
             }else {//all,self
                item.color=color;
                item.step ++;
             }

             //    把方案的完成程度进行修改

            if(item.step==5)
                return true;
     });
    if(over)
        $E.emit('game-over',black);
    else if(black){
        $E.emit('place-start-your-play');
    }

 });

  $E.on('game-over',function(black){
        alert(`游戏结束${black?"黑方":"白方"}赢了`);
  });
  //电脑走棋
  $E.on('place-start-your-play',function(){
        //如果是白棋的方案达到了4个就直接下这个方案
       pointOne= pointOne.filter(function (point) {
            return point.color==0;
        });
        //每次评分之前，要把以前的评分丢掉
        for(var i in pointOne){
            pointOne[i].pingFen();
        }
        pointOne.sort(function (a,b) {

            return  b.score-a.score;
        });

        drawZi(pointOne[0].x,pointOne[0].y,(G.black=!G.black)) ;
        $E.emit('luo-zi-over',pointOne[0].x,pointOne[0].y,false);
  });