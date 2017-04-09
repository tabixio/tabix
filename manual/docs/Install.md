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



