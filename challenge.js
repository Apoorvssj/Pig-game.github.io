var scores,roundscore,activeplayer,gamePlaying;
var lastDice;
init();
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
  //1.Random number
  var dice  = Math.floor(Math.random()*6)+1;
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
  if(lastDice===6&&dice===6){
      scores[activeplayer]=0;
      document.querySelector('#score-'+activeplayer).textContent = scores[activeplayer];
      nextPlayer();

  }
   lastDice = dice;
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
document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    gamePlaying = true;
    scores = [0,0];//holding score of player 1 and 2
roundscore = 0;
activeplayer = 0;

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