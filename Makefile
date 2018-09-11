dev:
	npm install && npm run build-dev

	dep ensure
	go build src/main.go
	./main


prod:
	go run main.go