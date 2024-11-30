# Crypto Insight

**Crypto Insight** is a comprehensive web application designed to streamline crypto news aggregation, sentiment analysis, and automated trading. Built with cutting-edge AI and blockchain technologies, it provides users with actionable insights and tools for informed crypto trading decisions.

## Features

- **News Crawling**: Automatically fetch crypto-related articles from multiple trusted sources every 30 minutes.
- **AI Sentiment Analysis**: Leverage Cono AI from Arcanic AI to identify mentioned cryptocurrencies and assign a sentiment score (1-100) for each article.
- **Crypto Wallet Integration**: Allow users to log in with their crypto wallets and manage their trading history securely.
- **Automated Trading**: Execute buy/sell decisions on the blockchain based on AI recommendations.

## Tech Stack Overview

- **Next.js**: Version 20 or newer (for frontend development).
- **Node.js**: Version 18 or newer 
- **MySQL**: For managing login data.
- **Python**: For the Crawl Service (with FastAPI framework).
- **Docker**: For containerized deployment.
- **Ethers.js**: For blockchain integration and smart contract interaction.
- **Metamask or Web3-compatible Wallet**: For cryptocurrency transactions.
- **Cono AI**: For sentiment analysis and trading decision-making.

## Tech Stack

This repository contains the code for both the frontend and backend of Crypto Insight.

- **Crawl Crypto News Service**: Written in Python, using the FastAPI framework for efficient web scraping of crypto news.
- **Buy/Sell Service**: Built with JavaScript running on Node.js, using the Express.js.
- **Schedule Service**: Written in TypeScript, running on Node.js with the NestJS framework, and uses MySQL for data management.
- **AI Integration**: Cono API from Arcanic AI for sentiment analysis and trading decision-making.
- **Blockchain Integration**: Web3.js for wallet connectivity and smart contract interaction.

## Screenshot
![alt text](image.png) 

## Quick Start
### Requirement
- Docker - [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose - [Install Docker Compose](https://docs.docker.com/compose/install/)
### Installation
- **Clone the repository:**

   ```bash
   git clone https://github.com/Arcanic-AI/avalanche-hackathon.git
   ```

- **Hackathon avax be(schedule service)**
   
    1. **Navigate to the backend project directory:**

        ```bash
        cd hackathon_avax_be
        ```
    2. **Configure Environment Variables:**

        - Create a copy of the `.env.example` file and name it `.env`.
        - Update the required fields in `.env` with the specific information.

- **Nextjs ethereum wallet** 
   
    1. **Navigate to the backend project directory:**

        ```bash
        cd nextjs-ethereum-wallet
        ```
    2. **Configure Environment Variables:**

        - Create a copy of the `.env.example` file and name it `.env`.
        - Update the required fields in `.env` with the specific information.

- **Final Steps: Build and Run Docker Containers**

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

## Contributing
We welcome contributions! If you’d like to contribute, please follow our contribution guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## Security
If you identify a security vulnerability, please responsibly disclose it by emailing us at [hello@arcanic.ai](mailto:hello@arcanic.ai). Avoid opening public issues regarding vulnerabilities.

## License
Crypto Insight is open-source software developed by Arcanic AI. If you have any questions or would like to propose a different licensing model, please contact us at [hello@arcanic.ai](mailto:hello@arcanic.ai).  
By contributing to Crypto Insight, you agree that your contributions will be considered for inclusion in the project and will be governed by the licensing terms set by Arcanic AI.

