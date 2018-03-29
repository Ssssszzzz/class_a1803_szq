/**
 * Created by Administrator on 2018/3/26 0026.
 */


(function(w){
    var events={};

    function emit(name){ //触发事件

        for(var i in events[name]){

            var args = Array.prototype.slice.apply(arguments,[1]);
            events[name][i].apply(w,args);
        }

    }
    function on(name,cb){       //绑定事件的处理函数
            events[name]||(events[name]=[]);

        events[name].push(cb);
    }
        w.$E={
            emit:emit,
            on:on
        }

})(window);

//    $E.on('fanshule',function(a,b){
//
//    });
//
//$E.emit('fanshule',18,22,22);
