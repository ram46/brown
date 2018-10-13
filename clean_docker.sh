#### Warning ** This cleans up all the docker image caches and all related data

#!/bin/bash

# Delete orphaned volumes in Docker
docker volume rm $(docker volume ls -qf dangling=true)

# Get rid of the <none> images 
docker rmi $(docker images | grep "^<none>" | awk '{print $3}') 

# For community edition
docker system prune

# Delete all containers
docker rm $(docker ps -a -q) -f
# Delete all images
docker rmi $(docker images -q) -f
