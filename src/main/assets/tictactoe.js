'use strict';

function TicTacToe(documentObject) {
    this.boardState = "1,2,3,4,5,6,7,8,9";
    this.documentObject = documentObject;
}

TicTacToe.prototype.parseResponse = function(data) {
    return JSON.parse(data);
};

TicTacToe.prototype.updateBoardState = function(board) {
    this.boardState = board;
};

TicTacToe.prototype.renderGame = function(responseJson)  {
    this.updateBoardState(responseJson.board);
    var boardArray = responseJson.board.split(",");
    this.renderBoard(boardArray);
    this.renderMessages(responseJson.messages);
};

TicTacToe.prototype.renderMessages = function(messages) {
    if (messages.includes("Game Over")) { messages.push("<a href='/'>Restart Game</a>")}
    var messagesReference = this.documentObject.getElementById("messages");
    messagesReference.innerHTML = messages.join("<br/>");
};


TicTacToe.prototype.renderBoard = function(board) {
    for (var j = 0; j < board.length; j++) {
        var cellIdName = "cell-" + (j + 1).toString();
        var cellRef = this.documentObject.getElementById(cellIdName);
        cellRef.innerHTML = board[j];
    }
};

TicTacToe.prototype.generateJSON = function(move) {
    var json = {};
    json.board = this.boardState;
    json.move = move;
    return json;
};

TicTacToe.prototype.getJsonResponse = function(move) {
    var url = "http://protected-anchorage-62016.herokuapp.com/";
    var requestJson = this.generateJSON(move);
    var requestJsonString = JSON.stringify(requestJson);
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("POST", url, true);
    xmlRequest.setRequestHeader('Content-type','text/plain');
    xmlRequest.onload = function () {
        var response = xmlRequest.responseText;
        var responseJson = JSON.parse(response);
        if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
            tictactoe.renderGame(responseJson);
        }
    };
    xmlRequest.send(requestJsonString);
};

TicTacToe.prototype.onCellClick = function(e) {
    var clickedId = e.target.id;
    var move = clickedId[clickedId.length - 1];
    this.getJsonResponse(move);
};

TicTacToe.prototype.initializeClickListeners = function(documentObject) {
    documentObject.addEventListener("DOMContentLoaded", function () {
        var cells = documentObject.getElementsByClassName("cell");
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            cell.addEventListener('click', function (e) {
                tictactoe.onCellClick(e);
            });
        }
        tictactoe.getJsonResponse("");
    });
};

//sets the exports based on environment
if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
        exports = module.exports = TicTacToe;
    }
    exports.TicTacToe = TicTacToe;
}
else {
    root.TicTacToe = TicTacToe;
}