package org.clojars.kyleannen.jsontictactoe

import org.clojars.kyleannen.javaserver.{ConfigureServer, Router}

object GameServer {
  def start(): Unit = {
    val router = new Router()
    router.addRoute("GET","/", new ControllerTicTacToeWeb)
    router.addRoute("POST", "/", new ControllerTicTacToeJSON)
    router.disableDirectoryRouting()
    val baseDirectory: String = System.getProperty("user.dir")
    val webDirectory: String = baseDirectory + "/src/web/"
    val args: Array[String] = Array("-p", "3434", "-d", webDirectory)
    val gameServer = new ConfigureServer().configure(args, router)
    println("Play TicTacToe at http://localhost:3434/")
    gameServer.run()
  }

  def main(args: Array[String]): Unit = {
    start()
  }
}
