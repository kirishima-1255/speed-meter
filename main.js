'use strict';

var abs_info
var battery_info
var door_info
var brake_info
var EPB_info
var ecomode_info
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒 https://qiita.com/teloppy_com/items/cd483807813af5a4a38a


//ステータスは0が非表示、1が表示
async function lamp_change(type, status) {
    if (status == 1) {
        var element = document.getElementById(type + '_lamp');
        if (element === null) {
        } else {
            element.remove(); // 要素を完全に削除
            // element.style.display = 'none'; // 非表示にする場合
        }
    } else {
    var img = document.createElement('img');
    img.id = type + '_lamp';
    img.src = 'image/blocker.png';
    document.body.appendChild(img);
    }
}




async function bootlo(){
    lamp_change("abs",0)
    await sleep(1000)
    lamp_change("abs",1)
    await sleep(1000)
    lamp_change("abs",0)
}

bootlo()