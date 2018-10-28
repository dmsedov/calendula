dev:
	npm install && npm run build-dev
	# source ${HOME}/.profile
	curl https://glide.sh/get | sh
	glide up -v src/
	go build src/main.go
	./main
prod:
	go run main.go
