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
# sudo systemctl enable mongod.service


```

*authentication MongoDB*

Use manual: 
a) https://docs.mongodb.com/manual/tutorial/enable-authentication/
b) https://medium.com/@raj_adroit/mongodb-enable-authentication-enable-access-control-e8a75a26d332

For develop need : ```-u "superAdmin" -p "admin123"``` in `ApiTester.php`

```
use admin
db.createUser(
  {
    user: "superAdmin",
    pwd: "admin123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)



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
cd tabix.ui/tabix.server/
php composer.phar install
```

### Config 

```
cd tabix.server/config/providers
cp Example.php myconfigname.php
mcedit myconfigname.php
```


