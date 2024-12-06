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

async function drivemde_change(status) {
    if (status === "P") {
        let drivemode = document.getElementById('drivemode_lamp');
        drivemode.textContent = "P"; 
    } else if (status === "N") {
        let drivemode = document.getElementById('drivemode_lamp');
        drivemode.textContent = "N"; 
    } else if (status === "R") {
        let drivemode = document.getElementById('drivemode_lamp');
        drivemode.textContent = "R";
    } else if (status === "D") {
        let drivemode = document.getElementById('drivemode_lamp');        
        drivemode.textContent = "D";
    } else {
        lamp_change("EPB",1)
    }
}




async function bootlo(){
    //初期設定：消灯
    lamp_change("ecomode",0)
    lamp_change("abs",0)
    lamp_change("battery",0)
    lamp_change("door",0)
    lamp_change("brake",0)
    lamp_change("EPB",0)
    lamp_change("lowbeam",0)
    lamp_change("highbeam",0)
    lamp_change("signalL",0)
    lamp_change("signalR",0)
    await sleep(450)
    //チェック用に点灯
    lamp_change("abs",1)
    await sleep(80)
    lamp_change("battery",1)
    await sleep(50)
    lamp_change("brake",1)
    await sleep(70)
    lamp_change("door",1)
    await sleep(90)
    lamp_change("EPB",1)
    await sleep(110)
    drivemde_change("P")
    await sleep(1000)
    //チェック後消灯

    lamp_change("abs",0)
    lamp_change("battery",0)
    lamp_change("brake",0)
    lamp_change("door",0)
    lamp_change("EPB",0)
}

bootlo()
