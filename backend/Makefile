mod:
	rm go.mod || true && \
	rm go.sum || true && \
	go mod init github.com/aceberg/inflower && \
	go mod tidy

run:
	cd cmd/inflower/ && \
	go run . 

fmt:
	go fmt ./...

lint:
	golangci-lint run
	golint ./...

check: fmt lint

swag:
	swag init -g main.go --dir cmd/inflower,internal/api,internal/models