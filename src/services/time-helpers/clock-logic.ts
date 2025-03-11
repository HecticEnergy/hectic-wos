import type { Time } from "@/models";

export class Clock {
  #interval: number | undefined | NodeJS.Timeout;
  #startTimer: number | undefined | NodeJS.Timeout;
  #setClock: (time: Time) => void = () => {};
  #getTime: () => Time = () => ({ hours: 0, minutes: 0, seconds: 0 });

  constructor(setClock: (time: Time) => void, getTime: () => Time) {
    this.#setClock = setClock;
    this.#getTime = getTime;
    this.#runClock();
    this.restartClock();
  }

  #updateClock = () => {
    this.#setClock(this.#getTime());
  };

  #runClock = () => {
    this.#updateClock();
    if (this.#interval) {
      clearInterval(this.#interval);
    }
    this.#interval = setInterval(() => {
      this.#updateClock();
    }, 1000);
  };

  restartClock = () => {
    this.#updateClock();
    if (this.#startTimer) {
      clearTimeout(this.#startTimer);
    }
    //start the clock in line with browser time - keep all clocks in sync
    this.#startTimer = setTimeout(() => {
      this.#runClock();
      this.#startTimer = undefined;
    }, 1005 - new Date().getMilliseconds());
  };

  stopClock = () => {
    this.destroy();
  };

  destroy = () => {
    if (this.#interval) {
      clearInterval(this.#interval);
      this.#interval = undefined;
    }
    if (this.#startTimer) {
      clearTimeout(this.#startTimer);
      this.#startTimer = undefined;
    }
  };
}
