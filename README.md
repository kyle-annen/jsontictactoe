# JSON TicTacToe [![Build Status](https://travis-ci.org/kyle-annen/jsontictactoe.svg?branch=master)](https://travis-ci.org/kyle-annen/jsontictactoe)a

A JavaScript TicTacToe game client and server.  The server is ran from a compiled Jar, and the client is served to a browser pointed at the root of the webserver addresss.

# Installation

Requirements:

- Scala 2.11.2 +
- SBT
- npm


Clone repository.  Then package the jar into a fat-jar (containing all dependencies):

```
sbt assembly
```

Run the jar with Java.

```
java -jar target/jsontictactoe-assembly-X.X.jar
```

# Testing

Testing requires npm for creating a mock DOM.


Install dependencies:

```
npm install
```

Run tests:

```
sbt test
```