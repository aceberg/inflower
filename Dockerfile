FROM --platform=$BUILDPLATFORM tonistiigi/xx AS xx

FROM --platform=$BUILDPLATFORM golang:alpine AS builder

COPY --from=xx / /

WORKDIR /src

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ .

ARG TARGETPLATFORM
RUN CGO_ENABLED=0 xx-go build -ldflags='-w -s' -o /inflower ./cmd/inflower


FROM scratch

WORKDIR /data/inflower
WORKDIR /app

COPY --from=builder /inflower /app/

ENTRYPOINT ["./inflower"]