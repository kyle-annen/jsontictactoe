var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require('mocha').it;
var TicTacToe = require('./tictactoe');

var htmlFileContent = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <title>JSON Javascript TicTacToe</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '<div class="container">\n' +
    '    <div class="row">\n' +
    '        <div id="cell-1" class="cell col-md-4 top-row left-row">1</div>\n' +
    '        <div id="cell-2" class="cell col-md-4 top-row">2</div>\n' +
    '        <div id="cell-3" class="cell col-md-4 top-row right-row">3</div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div id="cell-4" class="cell col-md-4 left-row">4</div>\n' +
    '        <div id="cell-5" class="cell col-md-4">5</div>\n' +
    '        <div id="cell-6" class="cell col-md-4 right-row">6</div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div id="cell-7" class="cell col-md-4 bottom-row left-row">7</div>\n' +
    '        <div id="cell-8" class="cell col-md-4 bottom-row">8</div>\n' +
    '        <div id="cell-9" class="cell col-md-4 bottom-row right-row">9</div>\n' +
    '    </div>\n' +
    '    <div class="row"><br/>\n' +
    '        <h1 id="messages">Let\'s play Tic Tac Toe!<br/><br/>Click on an open space to place token.</h1>\n' +
    '    </div>\n' +
    '</div>\n' +
    '</body>\n' +
    '</html>';

describe('[JavaScript] TicTacToe', function() {
    describe('parseResponse', function() {
        it('parses a json to a js object', function() {
            var testJson = "{ \"board\":\"1,2,3,4,5,6,7,8,9\",\"messages\":\"This is a test message\"}";
            var testBoard = "1,2,3,4,5,6,7,8,9";
            var tictactoe = new TicTacToe(testBoard);
            var parsedJson = tictactoe.parseResponse(testJson);
            expect(parsedJson.board).to.deep.equal(testBoard);
        });
    });

    describe('updateBoardState', function() {
        it('updates the board state', function() {
            var boardState = "1,2,3,4,5,6,7,8,9";
            var tictactoe = new TicTacToe(boardState);
            var testState = "X,2,3,4,5,6,7,8,9";
            tictactoe.updateBoardState(testState);
            expect(tictactoe.boardState).to.deep.equal(testState);
        });
    });

    describe('renderGame', function() {
        it('renders the board based on the server response json', function() {
            var jsdom = require('jsdom/lib/old-api.js');

            jsdom.env(htmlFileContent, function(err, window) {
                var tictactoe = new TicTacToe(window.document);
                var testBoard = "X,2,3,4,5,6,7,8,9";
                var testMessage = "Test message";
                var testJson = {};
                testJson.board = testBoard;
                testJson.messages = [testMessage];

                tictactoe.renderGame(testJson);

                var actual = window.document.getElementById("cell-1").innerHTML;
                var expected = "X";

                expect(actual).to.equal(expected);

                window.close();
            });

        });

        it('renders the messages based on the server response json', function() {
            var jsdom = require('jsdom/lib/old-api.js');

            jsdom.env(htmlFileContent, function(err, window) {
                var tictactoe = new TicTacToe(window.document);
                var testBoard = "X,2,3,4,5,6,7,8,9";
                var testMessage = "Test message";
                var testJson = {};
                testJson.board = testBoard;
                testJson.messages = [testMessage];

                tictactoe.renderGame(testJson);

                var actual = window.document.getElementById("messages").innerHTML;

                expect(actual).to.equal(testMessage);

                window.close();
            });

        });

        it('board does not contain previous versions of the board values', function() {
            var jsdom = require('jsdom/lib/old-api.js');

            jsdom.env(htmlFileContent, function(err, window) {
                var tictactoe = new TicTacToe(window.document);
                var testBoard = "X,2,3,4,5,6,7,8,9";
                var testMessage = "Test message";
                var testJson = {};
                testJson.board = testBoard;
                testJson.messages = [testMessage];

                tictactoe.renderGame(testJson);

                var actual = window.document.getElementById("cell-1").innerHTML;

                expect(actual).to.not.equal("1");

                window.close();
            });
        });
    });

    describe('renderMessages', function() {
        it('renders messages provided', function() {
            var jsdom = require('jsdom/lib/old-api.js');

            jsdom.env(htmlFileContent, function(err, window) {
                var tictactoe = new TicTacToe(window.document);
                var testMessages = ["Test message"];

                tictactoe.renderMessages(testMessages);

                var actual = window.document.getElementById("messages").innerHTML;

                expect(actual).to.not.equal(testMessages);

                window.close();
            });
        });

        it('removes previous messages when rendering new messages', function() {
            var jsdom = require('jsdom/lib/old-api.js');

            jsdom.env(htmlFileContent, function(err, window) {
                var tictactoe = new TicTacToe(window.document);
                var testMessages = ["Test message"];

                tictactoe.renderMessages(testMessages);

                var actual = window.document.getElementById("messages").innerHTML;

                expect(actual).to.equal(testMessages[0]);

                window.close();
            });
        });
    });

    describe('initializeClickListeners', function() {
      it('returns the json to send to server with the move and current board populated', function() {
          var jsdom = require('jsdom/lib/old-api.js');

          jsdom.env(htmlFileContent, function(err, window) {
              var tictactoe = new TicTacToe(window.document);
              var clickedValues = [];

              tictactoe.onCellClick = function(e) {
                  clickedValues.push(e.target.id);
              };

              tictactoe.initializeClickListeners(window.document);

              for(var i = 1; i < 10; i++) {
                  var cellId = "cell-" + i.toString();
                  window.document.getElementById(cellId).click();
              }

              expect(clickedValues.includes("cell-1"));
              expect(clickedValues.includes("cell-2"));
              expect(clickedValues.includes("cell-3"));
              expect(clickedValues.includes("cell-4"));
              expect(clickedValues.includes("cell-5"));
              expect(clickedValues.includes("cell-6"));
              expect(clickedValues.includes("cell-7"));
              expect(clickedValues.includes("cell-8"));
              expect(clickedValues.includes("cell-9"));

              window.close();
          });
      });
    });

    describe('onCellClick', function() {
        it('gets the id of the item clicked, and calls getJsonResponse', function() {
            var jsdom = require('jsdom/lib/old-api.js');

            jsdom.env(htmlFileContent, function(err, window) {
                var tictactoe = new TicTacToe(window.document);

                var valueReturned;

                tictactoe.getJsonResponse = function(move) {
                    expect(move).to.equal("1");
                };

                tictactoe.initializeClickListeners(window.document);

                window.document.getElementById("cell-1").click();

                window.close();
            });
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
    });




});
