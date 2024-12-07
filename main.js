'use strict';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒 https://qiita.com/teloppy_com/items/cd483807813af5a4a38a


//ステータスは0が非表示、1が表示
async function lamp_change(type, status) {
    if (status == 1) {
        var element = document.getElementById(type + '_lamp');
        if (element === null) {
        } else {
            element.remove();
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

async function bootanimation_circ(){
    //メータを最初は隠しておく
    var img = document.createElement('img');
    img.id = "circ_center";
    img.src = 'image/circ_center.png';
    document.body.appendChild(img);
    await sleep(1000)
    img.style.opacity = '0';

}
async function bootanimation_needle(){

    //起動時に針を回す
    const image = document.getElementById('speedmeter_needle'); // 針画像
    await sleep(1000)
    image.animate(
        // 途中の状態を表す配列
        
        [
            { transform: 'rotate(-203deg)' },
            { transform: 'rotate(-203deg)' },
            { transform: 'rotate(23deg)' },
            { transform: 'rotate(-203deg)' }
        ], 
        // タイミングに関する設定
        {
          fill: 'backwards', // 再生前後の状態（再生前、開始時の状態を適用）
          duration: 1500, // 再生時間（1000ミリ秒）
        },
      );
}
async function winker(){
    // var audio = new Audio('sound/turn_signal.mp3');
    // audio.load();
    // audio.play();

    lamp_change("signalL",1)
    lamp_change("signalR",1)
    await sleep(385)
    lamp_change("signalL",0)
    lamp_change("signalR",0)
    await sleep(385)
}

async function bootloader() {
    await bootanimation_circ()
    await bootanimation_needle()
    await bootlo()
    await lamp_change("lowbeam",1)
    for (let i = 0; i < 20; i++) {
        winker()
        await sleep(770)
    }
}

bootloader()

function digital_clock() {
    const myWorker = new Worker('digital_clock.js');
    const clockElement = document.getElementById('d_clock');
    
    myWorker.onmessage = function(e) {
        clockElement.textContent = e.data;
    };
}

// DOMContentLoaded イベントで確実に要素が存在する状態で実行
document.addEventListener('DOMContentLoaded', digital_clock);

