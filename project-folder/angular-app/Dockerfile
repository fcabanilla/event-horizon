FROM node:14 as builder  
WORKDIR /app  
COPY package*.json ./  
RUN npm install  
COPY . .  
RUN npm run build --prod  
FROM nginx  
COPY --from=builder /app/dist/angular-app /usr/share/nginx/html  
EXPOSE 4200  
CMD ["nginx", "-g", "daemon off;"] 
