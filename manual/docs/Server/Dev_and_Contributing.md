
### Dev mode

Need `http://tabix.dev7/` host to public folder server
All request in `tabix.dev7` route to `index.php`

Edit your hosts

```

mcedit /etc/hosts
# add tabix.dev7 host

curl "http://tabix.dev7/"
curl "http://tabix.dev7/ping"
```

Result curl:

```
{
        "msg": "OK!",
        "_status": 200
}


{
    "msg": "PONG!",
    "_status": 200
}

```

Check mongoDb connection & auth ( auth - api test )
```

curl "http://tabix.dev7/state" -X POST --data '{"auth":{"login":"tabix","password":"tabix","confid":"ApiTester"}}'
```


## Run test

Edit `api.suite.yml` and `config/providers/ApiTester.php`



```sh

### ALL TEST
php codecept.phar run

### SING TEST
php codecept.phar run api 020_CreateQueryCept

```




### MySQL & Nginx dev Config

MySQL user:
```SQL
GRANT ALL PRIVILEGES ON *.* TO 'tabix'@'%' IDENTIFIED BY "tabix858" WITH GRANT OPTION;
```

if php-fpm default socket in `unix:/run/php/php7.0-fpm.sock`

```

server {
        listen 80;
        server_name tabix.dev7;
        charset utf-8;
        root /sites/tabix.ui/tabix.server/public ;

        location / {
            if (!-f $request_filename) {
                        rewrite ^(.*)$ /index.php last;
                }
            index  index.php;
        }
        location ~ \.php$
        {
            if (!-f $request_filename) {
                        rewrite ^(.*)$ /index.php last;
                }
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
	        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
	        include fastcgi_params;
        }
}

```
