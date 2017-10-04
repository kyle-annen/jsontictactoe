var board = "1,2,3,4,5,6,7,8,9";
var tictactoe = new TicTacToe(document);
tictactoe.initializeClickListeners(document);


 window.onload=function(){
     $(function(){
         if(window.location.protocol==="https:")
             window.location.protocol="http";
     });
 }