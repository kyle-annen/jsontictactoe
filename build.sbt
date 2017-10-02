name := "webtictactoe"

version := "0.1"

scalaVersion := "2.12.3"

resolvers += "Clojars" at "https://clojars.org/repo"

crossPaths := false

testOptions += Tests.Argument(TestFrameworks.JUnit, "-v")


libraryDependencies ++= Seq(
  "org.scalactic" %% "scalactic" % "3.0.1",
  "org.scalatest" %% "scalatest" % "3.0.1" % "test",
  "com.novocode" % "junit-interface" % "0.11" % "test",
  "org.clojars.kyleannen" % "javaserver" % "0.4.0",
  "org.clojars.kyleannen" % "tictactoe" % "0.2.1"
)