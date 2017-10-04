package org.clojars.kyleannen.jsontictactoe

import org.clojars.kyleannen.tictactoe.{GameState, TicTacToeAPI, Board}


object IntegratorJSON {

  def submitRound(json: String): String = {
    val jsonArray = json.substring(2, json.length-1).split(": |:|\",\"|\"").filter(_.nonEmpty)
    val jsonMap: Map[String, String] = Map(jsonArray(0) -> jsonArray(1), jsonArray(2) -> jsonArray(3))
    val receivedBoard: List[String] = jsonMap("board").split(",").toList
    val receivedMove = jsonMap("move")
    val initialGameState = generateGameState(receivedBoard, receivedMove)
    val resultGameState = TicTacToeAPI.playRound(initialGameState)
    this.buildResponseJson(resultGameState.board, resultGameState.messages)
  }

  def generateGameState(board: List[String], humanMove: String): GameState = {
    val validSubmission =
      humanMove.toInt > 0 &&
        humanMove.toInt < 10 &&
        board.length == 9 &&
        Board.returnValidInputs(board).contains(humanMove)

    new GameState(
      board = board,
      gameOver = false,
      messages = List(),
      humanMove = humanMove.toInt,
      computerMove = -1,
      humanToken = "X",
      computerToken = "O",
      gameOutcome = "none",
      gameWinner = "none",
      validSubmission = validSubmission,
      language = "EN")
  }

  def buildResponseJson(board: List[String], messages: List[String]): String = {
    val boardString = board.mkString(",")

    val gameRestartHTML = "<a href='/'>Restart Game</a>"

    val messagesString = messages.map(x => "\"" + x + "\"").mkString(", ")
    val messagesStringWithRestart = addRestartGameCodeIfNeeded(messagesString, gameRestartHTML)

    "{ \"board\": \"" + boardString + "\", \"messages\": [" + messagesStringWithRestart + "]}"


  }

  def addRestartGameCodeIfNeeded(htmlString: String, gameRestartHtml: String): String = {
    if(htmlString.contains("Game Over")) {
      htmlString + ", \"" + gameRestartHtml + "\""
    } else {
      htmlString
    }
  }
}
