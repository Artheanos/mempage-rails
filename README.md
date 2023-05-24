# Mempage Rails

- Ruby (3.2.0)
- Rails (7)
- Postgresql
- Minio (mocking AWS S3)

## Setup

### Minio

Run minio
```sh
docker compose up minio
```

Go to http://localhost:9001/buckets,
log in using credentials in docker-compose.yml (username: admin, password: adminadmin),
click create bucket and create both `mempage-dev-bucket` and `mempage-test-bucket`.

Stop the minio container.

## Setup using Docker

If you're using Docker in `.env` set
- `DATABASE_URL` to `db`
- `MINIO_HOST` to your host's local IP. (Not `localhost`)

Create the database
```sh
docker compose run --rm backend rails db:create db:migrate db:seed
```

Then run the app
```sh
docker compose up -d
```

## Local setup

If you're running the Rails app locally

Run necessary services 
```sh
docker compose up -d minio db
```

Install gems
```sh
bundle
```

Create database

```sh
rails db:create db:migrate db:seed
```

And then start the app

```sh
rails s
```
