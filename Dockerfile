FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Production image, copy built assets and start server
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from the base image
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package*.json ./
COPY --from=base /app/next.config.js ./
COPY --from=base /app/next-i18next.config.js ./

# Install only production dependencies
RUN npm install --production --frozen-lockfile

# Expose the port Next.js runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Start the Next.js server
CMD ["npm", "start"]