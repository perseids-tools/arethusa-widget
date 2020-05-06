#!/bin/bash

rm -r dist/

docker-compose -f docker-compose.arethusa.yml build
docker-compose -f docker-compose.arethusa.yml run web grunt build

cd ./arethusa
bash deploy_widget.sh ../dist/arethusa
cd ..

cp -R arethusa-configs/dist dist/arethusa/configs

cp src/custom.css dist/custom.css
