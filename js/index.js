document.querySelector('.desc').innerHTML = `
A martingale is any of a class of betting strategies that originated from and were popular in 18th century France. 

The simplest of these strategies was designed for a game in which the gambler wins the stake if a coin comes up heads and loses it if the coin comes up tails. The strategy had the gambler double the bet after every loss, so that the first win would recover all previous losses plus win a profit equal to the original stake. 

You can look up more on <a href="https://en.wikipedia.org/wiki/Martingale_(betting_system)">wiki</a>.
`;

document.querySelector('.start_btn').addEventListener('click', () => {
  document.querySelector('.intro').style.display = 'none';
});

const endowment = 100;
let minBet = 0.01;
const numberOfPlayer = 99;
let roundSpeed = 10;
let speed = 100;

let container = document.querySelector('.container');
let dashboard = document.querySelector('.dashboard');
let start = document.querySelector('.start');
let input_container = document.querySelector('.input-container');
let betInput = document.querySelector('.bet-input');
let speedInput = document.querySelector('.speed-input');

function playOneGame() {
  return Math.floor(Math.random() * 2) !== 0 ? false : true;
}

function showProcess() {
  minBet = betInput.value ? parseInt(betInput.value) : 0.01;
  console.log(minBet);

  speed = speedInput.value ? parseInt(speedInput.value) : 100;
  roundSpeed = 1000 / speed;

  input_container.style.display = 'none';
  renderInitial();
  let players = [];
  for (let i = 0; i < numberOfPlayer; i++) {
    const player = {
      bet: minBet,
      money: endowment,
    };
    players.push(player);
    let moneyBar = document.createElement('DIV');
    moneyBar.className = 'money';
    moneyBar.style.height = player.money + 'px';
    container.appendChild(moneyBar);
  }

  let round = 0;
  setInterval(() => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    renderInitial();
    for (let i = 0; i < numberOfPlayer; i++) {
      if (players[i].money < 0) {
        let moneyBar = document.createElement('DIV');
        moneyBar.className = 'initial';
        moneyBar.style.height = players[i].money + 'px';
        container.appendChild(moneyBar);
      } else {
        let win = playOneGame();
        if (win) {
          players[i].money += players[i].bet;
          players[i].bet = minBet;
        } else {
          players[i].money -= players[i].bet;
          players[i].bet = players[i].bet * 2;
        }

        let moneyBar = document.createElement('DIV');
        moneyBar.className = 'money';
        moneyBar.style.height = players[i].money + 'px';
        container.appendChild(moneyBar);
      }
    }
    round++;
    let broked = players.filter(player => {
      return player.money < 0;
    });
    dashboard.innerHTML = `Endowment: $${endowment} Bet: $${minBet} Player: ${numberOfPlayer} <br> Round: ${round} Broke: ${broked.length}`;
  }, roundSpeed);
}

function renderInitial() {
  let initialBar = document.createElement('DIV');
  initialBar.className = 'initial';
  initialBar.style.backgroundColor = 'green';
  initialBar.style.height = endowment + 'px';
  container.appendChild(initialBar);
}

start.addEventListener('click', showProcess);

// showProcess();
