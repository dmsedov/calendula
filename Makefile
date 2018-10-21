dev:
	npm install && npm run build-dev

	curl https://glide.sh/get | sh
	glide up -v srv/
	go build src/main.go
	./main


prod:
	go run main.go
