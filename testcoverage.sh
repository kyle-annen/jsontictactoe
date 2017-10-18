#!/bin/bash
sbt jacoco
open target/jacoco/report/html/index.html
npm install
npm test
open coverage/index.html

