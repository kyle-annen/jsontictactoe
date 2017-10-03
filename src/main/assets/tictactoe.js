'use strict';

function TicTacToe(board, documentObject) {
    this.boardState = board;
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
    var board = responseJson.board.split(",");
    for (var j = 0; j < board.length; j++) {
        var cellIdName = "cell-" + (j + 1).toString();
        var cellRef = document.getElementById(cellIdName);
        cellRef.innerHTML = board[j];
    }
    var messagesReference = document.getElementById("messages");
    messagesReference.innerHTML = responseJson.messages.join("<br/><br/>");
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
        var responseJson = JSON.parse(response);
        if (xhr.readyState === 4 && xhr.status === 200) {
            tictactoe.renderGame(responseJson);
        }
    };
    xhr.send(requestJsonString);
};

TicTacToe.prototype.onCellClick = function(e) {
    var clickedId = e.target.id;
    var move = clickedId[clickedId.length - 1];
    this.getJsonResponse(move);
};

TicTacToe.prototype.start = function(documentObject) {
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

if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
        exports = module.exports = TicTacToe;
    }
    exports.TicTacToe = TicTacToe;
}
else {
    root.TicTacToe = TicTacToe;
}