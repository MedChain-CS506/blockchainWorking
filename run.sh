#!/bin/bash
truffle compile
truffle migrate
cat ./build/contracts/med_chain.json > ./src/med_chain.json
npm run dev
