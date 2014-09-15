var gameSize = 10;
var board = new Array(gameSize);
for (var i = 0; i < gameSize; i++) {
  board[i] = new Array(gameSize);
  for (var j = 0; j < gameSize; j++) {
    if ((i === 0 || i === gameSize - 1) || (j === 0 || j === gameSize - 1)) {
      board[i][j] = 'x';
    } else {
      board[i][j] = '_';
    }
  }
}

board[3+1][4+1] = 'S';
board[4+1][3+1] = 'S';
board[3+1][3+1] = 'S';
board[4+1][4+1] = 'S';

/*
function move(player, direction) {
  var pos = getPlayerPos(board, player);
  var nextPos = pos.slice(0);
  for(var i = 0; i < pos.length; i++) {
    nextPos[i] += direction[i];
  }
  removePlayer(board, player);
  addPlayer(board, player);
}

function getPlayerPos(board, player) {
  for(var i = 0; i < gameSize; i++) {
    for(var j = 0; j < gameSize; j++) {
      if (board[i][j] === player) {
        return [i, j];
      }
    }
  }
}

function removePlayer(board, loc) {
  board[loc[0]][loc[1]] = ' ';
}

function addPlayer(board, loc, player) {
  if (board[loc[0]][loc[1]] == 'x') {
    alert('they ded');
    return;
  }
  board[loc[0]][loc[1]] = player;
}

var turn = 0;
function processCommandString(command) {
  var rCommand = document.getElementById('command-r').textContent;
  var gCommand = document.getElementById('command-g').textContent;
  var bCommand = document.getElementById('command-b').textContent;
  var yCommand = document.getElementById('command-y').textContent;
  move('r', rCommand);
  move('g', rCommand);
  move('b', rCommand);
  move('y', rCommand);
}

function makeHTMLInput() {
  var colors = ['r', 'g', 'b', 'y'];
  var dirs = ['up', 'down', 'left', 'right', 'push'];
  colors.forEach(function(color) {
    dirs.forEach(function(dir) {
      var button = document.createElement('input');
      button.type = 'button';
      button.addEventListener('click', function() {
        move(color, dir);
      });
    });
  });
}
*/

function shouldMove() {
  var r = Math.random();
  if (r < 0.83333) {
    document.getElementById('move').textContent = 'yes ' + r;
  } else {
    document.getElementById('move').textContent = 'no ' + r;
  }
}

function runHoles() {
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board.length; j++) {
      if(board[i][j] === '1') {
        board[i][j] = 'x';
      }
      if(board[i][j] === '2') {
        board[i][j] = '1';
      }
    }
  }

  // addHoles();
  addHoleRandom();
  addHoleRandom();
  addHoleRandom();
  addHoleRandom();

  drawBoard();
}

function addHoleRandom() {
  var x = Math.floor(Math.random()*(gameSize - 2)) + 1;
  var y = Math.floor(Math.random()*(gameSize - 2)) + 1;

  if(board[x][y] !== '_') {
    return;
  }

  board[x][y] = '2';
}

function addHoles() {
  var x = Math.floor(Math.random()*4) + 1;
  var y = Math.floor(Math.random()*4) + 1;

  if(board[x][y] !== '_') {
    return;
  }

  board[x][y] = '2';
  board[9 - x][9 - y] = '2';
  board[9 - y][x] = '2';
  board[y][9 - x] = '2';
}

function drawBoard() {
  var boardText = '';

  for (var y = 0; y < gameSize; y++) {
    for (var x = 0; x < gameSize; x++) {
      boardText += '<span class="board-' + board[x][y] + '">' + board[x][y] + '</span>';
    }
    boardText += '\n';
  }
  document.getElementById('board').innerHTML = boardText;
}

document.getElementById('should-move').addEventListener('click', function() {
  shouldMove();
});

document.getElementById('add-holes').addEventListener('click', function() {
  runHoles();
});


drawBoard();
