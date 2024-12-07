function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    // メインスレッドに時刻を送信
    postMessage(timeString);
}

// 1秒ごとに更新
setInterval(updateClock, 1000);
// 初回実行
updateClock();