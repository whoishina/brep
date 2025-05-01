#! /bin/bash
cp .env.example .env

# install dependencies
bun install

# remove this file
rm prepare.sh

# run the app
bun run dev
