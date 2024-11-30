from bs4 import BeautifulSoup

import requests
import random
import asyncio

import httpx
from typing import Dict

from newsplease import NewsPlease

import logging
from fastapi import FastAPI

# Configure logging
logging.basicConfig(
    format="%(levelname)s:     %(message)s",  # Set your log format here
    level=logging.INFO  # Set log level to INFO
)

# Create a logger instance
logger = logging.getLogger(__name__)

COINDESK_URL = "https://www.coindesk.com/"

def parseHtml(url: str):
	# URL of the crypto news site
    # url = "https://www.coindesk.com/"

    # Create a session to automatically handle cookies and maintain headers
    session = requests.Session()

    # List of User-Agent strings to simulate a real browser
    user_agents_list = [
        'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.83 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
    ]
    
    headers = {'User-Agent': random.choice(user_agents_list)}
    
	  # Send a GET request with custom headers
    response = session.get(url, headers=headers)
    
    # Check if the request was successful
    if response.status_code != 200:
        return {"error": f"Failed to fetch data from CoinTelegraph, status code: {response.status_code}"}

    # Parse the HTML content using BeautifulSoup
    logger.info(f"crawl {url} status code: {response.status_code}")
    soup = BeautifulSoup(response.text, "html.parser")

    return soup

    # timeout = httpx.Timeout(300.0)
    # async with httpx.AsyncClient(timeout=timeout) as client:

async def fetch_article_details(url: str) -> Dict:
    # Perform the network request asynchronously
    timeout = httpx.Timeout(300.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch article from {url}. Status code: {response.status_code}")
            return
        # Using NewsPlease to parse the article content from the fetched HTML
        article = NewsPlease.from_html(response.text)
        return {
            "title": article.title,
            "content": article.maintext,
            "url": url,
        }

# async def fetch_article_details(url: str) -> Dict:
#     """
#     Fetch details for a specific article.
#     Returns a dictionary with title, content, and url or an error message in case of failure.
#     """
#     try:
#         # Thực hiện yêu cầu HTTP với httpx
#         timeout = httpx.Timeout(300.0)
#         async with httpx.AsyncClient(timeout=timeout) as client:
#             response = await client.get(url)
#             if response.status_code != 200:
#                 logger.error(f"Failed to fetch article from {url}. Status code: {response.status_code}")
#                 return {"url": url, "error": "Failed to fetch article (Non-200 status)"}

#             # Sử dụng NewsPlease để parse bài viết
#             article = NewsPlease.from_html(response.text)
#             return {
#                 "title": article.title,
#                 "content": article.maintext,
#                 "url": url,
#             }

#     except httpx.RequestError as e:
#         logger.error(f"Request error while fetching {url}: {e}")
#         return {"url": url, "error": f"Request error: {e}"}
    
#     except Exception as e:
#         logger.error(f"Error while parsing {url}: {e}")
#         return {"url": url, "error": f"Error parsing the article: {e}"}





async def fetch_all_article_details(urls: list) -> list:
    # Perform the network requests asynchronously using asyncio.gather
    article_tasks = [fetch_article_details(url) for url in urls]
    articles = await asyncio.gather(*article_tasks,return_exceptions=True)
    return articles