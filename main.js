'use strict';

var abs_info
var battery_info
var door_info
var brake_info
var EPB_info
var ecomode_info
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒 https://qiita.com/teloppy_com/items/cd483807813af5a4a38a


//absのステータスは0が非表示、1が表示
async function abs_lamp_change(status) {
    if (status == 1) {
        var element = document.getElementById('abs_lamp');
        if (element) {
            element.remove(); // 要素を完全に削除
            // element.style.display = 'none'; // 非表示にする場合
        }
    }else{
    document.write('<img id="abs_lamp" src="image/blocker.png">')
    }
}

async function bootlo(){
    abs_lamp_change(1)
    await sleep(1000)
    abs_lamp_change(0)
}

bootlo()