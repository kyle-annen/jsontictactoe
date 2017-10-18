# JSON TicTacToe 
[![Build Status](https://travis-ci.org/kyle-annen/jsontictactoe.svg?branch=master)](https://travis-ci.org/kyle-annen/jsontictactoe)
[![Coverage Status](https://coveralls.io/repos/github/kyle-annen/jsontictactoe/badge.svg?branch=codacy)](https://coveralls.io/github/kyle-annen/jsontictactoe?branch=codacy)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/45e22d39b070466094762b4bdfa75e64)](https://www.codacy.com/app/kyle-annen/jsontictactoe?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kyle-annen/jsontictactoe&amp;utm_campaign=Badge_Grade)

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

### Run tests:

All tests are run through `sbt`.

```
sbt test
```

### Coverage:

Coverage has been automated through a shell script. From the root directory call:

```
sh testcoverage.sh
```

# Deployment

Deployment is automated as well, though login through Heroku Cli and Clojars authentication is needed.

```
sh deploy.sh
```


