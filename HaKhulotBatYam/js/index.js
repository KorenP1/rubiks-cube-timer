// Constants
const result = document.getElementById("result");



// Functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function timerParser(direction) {

  let args = Array.prototype.slice.call(arguments, 0);
  let finalResult;

  if (direction === "To") {

    let mcs = args[3];
    let seconds = args[2];
    let minutes = args[1];

    if (minutes == 0 ) {
      finalResult = seconds + "." + mcs;
    } else if (seconds < 10) {
      finalResult = minutes + ":0" + seconds + "." + mcs;
    } else {
      finalResult = minutes + ":" + seconds + "." + mcs;
    }
    return finalResult;
  } else if (direction === "From") {

    finalResult = args[1];

    if (! finalResult.includes(":")) {

      let mcs = Number(finalResult.split(".")[1]);
      let seconds = Number(finalResult.split(".")[0]);

      return [0, seconds, mcs];

    } else {
      
      let mcs = Number(finalResult.split(".")[1]);
      let seconds = Number(finalResult.split(".")[0].split(":")[1]);
      let minutes = Number(finalResult.split(":")[0]);

      return [minutes, seconds, mcs];

    }
  }
  else {
    throw new Error("You need to pass first argument as 'To' or 'From'")
  }
}


function scramble() {

  function randomElement(list) {
      return list[Math.floor(Math.random() * list.length)];
  }

  const moves = ["F", "R", "U", "B", "L", "D"];
  const types = ["", "'", "2"];

  let array_scramble = []

  for (let i = 0; i < 20; i++) {

    let move = randomElement(moves);
    let type = randomElement(types);

    let final_turn = move + type;

    array_scramble.push(final_turn);

    if (i > 0 && array_scramble.at(-1)[0] === array_scramble.at(-2)[0]) {
      array_scramble.pop();
      i--;
    }
  }
    
  let final_scramble = array_scramble.join(" ");

  document.getElementById("scramble").innerHTML = final_scramble;
}



async function sleepNfadeNremove(id, seconds) {

  await sleep(seconds * 1000);

  let element = document.getElementById(id);

  element.style.transition = "opacity 1s linear";
  element.style.opacity = "0";

  await sleep(1 * 1000);

  element.remove();
}



function inspection() {

  function listenerDownFunc(event) {

    if (event.code === 'Space') {

      document.removeEventListener('keydown', listenerDownFunc);

      result.style.color = "green";

    }
  }

  document.addEventListener('keydown', listenerDownFunc);

  let inspectionInterval;

  function inspectionListener() {

    result.innerHTML--;

    if (result.innerHTML === "-1") {
      clearInterval(inspectionInterval);

      result.innerHTML = "DNF";
      result.style.color = "red";

    }
  }

  function listenerUpFunc(event) {
    if (event.code === 'Space') {

      document.removeEventListener('keyup', listenerUpFunc);

      result.innerHTML = 15;
      result.style.color = "white";

      inspectionInterval = setInterval(inspectionListener, 1000);

      startTimer(inspectionInterval);

    }
  }

  document.addEventListener('keyup', listenerUpFunc);

}



function startTimer(inspectionInterval) {

  function listenerDownFunc(event) {

    if (event.code === 'Space') {

      document.removeEventListener('keydown', listenerDownFunc);

      result.style.color = "orange";

    }
  }

  function listenerUpFunc(event) {

    if (event.code === 'Space') {

      document.removeEventListener('keyup', listenerUpFunc);

      clearInterval(inspectionInterval);

      result.style.color = "white";
      result.innerHTML = 0.00;

      let cs = 0;
      let timerInterval = setInterval(upTimer, 0.01 * 1000)

      function upTimer() {
        cs++;

        let mcs = cs % 100 >= 10 ? cs % 100 : "0" + cs % 100;
        let seconds = Math.floor(cs / 100) % 60;
        let minutes = Math.floor(cs / 6000);
    
        finalResult = timerParser("To", minutes, seconds, mcs);
        
        result.innerHTML = finalResult;
      }

      stopTimer(timerInterval);

    }
  }

  document.addEventListener('keydown', listenerDownFunc);
  document.addEventListener('keyup', listenerUpFunc);

}



function stopTimer(timerInterval) {

  function listenerDownFunc(event) {

    if (event.code === 'Space') {

      document.removeEventListener('keydown', listenerDownFunc);

      clearInterval(timerInterval);

      insert(result.innerHTML);
      restart();

    }
  }

  document.addEventListener('keydown', listenerDownFunc);

}



function insert(time){

  let solvesTable = document.getElementById("solves-table");

  if (solvesTable.rows[1].cells[1].textContent === "") {
    solvesTable.rows[1].cells[1].textContent = time;
  } else if (solvesTable.rows[2].cells[1].textContent === "") {
    solvesTable.rows[2].cells[1].textContent = time;
  } else if (solvesTable.rows[3].cells[1].textContent === "") {
    solvesTable.rows[3].cells[1].textContent = time;
  } else if (solvesTable.rows[4].cells[1].textContent === "") {
    solvesTable.rows[4].cells[1].textContent = time;
  } else if (solvesTable.rows[5].cells[1].textContent === "") {
    solvesTable.rows[5].cells[1].textContent = time;
  } else {
    solvesTable.rows[1].cells[1].textContent = time;
    solvesTable.rows[2].cells[1].textContent = "";
    solvesTable.rows[3].cells[1].textContent = "";
    solvesTable.rows[4].cells[1].textContent = "";
    solvesTable.rows[5].cells[1].textContent = "";
  }
}



function updateStats() {

  let solvesTable = document.getElementById("solves-table");
  let statsTable = document.getElementById("stats-table");

  let time1 = Number(solvesTable.rows[1].cells[1].textContent);
  let time2 = Number(solvesTable.rows[2].cells[1].textContent);
  let time3 = Number(solvesTable.rows[3].cells[1].textContent);
  let time4 = Number(solvesTable.rows[4].cells[1].textContent);
  let time5 = Number(solvesTable.rows[5].cells[1].textContent);

  let sum = [time1, time2, time3, time4, time5].reduce((a, b) => a + b);
  let max = Math.max(time1, time2, time3, time4, time5);
  let min = Math.min(...[time1, time2, time3, time4, time5].filter(item => item !== 0));

  if (solvesTable.rows[1].cells[1].textContent !== "") {
    statsTable.rows[0].cells[1].textContent = min;
    statsTable.rows[1].cells[1].textContent = max;
    statsTable.rows[3].cells[1].textContent = Math.round(sum / [time1, time2, time3, time4, time5].filter(item => item > 0).length * 100.0) / 100;
  }

  if (solvesTable.rows[5].cells[1].textContent !== "") {
    statsTable.rows[2].cells[1].textContent = Math.round((sum - max - min) * 100.0 / 3) / 100;
  } else {
    statsTable.rows[2].cells[1].textContent = "None";
  }

}



async function restart() {
  updateStats();
  scramble();
  await sleep(1 * 1000);
  inspection();
}



function main() {

  // Start Event Listeners Declaration
  inspection();

  // Scramble
  scramble();

  // Loading Screen
  sleepNfadeNremove("fade", 2);

}

main();