/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
//gameplaying is the state variable
var scores,roundscore,activeplayer,gamePlaying;

init();


// function btn(){

// }
// document.querySelector('.btn-roll').addEventListener('click',btn) ; //click is the type of event ,here btn()(no need to add () in a callback function) becomes a callback function as it is not called by us but by another function(a function that we pass as an argument in another function,in this case the event listener method and it will call that function for us)

//if we did not want an external function to be called by event listener then we can use anonymous function which doesnot have a name and cannot be reused like this 
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
  //1.Random number
  var dice  = Math.floor(Math.random()*6)+1;//floor removes decimals , random gives random no. between 0 and 1
  //2.Display the result
  var diceDOM =  document.querySelector('.dice');
  diceDOM.style.display = 'block'; // to bring back dice
  diceDOM.src = 'dice-'+dice+'.png'; // to select respectively right dice image according to the random number
  //3.Update the round score if the rolled number was not a 1
  if(dice !== 1){
      //Add score
      roundscore += dice;
      document.querySelector('#current-'+activeplayer).textContent = roundscore;
  }else{
      //Next player
      nextPlayer();
     
  }
    }
  
}) ;

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
    //Add current score to global score
    scores[activeplayer] += roundscore;
    //Update ui
    document.querySelector('#score-'+activeplayer).textContent = scores[activeplayer];
    //Check if the player win the game
    if(scores[activeplayer]>=100){
       document.querySelector('#name-'+activeplayer).textContent = 'Winner!'; 
       document.querySelector('.dice').style.display = 'none';
       document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner');
       document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
       gamePlaying = false;
    }else{
        //Next player
        nextPlayer();
    }
}
     
});

function nextPlayer(){
     //Next player
     activeplayer === 0 ? activeplayer=1:activeplayer=0;
     roundscore = 0;
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';
    // document.querySelector('.player-0-panel').classList.remove('active');//to remove a class from html
     //document.querySelector('.player-1-panel').classList.add('active');//to add a class to html tag
   //we can also use toggle if there is class it will remove it and if class is not there it will add it
   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
   document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click',init);// not calling init() just passing it in eventlistener method so no need to put ()[it is function call operator].here we used callback function

function init(){
    gamePlaying = true;
    scores = [0,0];//holding score of player 1 and 2
roundscore = 0;
activeplayer = 0;//to keep track of the player currently playing
//document.querySelector('#current-'+activeplayer).innerHTML = '<em>'+dice+'</em>';//em for itallics
//it is setter as setting a value

//document.querySelector('#current-'+activeplayer).textContent = dice;   //document object  is to give access to dom  , queryselector to target elements like in css,but it selects only the first element it finds and text content to change the text.'#current-'+activeplayer will give string of #current-0 or #current-1

//this is getter as we are reading 
//var x = document.querySelector('#score-0').textContent;

//to change the css 
document.querySelector('.dice').style.display = 'none';//to hide the dice

//instead of querySelector for ids you can use
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}