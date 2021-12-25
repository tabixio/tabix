![Tabix Logo](http://ui.tabix.io/assets/images/logo2.png?123)

Open source simple business intelligence application and sql editor tool for Clickhouse.

## Install

Not need, open in browser http://alpha.tabix.io/

### If need install

```bash

# git clone git@github.com:tabixio/tabix.git
 git checkout ts21

# Install JS libs 
yarn set version 3.1.1
yarn -v
echo "rm -Rf node_modules"
rm -Rf node_modules/
echo "yarn install"
yarn install

# Run on http://0.0.0.0:9000/  
yarn start

# Build html+js to dir 
yarn build:dev


```

## Requirements

* Clickhouse server version up v1.1.54164
* Not readonly Clickhouse user [note](https://tabix.io/doc/Requirements/#note)

## License

Copyright 2021 Tabix LLC Licensed under the Apache License, Version 2.0
