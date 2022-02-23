.PHONY: up
up:
	docker-compose up

.PHONY: run
run:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: db
db:
	docker exec -it botonews-db bash -c "mysql -u root -p ${MYSQL_ROOT_PASSWORD} -h localhost"

.PHONY: ps
ps:
	docker ps -a --filter "label=com.docker.compose.project.working_dir=${PWD}"

.PHONY: clean
clean:
	docker-compose stop $(docker ps -a -q --filter "label=com.docker.compose.project.working_dir=${PWD}")
	docker rm $(docker ps -a -q --filter "label=com.docker.compose.project.working_dir=${PWD}") || true
	sudo rm -rf db/data/*
