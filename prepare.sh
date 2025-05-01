#! /bin/bash
cp .env.example .env

# install dependencies
bun install

# create public folder
mkdir public

# remove this file
rm prepare.sh

# run the app
bun run dev
