const hourHand=document.querySelector(".hand.hour");const minuteHand=document.querySelector(".hand.minute");const secondHand=document.querySelector(".hand.second");const indicator=document.querySelector(".indicator");let isSpinning=!1;let clockDisabled=!1;let currentTime;function updateClockHands(){if(clockDisabled)return;const secToDeg=(currentTime.seconds/60)*360;const minToDeg=((currentTime.minutes*60+currentTime.seconds)/3600)*360;const hrToDeg=((currentTime.hours%12*3600+currentTime.minutes*60+currentTime.seconds)/43200)*360;secondHand.style.transform=`rotate(${secToDeg}deg)`;minuteHand.style.transform=`rotate(${minToDeg}deg)`;hourHand.style.transform=`rotate(${hrToDeg}deg)`}
function updateTime(){const now=new Date();currentTime={hours:now.getHours(),minutes:now.getMinutes(),seconds:now.getSeconds()};updateClockHands()}
function startClock(){updateTime();if(!clockDisabled){requestAnimationFrame(clockTick)}}
function clockTick(timestamp){if(clockDisabled)return;updateTime();requestAnimationFrame(clockTick)}
function disableClock(){clockDisabled=!0;minuteHand.style.display='none';secondHand.style.display='none'}
function enableClock(){clockDisabled=!1;minuteHand.style.display='';secondHand.style.display='';startClock()}
function spin(){if(isSpinning)return;isSpinning=!0;disableClock();const minRotations=3;const maxAdditionalRotations=5;const totalRotations=minRotations+Math.random()*maxAdditionalRotations;const spinDuration=5000;const startTime=performance.now();const startRotation=getCurrentRotation(hourHand);function spinAnimation(currentTime){const elapsedTime=currentTime-startTime;const progress=Math.min(elapsedTime/spinDuration,1);const easedProgress=1-Math.pow(1-progress,3);const additionalRotation=easedProgress*totalRotations*360;const newRotation=startRotation+additionalRotation;hourHand.style.transform=`rotate(${newRotation}deg)`;if(progress<1){requestAnimationFrame(spinAnimation)}else{isSpinning=!1;const nearestHour=Math.round(newRotation/30)%12;currentTime={hours:nearestHour===0?12:nearestHour,minutes:0,seconds:0};updateClockHands();enableClock()}}
requestAnimationFrame(spinAnimation)}
function getCurrentRotation(element){const style=window.getComputedStyle(element);const matrix=new DOMMatrix(style.transform);return Math.atan2(matrix.b,matrix.a)*(180/Math.PI)}
indicator.addEventListener("click",()=>{if(!isSpinning){spin()}});startClock();