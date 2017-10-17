#!/bin/bash
sbt assembly deployHeroku
sbt makePom
cp target/jsontictactoe*.pom pom.xml
mvn deploy -DskipTests