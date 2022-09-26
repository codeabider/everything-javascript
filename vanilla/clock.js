const hourHandElemRef = document.querySelector('[data-hour-hand]');
const minuteHandElemRef = document.querySelector('[data-minute-hand]');
const secondHandElemRef = document.querySelector('[data-second-hand]');

const updateClock = () => {
  const now = new Date();

  const second = now.getSeconds();
  const secondRotation = second * 6; // TODO: resolve second hand rotation jump 0, 360
  setRotation(secondHandElemRef, secondRotation);

  const minute = now.getMinutes();
  const minuteRotation = (minute + second / 60) * 6;
  setRotation(minuteHandElemRef, minuteRotation);

  const hour = now.getHours();
  const hourRotation = ((hour % 12) + minute / 60) * 30;
  setRotation(hourHandElemRef, hourRotation);
};

const setRotation = (elemRef, rotation) => {
  elemRef.style.setProperty('--rotate', rotation);
};

document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  let timer = setInterval(updateClock, 1000);
});
