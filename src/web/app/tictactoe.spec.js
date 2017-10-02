var expect = require('chai').expect;
var TicTacToe = require('./tictactoe');


describe('tictactoe', function() {
    describe('updateBoardState', function(){
        it('updates the board state', function() {
            var boardState = "1,2,3,4,5,6,7,8,9";
            var tictactoe = new TicTacToe(boardState);
            var testState = "X,2,3,4,5,6,7,8,9";
            tictactoe.updateBoardState(testState);
            expect(tictactoe.boardState).to.deep.equal(testState);
        });
    });

    describe('generateJSON', function() {
        var board = "1,2,3,4,5,6,7,8,9";
        var move = "1";
        var sut = new TicTacToe(board);
        var jsonResponse = sut.generateJSON(move);
        it('generates a JSON for the request with a board value', function() {
            expect(jsonResponse.board).to.equal(board);
        });
        it('generates a JSON for the request with a move value', function() {
            expect(jsonResponse.move).to.equal("1");
        });
        console.log(jsonResponse);
    });

    describe('getJsonResponse', function() {
        it('sends a JSON request and receives a JSON response', function() {
            var boardState = "1,2,3,4,5,6,7,8,9";
            var move = "1";
            var ticTacToe = new TicTacToe(boardState);
            var jsonResult = ticTacToe.getJsonResponse(move);
            console.log(jsonResult);
            expect(jsonResult.board[0]).to.equal("X");
        });
    });
});
