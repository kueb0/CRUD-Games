# FROM node:16 AS build

# WORKDIR /client

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build --prod

# FROM nginx:alpine AS nginx

# COPY --from=build /client/dist/ /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:lts-bullseye

WORKDIR /client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start", "--", "--host=0.0.0.0"]
