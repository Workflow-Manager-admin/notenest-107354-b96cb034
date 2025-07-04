#!/bin/bash
cd /home/kavia/workspace/code-generation/notenest-107354-b96cb034/notes_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

