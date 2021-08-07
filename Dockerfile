FROM node:15.5.0-slim
ENV NODE_ENV=production
ENV APPLICATION_ENV=production

EXPOSE 80

# Copy all.
WORKDIR /app
COPY . .

# Prepare frontend.
WORKDIR /app/web-frontend
RUN npm install --production
RUN npm run build

# Prepare backend.
WORKDIR /app/backend
RUN npm install --production
RUN npm run build

# Launch backend.
WORKDIR /app/backend/dist
CMD [ "node", "main.js" ]