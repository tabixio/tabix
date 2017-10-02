## Prepare tabix.server host 

Need on host :

```
nginx 
php7
php-fpm
mongoDB 3.7 server 
php MongoDB Driver 2.2
```


### Install 
```

# Need nginx|Apache install 

# Need php7 install 

# Need mongodb 3.4 install
# https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/
# aptitude install mongodb-org

# --------------------------------------------
# Php Driver for MongoDB
# see https://stackoverflow.com/questions/38963608/setup-mongodb-extension-for-php7

sudo apt-get install php-pear phpize
sudo pecl install mongodb 
php -m|grep mongodb

```

### Install Tabix.Server

```

git clone https://github.com/smi2/tabix.ui 

php composer.phar install

git submodule init
git submodule update --init --recursive
git submodule update --remote

```

### Config 

```
cd tabix.server/config/providers
cp Example.php myconfigname.php
mcedit myconfigname.php
```



### Dev mode 

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
