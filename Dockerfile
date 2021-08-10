# First build stage
FROM bitnami/node:12 as builder
ENV NODE_ENV="production"

RUN apt-get update \
    && apt-get -y install git binutils \
    && git clone https://github.com/aws/efs-utils \
    && cd efs-utils \
    && ./build-deb.sh \
    && apt-get -y install ./build/amazon-efs-utils*deb

# Copy app's source code to the /app directory
COPY . /app

# The application's directory will be the working directory
WORKDIR /app

# Install Node.js dependencies defined in '/app/packages.json'
RUN npm install

# Second build stage
FROM bitnami/node:12-prod
ENV NODE_ENV="production"

# Copy the application code
COPY --from=builder /app /app

WORKDIR /app

EXPOSE 80-8000

# Start the application
CMD ["npm", "start"]
