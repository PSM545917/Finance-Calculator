# Dockerfile - Frontend (Nginx)
# Use lightweight Nginx alpine image for minimal size (5MB base)
FROM nginx:alpine

# Metadata
LABEL maintainer="Pablo Schmidt <psm545917@example.com>"
LABEL description="Finance Calculator Frontend"

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from project root to nginx directory
COPY index.html /usr/share/nginx/html/
COPY src/ /usr/share/nginx/html/src/

# Copy custom nginx config if necessary (using default for now, but placeholder for structure)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
