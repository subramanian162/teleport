var playerOneCurrentPosition = 1;
var playerTwoCurrentPosition = 1;
var totalCell = 100;
var tableRow = 10;
var tableColumn = 10;
var currentPlayer = 'playerTwo';

const travellingPortals = ['2'  , '4' , '9' , '13' , '20' , '28' , '40' , '51' , '63'  ,'71' , '17' , '29' , '54' , '64' , '62' , '87' , '93' , '95' , '99'];
const landingPortals = ['18' , '14' , '31' , '27' , '38' , '84' , '59' , '67' , '81' , '91' , '7' , '11' , '34' , '43' , '19' , '24' , '73' ,'75' , '78'];

const startingPortals =  ['2'  , '4' , '9' , '13' , '20' , '28' , '40' , '51' , '63'  ,'71'];
const endingPortals = ['18' , '14' , '31' , '27' , '38' , '84' , '59' , '67' , '81' , '91'];

const startingTraps = ['17' , '29' , '54' , '64' , '62' , '87' , '93' , '95' , '99'];
const endingTraps = ['7' , '11' , '34' , '43' , '19' , '24' , '73' ,'75' , '78'];

//This helps to create dynamic game Board.
$(function(){
  createBoard();
});

function createBoard(){
  var $table = $('#table');
  for(var row = 0; row<tableRow ; row++)
  {
    var $row = $('<tr/>');
    for(var col = 0; col<tableColumn ; col++)
    {
      var $cell = $('<td/>');
      $cell.addClass('cell');
      $cell.attr('id',totalCell);
      $cell.text(totalCell--);
      //Here I added respective portals in to the cell
      addAllTypeOfPortal($cell);

      if(col%2 === 0){
        $cell.addClass('even-cell')
      }
      else {
        $cell.addClass('odd-cell');
      }

      if(row%2 === 0)
      {
        $row.append($cell);
      }
      else{
        $row.prepend($cell);
      }
    }
    $table.append($row);
  }
 //Add Two character in to 1st cell for Players to start play
 addPlayerImage(playerOneCurrentPosition,'playerOne',false,0);
 addPlayerImage(playerTwoCurrentPosition,'playerTwo',false,0);
}

//This helps to add dynamic portals to our cells
function addAllTypeOfPortal($cell){
  var cellId = $cell.attr('id');

  var $portal = $('<img/>');

  $portal.addClass('portal');
  $cell.append($('<br>'));

  if(startingPortals.includes(cellId)){
    $portal.addClass('blue-portal');
    $cell.append($portal);
  }
  else if(endingPortals.includes(cellId)){
    $portal.addClass('landing-portal-one');
    $cell.append($portal);
  }
  else if(startingTraps.includes(cellId)){
    $portal.addClass('red-portal');
    $cell.append($portal);
  }
  else if(endingTraps.includes(cellId)){
    $portal.addClass('landing-portal-two');
    $cell.append($portal);
  }
  else{
    console.log('No portals in '+cellId);
  }
}

/*
 *This helps to listen the key board Events
 * Condition:
 *  case 1: Enter Key -> Player One
 *  case 2: a Key -> Player Two
 */
$(window).keypress(function(event){
  var typeOfKey = event.key;

  if(typeOfKey === 'Enter'){
    if(currentPlayer === 'playerTwo')
     playerOneClicked();
  }
  else if(typeOfKey === 'a'){
    if(currentPlayer === 'playerOne')
     playerTwoClicked();
  }
}
);

//This is trigered when player one clicked the button
function playerOneClicked() {

  currentPlayer = 'playerOne';

  var diceNumer = diceRoll(currentPlayer);
  // console.log('Player One Current Position is '+playerOneCurrentPosition);

  removePlayerImage(playerOneCurrentPosition,currentPlayer,false,0);

  var playerOneStartPosition = playerOneCurrentPosition;

  var playerOneEndPosition = playerOneCurrentPosition + diceNumer;

  // console.log('Player One End Position is '+playerOneEndPosition);
  if(playerOneEndPosition > 100)
  {
    playerOneCurrentPosition = playerOneCurrentPosition;
    addPlayerImage(playerOneCurrentPosition,currentPlayer,false,0);
  }
  else if(playerOneEndPosition === 100){
    playerOneCurrentPosition = playerOneEndPosition;
    addPlayerImage(100,currentPlayer,false,0);

    //Here I display the player winnig popup after 500 milliseconds
    setTimeout(function(){
      alert("Player One Win The Game");
      //Here I reset all the variable to its initial value and move the player cahracter in to 1st position
      reset();
    },500);
  }
  else{
    playerOneCurrentPosition = playerOneEndPosition;

    moveTheCoin(playerOneStartPosition,playerOneEndPosition,currentPlayer);
  }
  //Here I toggle the player button for their turns
  tooglePlayersButtons(currentPlayer);
}

//This is trigered when player two clicked the button
function playerTwoClicked() {

  currentPlayer = 'playerTwo';
  var diceNumer = diceRoll(currentPlayer);
  // console.log('Player Two Current Position is '+playerTwoCurrentPosition);

  removePlayerImage(playerTwoCurrentPosition,currentPlayer,false, 0);

  var playerTwoStartPosition = playerTwoCurrentPosition;

  var playerTwoEndPosition = playerTwoCurrentPosition + diceNumer;

  // console.log('Player Two End Position is '+playerTwoEndPosition);

  if(playerTwoEndPosition > 100)
  {
    playerTwoCurrentPosition = playerTwoCurrentPosition;
    addPlayerImage(playerTwoCurrentPosition,currentPlayer,false,0);
  }
  else if(playerTwoEndPosition === 100){
    playerTwoCurrentPosition = playerTwoEndPosition;
    addPlayerImage(100,currentPlayer,false,0);

    //Here I display the player winnig popup after 500 milliseconds
    setTimeout(function(){
      alert("Player Two Win The Game");
      //Here I reset all the variable to its initial value and move the player cahracter in to 1st position
      reset();
    },500);
  }
  else{
    playerTwoCurrentPosition = playerTwoEndPosition;

    moveTheCoin(playerTwoStartPosition,playerTwoEndPosition,currentPlayer);
  }
  //Here I toggle the player button for their turns
  tooglePlayersButtons(currentPlayer);
}

//This helps to check for portals in that position
function checkPortals(playerCurrentPosition,currentPlayer){

  // console.log("Check Portal function called");

  if(travellingPortals.includes(playerCurrentPosition.toString()))
  {
    // console.log("You enter in to a portal at position "+playerCurrentPosition);

    removePlayerImage(playerCurrentPosition,currentPlayer,true,0);

    blinkTheCell(playerCurrentPosition);

    var playerCurrentPosition = parseInt(landingPortals[travellingPortals.indexOf(playerCurrentPosition.toString())]);

    // console.log('You are going to position '+endingPortals[startingPortals.indexOf(playerCurrentPosition.toString())]);
    if(currentPlayer === 'playerOne')
    {
        playerOneCurrentPosition = playerCurrentPosition;
    }
    else if(currentPlayer === 'playerTwo') {
        playerTwoCurrentPosition = playerCurrentPosition;
    }
    else{
      console.log('An  Invalid player');
    }
    setTimeout(blinkTheCell(playerCurrentPosition),1000);
    addPlayerImage(playerCurrentPosition,currentPlayer,true,4000);
  }
}

//This is the reset function helps to reset all the values to initial value
function reset(){
  removePlayerImage(playerOneCurrentPosition,'playerOne',false,0);
  removePlayerImage(playerTwoCurrentPosition,'playerTwo',false,0);

  playerOneCurrentPosition = 1;
  playerTwoCurrentPosition = 1;

  addPlayerImage(playerOneCurrentPosition,'playerOne',false,0);
  addPlayerImage(playerTwoCurrentPosition,'playerTwo',false,0);

  tooglePlayersButtons('playerTwo');
}


//This helps to generate a random number between 1 to 6
function diceRoll(currentPlayer){

  var randomNumer = Math.floor(Math.random()*6)+1;
  if(currentPlayer === 'playerOne')
  {
    $('#player-one-box').text(randomNumer);
  }
  else if(currentPlayer === 'playerTwo'){
    $('#player-two-box').text(randomNumer);
  }
  else{
    console.log('Invalid player call the diceRoll function');
  }
  return randomNumer;
}

//This helps to remove the respective players image from the respective cell
function removePlayerImage(playerPosition,currentPlayer,isFromPortal,fadeTime)
{

  var $cell = $('#'+playerPosition);
  var $isExist = $cell.children('#'+currentPlayer);

  if(isFromPortal && $isExist){
      $isExist.fadeOut(fadeTime);
  }
  else if($isExist){
        $isExist.remove();
    }
    else{
      console.log("Invalid Player try to access the removePlayerImage function");
    }
}

//This help to add respective Players image in to the respective cell
function addPlayerImage(playerPosition,currentPlayer,isFromPortal,fadeTime){

  var $cell = $('#'+playerPosition);
  var $img = $('<img/>');

  if(currentPlayer === 'playerOne')
  {
    $img.addClass('player-1 bounce character');
    $img.attr('src','assets/images/player_1.png');
    $img.attr('id','playerOne');
  }
  else if(currentPlayer === 'playerTwo'){
    $img.addClass('player-2 bounce character');
    $img.attr('src','assets/images/player_2.png');
    $img.attr('id','playerTwo');
  }
  else{
    console.log('Invalid Player try to access the addPlayerImage function');
  }
  if(isFromPortal)
  {
      $img.hide().appendTo($cell).fadeIn(fadeTime);
  }
  else {
    $cell.append($img);
  }
}

//This function helps to toggle the player one and player two buttons
function tooglePlayersButtons(currentPlayer)
{
  if(currentPlayer === 'playerOne')
  {
    $('#player-one-button').prop('disabled',true);
    $('#player-two-button').removeAttr('disabled');
  }
  else if(currentPlayer === 'playerTwo'){
    $('#player-two-button').prop('disabled',true);
    $('#player-one-button').removeAttr('disabled');
  }
  else{
    console.log("Invalid Player try to access the tooglePlayersButtons function");
  }
}

//This helps to move the player from start poin to endpoint
function moveTheCoin(startPoint,endPoint,currentPlayer) {

  // console.log("statrt: "+startPoint+" end: "+endPoint+' currentPlayer is '+currentPlayer);
  setTimeout(function () {

      if (startPoint < endPoint) {
        startPoint++;
        addPlayerImage(startPoint , currentPlayer , true , 350);
        removePlayerImage(startPoint , currentPlayer , true , 350);
        //Here I did a recursion approach, in order to make the setTimeout function to work
        moveTheCoin(startPoint,endPoint,currentPlayer);
      }
   }, 400);

   if(startPoint === endPoint)
   {
     addPlayerImage(endPoint,currentPlayer,true,0);
     //Once I reaced the destination then I need to check wheather tha place contains any portal or not
     //So, I called the checkPortals function
     checkPortals(endPoint,currentPlayer);
   }
}

function blinkTheCell(cellPosition){
  var cell = $('#'+cellPosition);
  cell.toggle('odd-cell even-cell');
  setTimeout(function(){
    cell.toggle('odd-cell even-cell');
  },500);
}

// Cell Id Checer
// $('#tb').on('click','.cell' , function(){
//   var playerPosition = $(this).attr('id');
//   console.log(playerPosition);
//
// });
