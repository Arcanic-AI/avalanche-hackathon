from services.crawl_tool import parseHtml, fetch_all_article_details
from constant import BEIN_CRYPTO_NEWS_URL

class BeinCryptoNewsCrawler:
    def __init__(self):
        self.base_url = BEIN_CRYPTO_NEWS_URL
        self.soup = parseHtml(self.base_url)

    async def getBeinCryto(self):
        """
        Fetch all the crypto news articles.
        Extracts links from the leaderboard section and fetches article details.
        """
        # Send a request to the website

        latest_stories_div = self.soup.find("div", class_="w-full px-5 md:w-3/12")

        # Find all <a> tags and extract href attributes
        links = set()
        if latest_stories_div:
            for a_tag in latest_stories_div.find_all("a", href=True, limit=5):
                href = a_tag['href']
                if href.startswith("/author"):
                    continue
                if href.startswith("/"):
                    href = "https://beincrypto.com" + href
                links.add(href)
 
        # Fetch details of all the articles
        return list(links)