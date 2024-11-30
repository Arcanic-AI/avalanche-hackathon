from typing import Optional
from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware

from enum import Enum
import json
import asyncio
from pydantic import BaseModel

from services.crawl_tool import fetch_all_article_details

from services.cono import ConoAI

from services.coin_desk_crawl import CoinDeskCrawler
from services.block_works_crawl import BlockWorksCrawler
from services.the_crypto_basic import TheCryptoBasicCrawler
from services.bein_crypto_news_crawl import BeinCryptoNewsCrawler
from services.u_today_crawl import UTodayCrawler
from services.new_bit_crawl import NewBitCrawler
from services.crypto_potato_crawl import CryptoPotatoCrawler

from dotenv import load_dotenv

from prompts import CRYPTO_ANALYSIS_PROMPT
import logging


load_dotenv()

# Set up logging configuration
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, you can specify specific domains here
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

cono_ai = ConoAI()

@app.get("/")
def read_root():
    return {"Message": "Crawl crypto news service <3"} 

class SearchOption(str, Enum):
    COIN_DESK = 'coin_desk'
    COIN_DESK_MOST_READ = 'coin_desk_most_read'
    BLOCK_WORKS_MARKET = 'block_works_market'
    BLOCK_WORKS_ANALYSIS = 'block_works_analysis'
    THE_CRYPTO_BASIC = 'the_crypto_basic'
    BEIN_CRYPTO_NEWS = 'bein_crypto_news_crawl'
    U_TODAY_NEWS = 'u_today_crawler'
    NEW_BIT_NEWS = 'new_bit_crawl'
    CRYPTO_POTATO_NEWS = 'new_potato_crawl'

@app.get('/crypto-news')
async def crypto_news(search: Optional[SearchOption] = None):
    links = []
    if search:
        # Use a mapping to associate the search option with the appropriate crawler and method
        if search == SearchOption.COIN_DESK:
            coin_desk_crawler = CoinDeskCrawler()
            links = await coin_desk_crawler.getNews()
        elif search == SearchOption.COIN_DESK_MOST_READ:
            coin_desk_crawler = CoinDeskCrawler()
            links = await coin_desk_crawler.getMostRead()
        elif search == SearchOption.BLOCK_WORKS_MARKET:
            block_work_crawler = BlockWorksCrawler()
            links = await block_work_crawler.getMarketArticles()
        elif search == SearchOption.BLOCK_WORKS_ANALYSIS:
            block_work_crawler = BlockWorksCrawler()
            links = await block_work_crawler.getAnalysisLinks()
        elif search == SearchOption.THE_CRYPTO_BASIC:
            the_crypto_basic = TheCryptoBasicCrawler()
            links = await the_crypto_basic.getAllNews()
        elif search == SearchOption.BEIN_CRYPTO_NEWS:
            bein_crypto_news_crawl = BeinCryptoNewsCrawler() 
            links = await bein_crypto_news_crawl.getBeinCryto()
        elif search == SearchOption.U_TODAY_NEWS:
            u_today_crawler = UTodayCrawler()
            links = await u_today_crawler.getLatestStory()
        elif search == SearchOption.NEW_BIT_NEWS:
            new_bit_crawl = NewBitCrawler()
            links = await new_bit_crawl.getNewBit()
        elif search == SearchOption.CRYPTO_POTATO_NEWS:
            crypto_potato_crawl = CryptoPotatoCrawler()
            links = await crypto_potato_crawl.getCryptoPotato()
            

    # Fetch article details
    articles = await fetch_all_article_details(links)

    return {"articles": articles}

class RequestBody(BaseModel):
    # message: str
    public_user_id: str

@app.post('/ai-summary')
async def ai_cono(body: RequestBody):
    block_work_crawler = BlockWorksCrawler()
    coin_desk_crawler = CoinDeskCrawler()
    the_crypto_basic = TheCryptoBasicCrawler()
    bein_crypto_news_crawl = BeinCryptoNewsCrawler()
    u_today_crawler = UTodayCrawler()
    new_bit_crawl = NewBitCrawler()
    crypto_potato_crawl = CryptoPotatoCrawler()

    block_work_market_links, block_work_analysis_links, the_crypto_basic_all_new_links, bein_crypto_news_crawl_links, u_today_crawler_links, new_bit_crawl_links, crypto_potato_crawl_links = await asyncio.gather(
        block_work_crawler.getMarketArticles(),
        block_work_crawler.getAnalysisLinks(),
        the_crypto_basic.getAllNews(),
        bein_crypto_news_crawl.getBeinCryto(),
        u_today_crawler.getLatestStory(),
        new_bit_crawl.getNewBit(),
        crypto_potato_crawl.getCryptoPotato()
    )

  
    block_work_market_articles, block_work_analysis_articles, the_crypto_basic_all_new_articles, bein_crypto_news_crawl_articles, u_today_crawler_articles, new_bit_crawl_articles, crypto_potato_crawl_articles = await asyncio.gather(
        fetch_all_article_details(block_work_market_links),
        fetch_all_article_details(block_work_analysis_links),
        fetch_all_article_details(the_crypto_basic_all_new_links),
        fetch_all_article_details(bein_crypto_news_crawl_links),
        fetch_all_article_details(u_today_crawler_links),
        fetch_all_article_details(new_bit_crawl_links),
        fetch_all_article_details(crypto_potato_crawl_links)
    )
    cono_ai.ask_ai_analysis(block_work_market_articles[:5], body.public_user_id)
    cono_ai.ask_ai_analysis(block_work_market_articles[-5:], body.public_user_id)


    cono_ai.ask_ai_analysis(block_work_analysis_articles[:5], body.public_user_id)
    cono_ai.ask_ai_analysis(block_work_analysis_articles[-5:], body.public_user_id)



    cono_ai.ask_ai_analysis(the_crypto_basic_all_new_articles, body.public_user_id)

    cono_ai.ask_ai_analysis(bein_crypto_news_crawl_articles, body.public_user_id)

    cono_ai.ask_ai_analysis(u_today_crawler_articles, body.public_user_id)

    cono_ai.ask_ai_analysis(new_bit_crawl_articles, body.public_user_id)

    cono_ai.ask_ai_analysis(crypto_potato_crawl_articles, body.public_user_id)


    chat_response = cono_ai.complete_no_conv(CRYPTO_ANALYSIS_PROMPT, body.public_user_id)
    
    data = chat_response['data']
    content = data['content']

    cleaned_data = content.strip('```json').strip('```')
    cleaned_data = cleaned_data.replace('\\n', '\n')
    json_data = json.loads(cleaned_data)

    return json_data

@app.get('/crypto-news/all')
async def crypto_new_all():
    
    # coin_desk_crawler = CoinDeskCrawler()
    block_work_crawler = BlockWorksCrawler()
    the_crypto_basic = TheCryptoBasicCrawler()
    # bein_crypto_news_crawl = BeinCryptoNewsCrawler()
    u_today_crawler = UTodayCrawler()
    # new_bit_crawl = NewBitCrawler()
    crypto_potato_crawl = CryptoPotatoCrawler()

    # Run all link retrieval methods concurrently and flatten the results
    # coin_desk_news, coin_desk_most_reads,block_work_market, block_work_analysis,the_crypto_basic_all_new, bein_crypto_news_crawl, u_today_crawler, new_bit_crawl, crypto_potato_crawl = await asyncio.gather(
    #     coin_desk_crawler.getNews(),
    #     coin_desk_crawler.getMostRead(),
    #     block_work_crawler.getMarketArticles(),
    #     block_work_crawler.getAnalysisLinks(),
    #     the_crypto_basic.getAllNews(),
    #     bein_crypto_news_crawl.getBeinCryto(),
    #     u_today_crawler.getLatestStory(),
    #     new_bit_crawl.getNewBit(),
    #     crypto_potato_crawl.getCryptoPotato()
    # )


    block_work_market, block_work_analysis,the_crypto_basic_all_new, u_today_crawler, crypto_potato_crawl = await asyncio.gather(
        block_work_crawler.getMarketArticles(),
        block_work_crawler.getAnalysisLinks(),
        the_crypto_basic.getAllNews(),
        u_today_crawler.getLatestStory(),
        crypto_potato_crawl.getCryptoPotato(),
        return_exceptions=True
    )

    links =  block_work_market + block_work_analysis +the_crypto_basic_all_new + u_today_crawler + crypto_potato_crawl

    articles = []
    articles = await fetch_all_article_details(links)

    return {"articles": articles }


