function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    console.log('Worker sending time:', timeString); // デバッグ用
    postMessage(timeString);
}

// 初回実行
updateClock();

// 1秒ごとに更新
setInterval(updateClock, 1000);