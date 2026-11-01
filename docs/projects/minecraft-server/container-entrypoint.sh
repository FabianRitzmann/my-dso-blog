#!/bin/sh

# Schreibe Werte in server.properties
echo "max-players=${MAX_PLAYERS}" > server.properties
echo "difficulty=${DIFFICULTY}" >> server.properties
echo "gamemode=${GAME_MODE}" >> server.properties
echo "server-port=${SERVER_PORT}" >> server.properties

exec java -Xmx${MAX_MEMORY} -Xms${MIN_MEMORY} -jar server.jar --nogui