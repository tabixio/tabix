![Tabix Logo](http://ui.tabix.io/assets/images/logotabix.png)


Open source simple business intelligence application and sql editor tool for Clickhouse.
![Tabix](media/fullsceen.png)


## Install

Not need, open in browser http://ui.tabix.io/

### If need install

[Install to you host](https://tabix.io/doc/Install/)

### How to run in Docker

#### Build an image and run

1. Build an image
     
     docker build -t tabix .
     
2. Run container 

    docker run -d -p 8080:80 tabix
 
#### Run container from already built image

1. Run container 

    docker run -d -p 8080:80 spoonest/clickhouse-tabix-web-client


Now you can access `tabix.ui` by the link http://localhost:8080.
 
> **More security**: you can limit access to your `tabix.ui` application on the proxy level. 
> Use `-e USER='myuser' -e PASSWORD='mypass'` parameters to restrict access only for specified user. 
> For example, `docker run -d -p 8080:80 -e USER='myuser' -e PASSWORD='mypass' spoonest/clickhouse-tabix-web-client`

[Use with Docker](https://tabix.io/doc/Install/#variant-5-from-docker)

## Documentation

https://tabix.io/doc/


## Draw charts & map

![Tabix](https://tabix.io/anime/draws.gif?gigig)


## Requirements

* Google chrome version up 55
* Clickhouse server version up v1.1.54164
* Not readonly CH user [note](https://tabix.io/doc/Requirements/#note)

## Roadmap

[Tabix roadmap board](https://github.com/smi2/tabix.ui/issues/12)

## Tabix changelog & news

[Tabix changelog & news in twitter](http://twitter.com/tabix_io)

## License

Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors

Licensed under the Apache License, Version 2.0

Use components:
* [Ace.JS](https://ace.c9.io/) Copyright (c) 2010, Ajax.org B.V.
* [eCharts](https://github.com/ecomfe/echarts) Copyright (c) 2017, Baidu Inc.
* [Handsontable](https://github.com/handsontable/handsontable)
* [Lodash](https://github.com/lodash/lodash) Copyright JS Foundation
* [pivottable](https://github.com/nicolaskruchten/pivottable)
