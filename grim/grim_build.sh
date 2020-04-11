#!/bin/bash
# echo "Building Grimoire UI"
# #build ionic app
# cd grim_ui/grimoire
# ionic build --prod
# cd -
#Build docker image
echo "Building Grimoire Docker Image"
docker build $@ -t grimoire:latest .