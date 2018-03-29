/**
 * Created by Administrator on 2018/3/23 0023.
 */


 function emit(name,targe){

    var temp = new Event(name);

    targe||(targe=window);
    targe.dispatchEvent(temp);

 }


function on(name,cb,target){

    targt || (targe==window);
    targt.addEventListener(name,cb);


}