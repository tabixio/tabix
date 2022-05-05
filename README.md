![Tabix Logo](https://tabix.io/img/LogoTabix22Icon.png?utm_source=git)

Open source simple business intelligence application and sql editor tool for Clickhouse.

## Install

Not need, open in browser http://dash.tabix.io/

### If need install

```bash

git clone https://github.com/tabixio/tabix.git
cd tabix
git checkout master

# Install JS libs 
rm -f .yarnrc.yml
# echo 'nodeLinker: node-modules' > .yarnrc.yml


# Yarn setup 

yarn set version 3.1.1
yarn -v
# echo "Drop node_modules";rm -Rf node_modules/

yarn install

# Run on http://0.0.0.0:9000/  
yarn start

# Build html+js to dir 
yarn build


```

## Requirements

* Clickhouse server version up v1.1.54164
* Not readonly Clickhouse user [note](https://tabix.io/doc/Requirements/#note)

## License

Copyright 2022 Tabix LLC Licensed under the Apache License, Version 2.0
