#!/bin/bash
echo "Making mount points for Grimoire"
mkdir -p models
mkdir -p models/fasttext
mkdir -p data_files
mkdir -p data_files/audio
mkdir -p data_files/images
mkdir -p data_files/text

echo "Starting Grimoire"
docker run -p 8501:8501 -p 9000:9000 -p 9005:80 -d -v $(pwd)/data_files/:/home/data_files/ grimoire:latest