#!/bin/bash
cd /home/kavia/workspace/code-generation/lovevibe-spark-35645-5c1f43a5/lovevibe_spark_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

