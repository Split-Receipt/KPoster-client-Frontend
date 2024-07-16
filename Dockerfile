FROM node:18.15
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .
RUN npm i
RUN npm cache clean --force
RUN npm run build

EXPOSE 3001 

CMD [ "node", ".output/server/index.mjs" ]