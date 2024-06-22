FROM node:20-alpine
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --verbose
RUN npm install react-cookie --save
RUN npm install react-router-dom --save
RUN npm install react-tabs --save
RUN ls -la node_modules
COPY . .

CMD ["npm", "start"]
