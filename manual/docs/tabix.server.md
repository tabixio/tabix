```
!!!! NOT READY FOR USE !!!!
^^^^^^^^^^^^^^^^^^^^^^^^^^^
```




## Prepare tabix.server host

Need on host :

```
nginx 
php7
php-fpm
mongoDB 3.7 server 
php MongoDB Driver 2.2
```

@Todo Use docker

 * https://github.com/valetanddama/docker-nginx-mongo-php7/blob/master/Dockerfile
 * https://github.com/notegame/docker-php7-nginx-oci8-mongo


### Install 
```

# Need nginx|Apache install 

# Need php7 install 
# apt-get -y install php7.0 php7.0-fpm php7.0-mysql php7.0-curl php7.0-mcrypt php7.0-cli php7.0-dev php-pear libsasl2-dev
#


# Need mongodb 3.6 install
# https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/

# aptitude install mongodb-org 
# sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
# echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
# sudo apt-get install -y mongodb-org
# sudo service mongod start


```

*authentication MongoDB*

Use manual: 
a) https://docs.mongodb.com/manual/tutorial/enable-authentication/
b) https://medium.com/@raj_adroit/mongodb-enable-authentication-enable-access-control-e8a75a26d332

For develop need : ```-u "superAdmin" -p "admin123"``` in `ApiTester.php`

```
# check login 
# mongo --port 27017 -u "superAdmin" -p "admin123" --authenticationDatabase "admin"
```

*Php Driver for MongoDB*

```
# --------------------------------------------
# 
# see https://stackoverflow.com/questions/38963608/setup-mongodb-extension-for-php7

sudo apt-get install php-pear phpize
sudo pecl install mongodb 
php -m|grep mongodb


#   echo "extension=mongodb.so" > /etc/php/7.0/fpm/conf.d/20-mongodb.ini && \
#  	echo "extension=mongodb.so" > /etc/php/7.0/cli/conf.d/20-mongodb.ini && \
#  	echo "extension=mongodb.so" > /etc/php/7.0/mods-available/mongodb.ini

```

### Install Tabix.Server

```

git clone https://github.com/smi2/tabix.ui 

cd tabix.ui/

git submodule init
git submodule update --init --recursive
git submodule update --remote


cd tabix.ui/tabix.server/
php composer.phar install
```

### Config 

```
cd tabix.server/config/providers
cp Example.php myconfigname.php
mcedit myconfigname.php
```



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
