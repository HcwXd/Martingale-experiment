var container = document.querySelector(".container")

function playOneGame() {
  return (Math.floor((Math.random() * 2)) !== 0) ? false : true;
}

function startGames(number, initialMoney) {
  var bet = 1;
  var money = initialMoney;
  for (let i = 0; i < number; i++) {
    var win = playOneGame();
    if (win) {
      money += bet;
      bet = 1;
    } else {
      money -= bet;
      bet = bet * 2;
    }
  }
  return money;
}

result = [];

for (let i = 0; i < 100; i++) {
  var moneyBar = document.createElement("DIV");
  moneyBar.className = "money";
  moneyBar.style.height = startGames(100, 100) +"px";
  console.log(moneyBar.style.height);
  container.appendChild(moneyBar);
}