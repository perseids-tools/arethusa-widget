#!/bin/bash

rm -r demo
mkdir demo

cp src/demo/index.html demo/
cp src/demo/treebank.xml demo/

cp -R dist/arethusa demo/arethusa

docker-compose -f docker-compose.demo.yml build
