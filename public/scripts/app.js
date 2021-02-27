const BOARD_SIZE = 10;

$(document).ready(function() {
  console.log('We\'re ready.');

  
  createGameBoard($('.player'));
  createGameBoard($('.opponent'));

  // form submission for new game
  $('.new-game').submit(newGameHandler);
});


const newGameHandler = (event) => {
  event.preventDefault();

  $.post('/game')
  .then((data) => {
    // const res = JSON.parse(data);
    console.log(data);
    $('.gameID').text(`gameID: ${data}`);
  })
  .catch((data) => {
    console.log('catch:', data);
  });
}

const createGameBoard = ($board) => {

  for(let i = 0; i < BOARD_SIZE; i++) {
    for(let j = 0; j < BOARD_SIZE; j++) {
      const $boardSquare = $('<div class="square"></div>').text(`${i}, ${j}`);
      $($board).append($boardSquare);
    }
  }
};

const updateGameBoard = ($board, gameState) => {
  // loop through gameState and update $board
  
};