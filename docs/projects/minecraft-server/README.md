# Minecraft Server

## Table of Contents
- [Description](#description)
- [Quickstart](#quickstart)
- [Usage](#usage)
- [Connecting to the Server](#connecting-to-the-server)

## Description
This repository contains the configuration for a Minecraft Java Edition server running in a Docker container. The server is hosted on a cloud VM and is accessible on port 8888.

### Repository Contents
- `Dockerfile` - Build instructions for the Minecraft server image
- `docker-compose.yaml` - Container configuration with ports, volumes and environment variables
- `container-entrypoint.sh` - Script that writes environment variables to server.properties before starting the server
- `.gitignore` - Excludes sensitive files from the repository

## Quickstart

1. Create a new repository on [GitHub](https://github.com/new) named `minecraft-server`

2. Clone the repository:
```bash
   git clone https://github.com//minecraft-server.git
   cd minecraft-server
```

3. Start the server:
```bash
docker compose build
docker compose up -d
```

4. Connect in Minecraft with your server IP on port `8888`

## Usage

### Configuration
You can change the server settings in `docker-compose.yaml`:

```yaml
environment:
  SERVER_PORT: "8888"    # Change the server port
  MAX_MEMORY: "1024M"    # Maximum RAM (e.g. 2048M for 2GB)
  MIN_MEMORY: "1024M"    # Minimum RAM
  MAX_PLAYERS: "5"        # Maximum number of players
  DIFFICULTY: "hard"      # Game difficulty (peaceful, easy, normal, hard)
  GAME_MODE: "survival"   # Game mode (survival, creative, adventure, spectator)
```

These variables are automatically written to `server.properties` by `container-entrypoint.sh` every time the container starts.

### How server.properties works
When the container starts, `container-entrypoint.sh` runs first and writes all environment variables into `server.properties`. This means you can configure the server from outside the container without modifying any files inside it.

To use a different Minecraft version, replace the download URL in the `Dockerfile`:
```dockerfile
RUN curl -o server.jar 
```

### Useful Commands
```bash
# Start server
docker compose up -d

# Stop server
docker compose down

# View logs
docker compose logs -f mc-server

# Restart server
docker compose restart mc-server
```

## Connecting to the Server

1. Open Minecraft (client version must match the server version)
2. Go to **Multiplayer**
3. Click **Add Server**
4. Enter a **Server Name**
5. Enter the **Server Address** as `<your-server-ip>:8888`
6. Click **Join Server**

### Data Persistence
Game data is stored in a Docker volume called `minecraft-data`. This means your game progress is saved even after restarting the container.

> [!TIP]
> After stopping the server with `docker compose down`, you can confirm your world data survived by listing the existing volumes:
> ```bash
> docker volume ls
> ```
> If `minecraft-data` still shows up in the list, your data is safe. Only run `docker compose down -v` if you intentionally want to wipe the world.