const hoursElem = document.getElementById('hours');
const minsElem = document.getElementById('mins');
const secsElem = document.getElementById('secs');

const actionButtonElem = document.getElementById('action');
const resetButtonElem = document.getElementById('reset');

class Timer {
  constructor() {
    this.init();

    // Note: need to bind `this` as these are being passed as CBs to event handlers
    this.handleAction = this.handleAction.bind(this);
    this.reset = this.reset.bind(this);

    this.setTimerAttrs();
    this.addEventListeners();
  }

  init() {
    this.timerInterval = null;
    this.isPaused = null;
    this.hh = 0;
    this.mm = 0;
    this.ss = 0;
    this.timeInSecs = 0;
    this.remainingTimeInSecs = 0;
  }

  handleAction() {
    // TODO: right now, `isPaused` flag is inverted at below line
    console.log({ paused: this.isPaused });
    if (this.isPaused || this.isPaused === null) {
      this.start();
    } else {
      this.pause();
    }
  }

  setTimerAttrs() {
    this.hh = +hoursElem.innerText;
    this.mm = +minsElem.innerText;
    this.ss = +secsElem.innerText;

    this.timeInSecs = this.formattedTimeInSecs;
    this.remainingTimeInSecs = this.timeInSecs;
  }

  addEventListeners() {
    actionButtonElem.addEventListener('click', this.handleAction);
    resetButtonElem.addEventListener('click', this.reset);
  }

  removeEventListeners() {
    actionButtonElem.removeEventListener('click', this.handleAction);
    resetButtonElem.removeEventListener('click', this.reset);
  }

  start() {
    this.setTimerAttrs();
    this.isPaused = false;
    actionButtonElem.innerText = 'pause';
    actionButtonElem.classList.add('pause');

    if (!this.timerInterval) {
      // Note: using arrow fn instead of below maintains `this` context
      //   this.timerInterval = setInterval(function () {
      this.timerInterval = setInterval(() => {
        if (!this.isPaused) {
          this.remainingTimeInSecs--;
          this.formatTimeToFull(this.remainingTimeInSecs);
        }

        if (this.remainingTimeInSecs <= 0) {
          this.reset();
        }

        console.log(this.remainingTimeInSecs);
      }, 1000);
    }
  }

  pause() {
    this.isPaused = true;
    actionButtonElem.innerText = 'resume';
    actionButtonElem.classList.remove('pause');
  }

  reset() {
    clearInterval(this.timerInterval);
    this.init();
    this.updateDOM(0, 0, 0);
    actionButtonElem.innerText = 'start';
    actionButtonElem.className = 'btn start';
  }

  updateDOM(hh, mm, ss) {
    hoursElem.innerText = this.formatToMinIntDigits(hh);
    minsElem.innerText = this.formatToMinIntDigits(mm);
    secsElem.innerText = this.formatToMinIntDigits(ss);
  }

  formatToMinIntDigits(str, minimumIntegerDigits = 2) {
    return str.toLocaleString('en-US', {
      minimumIntegerDigits,
      useGrouping: false
    });
  }

  formatTimeToFull(timeInSecs) {
    // ex: 10385
    const displaySecs = timeInSecs % 60; // 5
    const totalMins = Math.floor((timeInSecs - displaySecs) / 60); // 173
    const displayMins = totalMins < 60 ? totalMins : totalMins % 60; // else: 53
    const displayHrs = Math.floor(totalMins / 60);

    this.updateDOM(displayHrs, displayMins, displaySecs);
  }

  get formattedTimeInSecs() {
    return this.hh * 3600 + this.mm * 60 + this.ss;
  }
}

const timer = new Timer();
