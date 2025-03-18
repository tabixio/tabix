#Build
FROM node:lts AS builder

WORKDIR /app

RUN echo 'nodeLinker: node-modules' > .yarnrc.yml

RUN corepack enable

RUN yes | yarn set version 3.1.1

COPY . .

RUN yarn install

RUN yarn build


#Run
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]