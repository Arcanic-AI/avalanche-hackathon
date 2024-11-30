# Setting up development environment

Getting started with development is a breeze! Follow these steps and you'll be contributing in no time.

## Requirements

- Docker - [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose - [Install Docker Compose](https://docs.docker.com/compose/install/)


## Installation
**Clone the repository:**

   ```bash
   git clone https://github.com/Arcanic-AI/avalanche-hackathon.git
   ```

### Hackathon avax be(schedule service)
   
1. **Navigate to the backend project directory:**

   ```bash
   cd hackathon_avax_be
   ```
2. **Configure Environment Variables:**

   - Create a copy of the `.env.example` file and name it `.env`.
   - Update the required fields in `.env` with the specific information.

### Nextjs ethereum wallet 
   
1. **Navigate to the backend project directory:**

   ```bash
   cd nextjs-ethereum-wallet
   ```
2. **Configure Environment Variables:**

   - Create a copy of the `.env.example` file and name it `.env`.
   - Update the required fields in `.env` with the specific information.

### Final Steps: Build and Run Docker Containers

1. **Navigate to the Root Directory:**
   
   Make sure you're in the directory where your `docker-compose.yml` file is located.

2. **Build the Docker Images:**
   
   Run the following command to build the services defined in your `docker-compose.yml`:

   ```bash
   docker-compose build
   ```
3. **Start the Containers:**
    ```bash
   docker-compose up -d
   ```

