# Base image with Java 25 runtime environment
FROM eclipse-temurin:25-jre

# Set working directory inside the container
WORKDIR /minecraft

# Update package list and install curl for downloading files,
# then clean up the package cache to keep the image small
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Download Minecraft server jar from official Mojang servers (Minecraft server version 26.2)
RUN curl -o server.jar \
    https://piston-data.mojang.com/v1/objects/823e2250d24b3ddac457a60c92a6a941943fcd6a/server.jar
    

# Accept the Minecraft End User License Agreement
RUN echo "eula=true" > eula.txt

# Default environment variables for server configuration
ENV SERVER_PORT=8888
ENV MAX_MEMORY="1024M"
ENV MIN_MEMORY="1024M"
ENV MAX_PLAYERS="20"        
ENV DIFFICULTY="easy"       
ENV GAME_MODE="creative"    

COPY container-entrypoint.sh .
RUN chmod +x container-entrypoint.sh

# Expose the server port
EXPOSE ${SERVER_PORT}

# Start the Minecraft server with configured memory and port settings
ENTRYPOINT ["sh", "container-entrypoint.sh"]
