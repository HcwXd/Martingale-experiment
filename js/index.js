const endowment = 100;
const minBet = 0.01;
const numberOfPlayer = 99;
const roundSpeed = 10;

var container = document.querySelector(".container");
var dashboard = document.querySelector(".dashboard");



function playOneGame() {
  return (Math.floor((Math.random() * 2)) !== 0) ? false : true;
}

// function startGames(number, initialMoney) {
//   var bet = 1;
//   var money = initialMoney;
//   for (let i = 0; i < number; i++) {
//     var win = playOneGame();
//     if (win) {
//       money += bet;
//       bet = 1;
//     } else {
//       money -= bet;
//       bet = bet * 2;
//     }
//   }
//   return money;
// }

// function showResult() {
//   renderInitial();
//   for (let i = 0; i < 100; i++) {
//     var moneyBar = document.createElement("DIV");
//     moneyBar.className = "money";
//     moneyBar.style.height = startGames(100, 100) + "px";
//     console.log(moneyBar.style.height);
//     container.appendChild(moneyBar);
//   }
// }

function showProcess() {
  renderInitial();
  var players = [];
  for (let i = 0; i < numberOfPlayer; i++) {
    const player = {
      bet: minBet,
      money: endowment
    };
    players.push(player);
    var moneyBar = document.createElement("DIV");
    moneyBar.className = "money";
    moneyBar.style.height = player.money + "px";
    container.appendChild(moneyBar);
  }


  var round = 0;
  setInterval(() => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    renderInitial();
    for (let i = 0; i < numberOfPlayer; i++) {
      if (players[i].money < 0) {
        var moneyBar = document.createElement("DIV");
        moneyBar.className = "initial";
        moneyBar.style.height = players[i].money + "px";
        container.appendChild(moneyBar);
      } else {
        var win = playOneGame();
        if (win) {
          players[i].money += players[i].bet;
          players[i].bet = minBet;
        } else {
          players[i].money -= players[i].bet;
          players[i].bet = players[i].bet * 2;
        }


        var moneyBar = document.createElement("DIV");
        moneyBar.className = "money";
        moneyBar.style.height = players[i].money + "px";
        container.appendChild(moneyBar);
      }
    }
    round++;
    var broked = players.filter(player => {
      return player.money < 0;
    })
    dashboard.innerHTML = `Endowment: $${endowment} Bet: $${minBet} Player: ${numberOfPlayer} <br> Round: ${round} Broke: ${broked.length}`;

  }, roundSpeed)
}

function renderInitial() {
  var initialBar = document.createElement("DIV");
  initialBar.className = "initial";
  initialBar.style.backgroundColor = "green";
  initialBar.style.height = endowment + "px";
  container.appendChild(initialBar);
}




showProcess();