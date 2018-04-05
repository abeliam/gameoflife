const grid = document.getElementById("grid")
const grid_width = 50

for (i = 0; i < grid_width; i++) {
  for (j = 0; j < grid_width; j++) {
    let cell = document.createElement("a")
    cell.classList.add("cell")
    cell.id = "cell-" + i + "-" + j
    cell.onclick = onCellClick(i, j)
    grid.appendChild(cell)
  }
}

let paused = false
let alive = 0
let steps = 0
let state = new Array()
for (i = 0; i < grid_width; i++) {
  state[i] = new Array(grid_width)
  state[i].fill(0)
}

const pauseButton = document.getElementById("pause-button")
pauseButton.addEventListener('click', () => {
  paused = !paused
  steps = 0
  pauseButton.innerHTML = (paused)? "play" : "pause";
})

const clearButton = document.getElementById("clear-button")
clearButton.addEventListener('click', () => {
  alive = 0
  for (i = 0; i < grid_width; i++) {
    for (j = 0; j < grid_width; j++) {
      if (state[i][j]) {
        onCellClick(i,j)()
      }
    }
  }
})

const gliderButton = document.getElementById("glider-button")
gliderButton.addEventListener('click', () => {
  onCellClick(10, 10)()
  onCellClick(10, 11)()
  onCellClick(9, 9)()
  onCellClick(9, 11)()
  onCellClick(8, 11)()
})

function onCellClick(i, j) {
  return function () {
    let cell = document.getElementById("cell-" + i + "-" + j)
    if (cell.classList.toggle("alive")) {
      state[i][j] = 1
      alive++
    }
    else {
      state[i][j] = 0
      alive--
    }
    document.getElementById("alive").innerHTML = alive
  }
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

function nextStep() {
  if (paused) {
    return
  }
  document.getElementById('steps').innerHTML = steps++
  let nextState = state.map(function(line) {
    return line.slice();
  })
  for (i = 0; i < grid_width; i++) {
    for (j = 0; j < grid_width; j++) {
      console.log(i)
      let nalive = state[mod(i-1, grid_width)][mod(j-1, grid_width)] + state[mod(i-1, grid_width)][mod(j , grid_width)] + state[mod(i-1, grid_width)][mod(j+1, grid_width)] + state[mod(i , grid_width)][mod(j-1, grid_width)] + state[mod(i, grid_width)][mod(j+1, grid_width)] + state[mod(i+1, grid_width)][mod(j-1, grid_width)] + state[mod(i+1, grid_width)][mod(j , grid_width)] + state[mod(i+1, grid_width)][mod(j+1, grid_width)]
      if ((state[i][j] === 0) && (nalive === 3)) {
        nextState[i][j] = 1
        alive++
      }
      if ((state[i][j] === 1) && !(nalive === 2 || nalive === 3)) {
        nextState[i][j] = 0
        alive--
      }
    }
  }
  for (i = 0; i < grid_width; i++) {
    for (j = 0; j < grid_width; j++) {
      if (state[i][j] != nextState[i][j]) {
        state[i][j] = 1 - state[i][j]
        document.getElementById("cell-" + i + "-" + j).classList.toggle("alive")
      }
    }
  }
  document.getElementById("alive").innerHTML = alive
}

window.setInterval(nextStep, 500);
