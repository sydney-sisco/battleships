// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/play', express.static("public"));

// use cookie-session for encrypted cookies
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['zO2xF2xzitMI8rtGgAPQ', 'ZhfBwaFxdrWmszESYGpe'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// set up methodOverride to override with POST having ?_method=VERB
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// import helper functions
const { generateRandomString, hasActiveGame, gameIsFull } = require('./helpers');

// object databases
const gameStates = {};


//
/// Routes
//

// requests to root should set a userID cookie
app.get("/", (req, res) => {
  // if (!req.session.userID) {
    // register the user
    const newUserID = generateRandomString();
    req.session.userID = newUserID;
  // }
  res.redirect('/play');
});

// /game GET return list of games
app.get('/game', (req,res) => {
  console.log('get to /game');

  res.send('NYI');
});

// /game POST create a new game
app.post('/game', (req, res) => {

  // if player doesn't have a cookie, error
  if (!req.session.userID) {
    res.sendStatus(403)
    return;
  }

  // if player has active game, error
  if (hasActiveGame(req.session.userID)){
    res.sendStatus(400)
    return;
  }

  // create game
  const newGameID = generateRandomString();
  gameStates[newGameID] = {
    player1ID: req.session.userID,
    phase: "MATCHING"
  };

  // return the gameID to the player
  res.send(newGameID);
});


// /game PATCH add a player to an existing game
app.patch('/game/:id', (req, res) => {
  
  // if player doesn't have a cookie, error
  if (!req.session.userID) {
    res.sendStatus(403);
    return;
  }

  // if player has active game, error
  if (hasActiveGame(req.session.userID)){
    res.sendStatus(400);
    return;
  }

  // if game doesn't exist, error
  if (!gameStates[req.params.id]) {
    res.sendStatus(404);
    return;
  }

  // if game is full, error
  if (gameIsFull(req.params.id, gameStates)) {
    res.sendStatus(400);
    return;
  }

  // add the player to the game and set phase to PLANNING
  gameStates[req.params.id].player2ID = req.session.userID;
  gameStates[req.params.id].phase = 'PLANNING';


  res.json({ 
    gameState: gameStates[req.params.id]
  });
});

// /game/:id GET return the current gamestate
app.get('/game/:id', (req, res) => {
  
  // if player doesn't have a cookie, error
  if (!req.session.userID) {
    res.sendStatus(403);
    return;
  }

  // if game doesn't exist, error
  if (!gameStates[id]) {
    res.sendStatus(404);
  }
  
  // if player is not in game, error
  if (!playerInGame(req.params.id, gameStates)) {
    res.sendStatus(403);
  }

  // return gameState



});

// /game/:id POST update the gamestate
app.post('/game/:id', (req, res) => {


});

// /game/:id DELETE delete a game
app.delete('/game/:id', (req, res) => {


});

app.post('*', (req, res) => {
  console.log('how\'d you get here?');
  console.log(req.baseurl);
  res.status(404).send('How\'d you get here?');
});

app.get('/games.json', (req, res) => {
  res.send(gameStates);
})


app.listen(PORT, () => {
  console.log("Battleship app listening on port " + PORT);
});
