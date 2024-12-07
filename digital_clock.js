function twoDigit(num) {
    let ret;
    if( num < 10 ) 
        ret = "0" + num; 
    else 
        ret = num; 
    return ret;
  }

let nowTime = new Date(); //  現在日時を得る
let nowHour = twoDigit( nowTime.getHours() );
let nowMin  = twoDigit( nowTime.getMinutes() );

let d_clock_view = nowHour + ":" + nowMin;