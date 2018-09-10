dev:
	npm install && npm run build-dev

	go get -u github.com/golang/dep/cmd/dep
	dep ensure
	go build src/main.go
	./main


prod:
	go run main.go