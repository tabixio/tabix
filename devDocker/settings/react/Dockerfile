FROM node:18

WORKDIR /usr/src/app/tabix

ENV PATH /usr/src/app/tabix/node_modules/.bin:$PATH


COPY ../../package.json ./
COPY ../../package-lock.json ./
COPY ../../yarn.lock ./


RUN npm install --global rimraf cross-env node-sass webpack
RUN rm -f .yarnrc.yml && echo 'nodeLinker: node-modules' > .yarnrc.yml
RUN yarn set version 3.1.1
RUN yarn -v
RUN yarn install
EXPOSE 3000

CMD ["yarn", "start"]