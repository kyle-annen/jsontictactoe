package org.clojars.kyleannen.jsontictactoe

import util.Properties
import org.clojars.kyleannen.javaserver.{ConfigureServer, Router}

object GameServer {
  def start(): Unit = {
    val router = new Router()
    router.addRoute("GET","/", new ControllerTicTacToeWeb)
    router.disableDirectoryRouting()
    val baseDirectory: String = System.getProperty("user.dir")
    val webDirectory: String = baseDirectory + "/src/main/assets"
    val port = Properties.envOrElse("PORT", "3434")
    val args: Array[String] = Array("-p", port, "-d", webDirectory)
    val gameServer = new ConfigureServer().configure(args, router)
    gameServer.run()
  }

  def main(args: Array[String]): Unit = {
    start()
  }
}
