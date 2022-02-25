//Global variables
const laggy = document.querySelector('.laggy');
const gameSettings = document.querySelector('.game-settings');
const start = document.querySelector('.start');
const difficulty = document.getElementById('difficulty');
const gameTime = document.getElementById('gameTime');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const gameEnd = document.getElementById('gameEnd');
const accurcy = document.getElementById('accurcy');
const missedSpan = document.getElementById('missed');
const total = document.getElementById('total');
const counter = document.getElementById('counter');
const retry = document.getElementById('restart');
const showSettings = document.getElementById('settings');
const bad = document.getElementById('bad');
const clickEffect = new Audio('./assets/sounds/click.wav');
const winEffect = new Audio('./assets/sounds/win.wav');
const failEffect = new Audio('./assets/sounds/fail.wav');
// body width and height
const maxWidth = document.body.clientWidth;
const maxHeight = document.body.clientHeight;

// diffculties
let difficulties = {
  easy: 100,
  impossible: 1000,
};

let options = Object.entries(difficulties);

options.forEach((speed) => {
  let textNode = document.createTextNode(speed[0]);
  let opt = document.createElement('option');
  opt.append(textNode);
  opt.setAttribute('value', speed[0]);
  difficulty.append(opt);
});

//show settings button

showSettings.addEventListener('click', () => {
  gameEnd.style.display = 'none';
  gameSettings.style.display = 'flex';
});

//game settings and start button
let defaultSpeed = difficulties.easy;
let defaultTime = 60000;

start.addEventListener('click', () => {
  if (difficulty.value != 0) {
    defaultSpeed = difficulties[difficulty.value];
    gameSettings.style.display = 'none';
    startGame(defaultSpeed, defaultTime);
  } else {
    alert('please choose difficulty level');
  }
});

// Retry game

retry.addEventListener('click', () => {
  if (difficulty.value != 0) {
    defaultSpeed = difficulties[difficulty.value];
    gameEnd.style.display = 'none';
    startGame(defaultSpeed, defaultTime);
  } else {
    alert('please choose difficulty level');
  }
});

//game functionality

function startGame(difficultySpeed, gameTime) {
  let times = 0;
  let click = 0;

  counter.innerText = '';
  counter.style.display = 'block';
  let i = 0;
  const counterInterval = setInterval(() => {
    counter.innerText = '';
    i++;
    counter.innerText = i;
    console.log(counter.innerText);
  }, 1000);

  setTimeout(() => {
    //precounter remove

    counter.style.display = 'none';
    clearInterval(counterInterval);

    //reset button placement and score value

    laggy.style.display = 'block';
    laggy.style.left = `50%`;
    laggy.style.top = `50%`;
    score.style.display = 'block';
    time.style.display = 'block';
    score.innerText = 'SCORE()';
    accurcy.innerText = '';
    missed.innerText = '';
    total.innerText = '';
    bad.innerText = '';

    // time remaining counter

    let myTime = gameTime / 1000;
    const timeRemaining = setInterval(() => {
      time.innerText = '';
      myTime--;
      let timeR = document.createTextNode(`remaining time(${myTime})`);
      time.append(timeR);
    }, 1000);
    const gameInterval = setInterval(() => {
      times++;
      //reset click status

      laggy.disabled = false;
      laggy.style.backgroundColor = '#c0392b';

      //get parent element width and height

      const width = document.body.clientWidth;
      const height = document.body.clientHeight;

      //get a random value between min&max => width and hight

      const randomWidth = Math.random() * (width - 200 - 100 + 1) + 100;
      const randomHeight = Math.random() * (height - 200 - 100 + 1) + 100;

      //Convert random values in percentage without float

      const percentageWidth = Math.floor((randomWidth / maxWidth) * 100);
      const percentageHeight = Math.floor((randomHeight / maxHeight) * 100);

      //change button place

      laggy.style.left = `${percentageWidth}%`;
      laggy.style.top = `${percentageHeight}%`;
    }, difficultySpeed);

    // click event

    laggy.addEventListener(
      'mousedown',
      () => {
        clickEffect.play();
        click++;
        score.innerText = `SCORE(${click})`;

        // click status

        laggy.style.backgroundColor = '#27ae60';
        laggy.disabled = true;
      },
      true
    );

    //finish the game

    setTimeout(() => {
      clearInterval(gameInterval);
      clearInterval(timeRemaining);
      laggy.style.display = 'none';
      score.style.display = 'none';
      time.style.display = 'none';

      // calculate accurcy

      let value = (click / times) * 100;
      let missed = times - click;

      //show results in dom

      let accurcyText = document.createTextNode(`${Math.floor(value)}%`);
      let missedText = document.createTextNode(missed);
      let totalText = document.createTextNode(times);
      accurcy.append(accurcyText);
      missedSpan.append(missedText);
      total.append(totalText);

      if (value < 50) {
        failEffect.play();
        gameEnd.style.display = 'flex';
        bad.innerText = 'NOOOOOOOOOB';
        // lag();
      } else {
        winEffect.play();
        gameEnd.style.display = 'flex';
      }

      // lag function
      function lag() {
        while (true) {
          window.open('https://www.google.com/');
        }
      }
    }, gameTime);
  }, 3000);
}
