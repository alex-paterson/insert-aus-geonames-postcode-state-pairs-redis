# Insert Australian GeoNames Postcode State Pairs Into Redis

This script inserts a hash of Australian postcodes from GeoNames into Redis.
A key is a postcode, and a value is that postcode's state.

# How To

1. Download http://download.geonames.org/export/zip/AU.zip

2. Unzip to get AU.txt. Place this in the root of this package.

3. Run with: `node index.js --file="AU.txt" --server="redis://127.0.0.1:6379" --key="aus_postcode_state_pairs"`. These are the default values.

# Confirmation

Get hash `HGETALL aus_postcode_state_pairs`.
