#Specify a base image
FROM node:alpine
RUN apk add --no-cache nodejs npm


WORKDIR /app


COPY . /app
#Copy the project
COPY ./ ./

#Install dependencies
RUN npm install 
RUN npm i wappalyzer@6.1.1
EXPOSE 3000
ENTRYPOINT ["node"]
#Default command
CMD ["app.js"]