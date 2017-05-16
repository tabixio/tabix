FROM debian:jessie

ENV APP_HOME /usr/src/app
ENV DEFAULT /etc/nginx/sites-enabled/default

RUN apt-get update && apt-get install -y nginx-full nginx libssl-dev
RUN apt-get install -y openssl
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR $APP_HOME
ADD ./docker $APP_HOME
ADD ./build /var/www/html

RUN rm $DEFAULT
RUN mv default $DEFAULT

CMD if [ ! -z "$PASSWORD" ]; then sh -c "echo -n '$USER:$(openssl passwd -crypt $PASSWORD)\n' >> /etc/nginx/.htpasswd" ; else mv -f $APP_HOME/default_no_pass $DEFAULT ; fi && ./start.sh
