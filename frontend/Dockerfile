FROM node:16

# RUN apt-get update
# RUN apt-get install -y inotify-tools

WORKDIR /usr/src/app
ENV PATH .bin:$PATH
COPY . .
RUN npm install

CMD ["npm", "start"]
