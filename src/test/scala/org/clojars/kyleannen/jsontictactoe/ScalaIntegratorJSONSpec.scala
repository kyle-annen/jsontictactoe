package org.clojars.kyleannen.jsontictactoe

import org.scalatest.FunSpec

class ScalaIntegratorJSONSpec extends FunSpec{

  describe("parseJson") {
    it("returns a map corresponding to the JSON given") {
      val testJsonString = "{ \"board\": \"1,2,3,4,5,6,7,8,9\", \"move\": \"1\" }"

    }
  }

  describe("buildResponseJson") {
    it("formats a board and messages into a json object") {
      val testBoard: List[String] = (1 to 9).toList.map(x => x.toString)
      val testMessages: List[String] = List("Let's play TicTacToe!", "Please click an open space to move.")
      val actual = IntegratorJSON.buildResponseJson(testBoard, testMessages)
      assert(actual.contains("board"))
      assert(actual.contains("1,2,3,4,5,6,7,8,9"))
      assert(actual.contains("messages"))
      assert(actual.contains("Please click an open"))
      assert(actual.contains("play TicTacToe!"))
    }
  }


  describe("generateGameState") {
    it("generates a valid game state for the board and messages provided") {
      val testBoard: List[String] = (1 to 9).toList.map(x => x.toString)
      val resultGameState = IntegratorJSON.generateGameState(testBoard, "1")
      assert(resultGameState.humanMove == 1)
      assert(resultGameState.humanToken == "X")
      assert(resultGameState.validSubmission)
    }

    it("generates invalid submission flag if the submitted move is not available ") {
      val testBoard: List[String] = (1 to 9).toList.map(x=>x.toString)
      val testMove: String = "10"
      val resultGameState = IntegratorJSON.generateGameState(testBoard, testMove)
      assert(!resultGameState.validSubmission)

    }
  }

  describe("submitRound") {
    it("parses JSON and returns updated game in JSON") {
      val testJsonString: String = "{\"board\":\"1,2,3,4,5,6,7,8,9\",\"move\":\"1\"}"
      val result = IntegratorJSON.submitRound(testJsonString)

      assert(result.contains("board"))
      assert(result.contains("X"))
      assert(result.contains("O"))
      assert(result.contains("messages"))

    }
  }
}
