#!/bin/bash

rm -r dist/

docker-compose -f docker-compose.arethusa.yml build
docker-compose -f docker-compose.arethusa.yml run arethusa grunt build

cd ./arethusa
bash deploy_widget.sh ../dist/arethusa
cd ..

cp -R arethusa-configs/dist dist/arethusa/configs

cp src/widget.css dist/arethusa/css/widget.css
