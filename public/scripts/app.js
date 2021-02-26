const BOARD_SIZE = 10;

$(document).ready(function() {
  console.log('We\'re ready.');

  createGameBoard($('.player'));
  createGameBoard($('.opponent'));
});


const createGameBoard = ($element) => {

  for(let i = 0; i < BOARD_SIZE; i++) {
    for(let j = 0; j < BOARD_SIZE; j++) {
      const $boardSquare = $('<div class="square"></div>').text(`${i}, ${j}`);
      $($element).append($boardSquare);
    }
  }
};
