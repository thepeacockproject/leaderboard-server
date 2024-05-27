# Leaderboard server

This is a basic leaderboard server for [The Peacock Project](https://thepeacockproject.org/)

## Setup
```
yarn install # install dependencies
yarn prisma generate
# Modify to match your postgres setup
export DATABASE_URL = $env:DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
yarn prisma migrate dev # setup the database
yarn build
node ./build/main # start the server
```