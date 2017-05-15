### Variant 1, Hosted

Not need install

* Master branch : http://ui.tabix.io
* Beta branch : http://beta.tabix.io

### Variant 2, Local

* download last releases https://github.com/smi2/tabix.ui/releases
* unpack, copy `build` path to nginx root_path
* done

Or git master

* git clone https://github.com/smi2/tabix.ui
* nginx root_path to `build` path
* done


example nginx config
```

server {
    listen 80;
    server_name ui.tabix.io;
    charset        utf-8;
    root /var/www/tabix.ui/build;
    location / {
        if (!-f $request_filename) {
            rewrite ^(.*)$ /index.html last;
        }
        index  index.html index.htm;
    }
}


```


### Variant 3, Embedded


Add http_server_default_response IN `/etc/clickhouse-server/config.xml`



```
<!-- Default root page on http[s] server. For example load UI from https://tabix.io/ when opening http://localhost:8123 -->



<http_server_default_response><![CDATA[<html ng-app="SMI2"><head><base href="http://ui.tabix.io/"></head><body><div ui-view="" class="content-ui"></div><script src="http://loader.tabix.io/master.js"></script></body></html>]]></http_server_default_response>



```


Then open http://localhost:8123


### Variant 4, compile from source

See develop page

### Variant 5, from Docker

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
