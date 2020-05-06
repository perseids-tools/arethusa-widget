#!/bin/bash

docker-compose -f docker-compose.arethusa.yml build
docker-compose -f docker-compose.arethusa.yml run web grunt build

cd ./arethusa
bash deploy_widget.sh ../build
cd ..

cp -R arethusa-configs/dist build/configs
