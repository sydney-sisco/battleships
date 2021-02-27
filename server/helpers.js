const generateRandomString = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomChars = [];

  for (let i = 0; i < 6; i++) {
    randomChars.push(chars[Math.floor(Math.random() * chars.length)]);
  }
  return randomChars.join('');
};

const hasActiveGame = (playerID, gameStates) => {

  // search through gameStates to find playerID
    //return true

  
  return false;
};

const gameIsFull = (gameID, gameStates) => {

  if (gameStates[gameID].player2ID) {
    return true;
  }
  
  return false;
};

module.exports = { generateRandomString,  hasActiveGame, gameIsFull };
