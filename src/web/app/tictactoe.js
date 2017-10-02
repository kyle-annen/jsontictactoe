'use strict';

function TicTacToe(board) {
    this.boardState = board;
}

TicTacToe.prototype.parseResponse = function(data) {
    return JSON.parse(data);
};

TicTacToe.prototype.updateBoardState = function(board) {
    this.boardState = board;
};

TicTacToe.prototype.renderGame = function(responseJson)  {
    console.log(responseJson);
    this.updateBoardState(responseJson.board);
    var board = responseJson.board.split(",");
    for (var j = 0; j < board.length; j++) {

        var cellIdName = "cell-" + (j + 1).toString();
        var cellRef = document.getElementById(cellIdName);
        cellRef.innerHTML = board[j];
    }
    var messagesRef = document.getElementById("messages");
    var messagesValues = responseJson.messages.join("<br/>");
    messagesRef.innerHTML = messagesValues;
};

TicTacToe.prototype.generateJSON = function(move) {
    var json = {};
    json.board = this.boardState;
    json.move = move;
    return json;
};

TicTacToe.prototype.getJsonResponse = function(move) {
    var url = "http://localhost:3434/";
    var requestJson = this.generateJSON(move);
    var requestJsonString = JSON.stringify(requestJson);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var response = xhr.responseText;
        console.log(response);
        var responseJson = JSON.parse(response);
        console.log(responseJson);

        if (xhr.readyState === 4 && xhr.status === 200) {
            tictactoe.renderGame(responseJson);
        }
    };
    xhr.send(requestJsonString);
};

TicTacToe.prototype.onCellClick = function(e) {
    var clickedId = e.target.id;
    var move = clickedId[clickedId.length - 1];
    console.log("yout clicked: " + move);
    this.getJsonResponse(move);
};

var startDisplayBoard = "1,2,3,4,5,6,7,8,9";

var tictactoe = new TicTacToe(startDisplayBoard);


document.addEventListener("DOMContentLoaded", function () {
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.addEventListener('click', function (e) {
            tictactoe.onCellClick(e);
        });
    }
    tictactoe.getJsonResponse("");
});

// module.exports = TicTacToe;
