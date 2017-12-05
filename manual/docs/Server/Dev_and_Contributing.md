
### Dev mode

Need `http://tabix.dev7/` host to public folder

Edit your hosts

```

mcedit /etc/hosts
# add tabix.dev7 host

curl "http://tabix.dev7/"
curl "http://tabix.dev7/ping"
curl "http://tabix.dev7/state" -X POST --data '{"auth":{"login":"tabix","password":"tabix","confid":"ApiTester"}}'

```


Run test

Edit `api.suite.yml` and `config/providers/ApiTester.php`



```sh
php codecept.phar run
```

*MySQL DB dev-test*
```SQL
GRANT ALL PRIVILEGES ON *.* TO 'tabix'@'%' IDENTIFIED BY "tabix858" WITH GRANT OPTION;
```

*PhpFPM*
```
Default socket : unix:/run/php/php7.0-fpm.sock;

```

*Nginx Config*

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
