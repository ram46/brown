# brown

### How to clone
`git clone --recurse-submodules git@github.com:ele-one/brown.git`

or

#### Steps
- `git clone <your_forked_repo>`
- `git remote add upstream git@github.com:ele-one/brown.git`
- (verify this) `git submodule add <your_forked_brown> (to get the brown folder)`
-  `git remote add upstream git@github.com:ele-one/brown.git`
- `git submodule init`
- `git submodule update --remote`
- `git status`
- `git push origin master --recurse-submodules=check` (safer - can also do regular git pull/push)



### Dev Setup


#### Dependencies
- install docker
- install docker-compose
- install mysql-server


Next:

If using mysql-server on localhost,

- Create database e.g. 'brown' and 'user_sessions' and create a env files gateway_db_local.env and crud_db_local.env and update the fields accordingly. Use same same db name created before. Example .env files can be found in repo.

- Use docker-compose.yml file and for that run ```docker-compose up```

If using AWS RDS MySQL,

- Create database e.g. 'brown' and 'user_sessions' and create a env files gateway_db_aws.env and crud_db_aws.env and update the fields accordingly. Use same same db name created before. Example .env files can be found in repo.

- Use docker-compose-aws.yml file and for that run ```docker-compose -f docker-compose-aws.yml up```



NOTE: nginx is dependent on splunk service and splunk takes few seconds to start, therefore first time docker-compose up fails to start nginx.
Wait for few seconds and try again.


### Other dependencies

Add https://localhost:7777 and http://localhost:7777 in OAuth 2.0 client IDs (inside Google Developer Console). DO NOT add IPs, only domain name works. If using EC2 or a dedicated domain name, add them as well.

```sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout brown/apiGateway/nginx/ele-one-brown.com.key -out brown/apiGateway/nginx/ele-one-brown.com.crt```


#### Dev Help

```
docker container ls
docker image ls
sh clean-docker.sh //script included in repo to clean all image and containers
docker exec -it crud-node bash

```



