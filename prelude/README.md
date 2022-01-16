# Prelude
<p align="center">
  Backend monolith
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Status-WIP-green" />
</p>

## Song Fetching Service

Queries and aggregates songs from **[Spotify | Apple Music]**.

# Building and running

For development, app will run at `localhost:3000`

```bash
$ cd ./server
$ npm install
$ npm run dev
```

To build for production and run, app will run at `localhost:3000`

```bash
$ cd ./server
$ npm install
$ npm run build
$ npm run start
```

Dockerfile and terraform config exist and can be used to build/run the app at `localhost:8000`.
Only included here since I was playing with them and wanted to stash the changes 🤷‍♂️
If I connect a db in the future this might come in handy.


```bash
# to build image and run docker locally
$ terraform apply

# to destroy docker container
$ terraform destroy
```

# Unit testing

To run unit tests

```bash
$ cd ./server
$ npm install
$ npm run test
```
