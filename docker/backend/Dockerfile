# Dockerfile - Backend API (Node.js)
# Use Node.js LTS alpine image (lighter than standard)
FROM node:18-alpine

# Metadata
LABEL maintainer="Pablo Schmidt <psm545917@example.com>"
LABEL description="Finance Calculator Backend API"

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY backend/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy source code
COPY backend/server.js ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose API port
EXPOSE 3000

# Environment variables defaults
ENV NODE_ENV=production
ENV PORT=3000

# Health check (requires compatible health check script or curl in image, alpine node has no curl by default, using node script)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start command
CMD ["node", "server.js"]
