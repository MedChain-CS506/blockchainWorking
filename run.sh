#!/bin/bash
rm ./build/contracts/med_chain.json
truffle compile
truffle migrate --reset
cat ./build/contracts/med_chain.json > ./src/med_chain.json
npm run dev
