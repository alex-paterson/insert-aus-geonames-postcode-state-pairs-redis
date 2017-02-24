#!/bin/bash

git clone https://github.com/alex-paterson/insert-aus-geonames-postcode-state-pairs-redis.git;
wget http://download.geonames.org/export/zip/AU.zip;
unzip AU.zip -d ./insert-aus-geonames-postcode-state-pairs-redis/;
cd insert-aus-geonames-postcode-state-pairs-redis/;
npm i;
node index.js;
