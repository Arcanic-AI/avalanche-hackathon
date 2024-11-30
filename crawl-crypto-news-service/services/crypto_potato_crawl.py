from services.crawl_tool import parseHtml, fetch_all_article_details
from constant import CRYPTO_POTATO_URL

class CryptoPotatoCrawler:
    def __init__(self):
        self.base_url = CRYPTO_POTATO_URL
        self.soup = parseHtml(self.base_url)

    async def getCryptoPotato(self):
        """
        Fetch all the crypto news articles.
        Extracts links from the leaderboard section and fetches article details.
        """
        # Send a request to the website

        crypto_potato_div = self.soup.find("div", class_="list-items")

        # Find all <a> tags and extract href attributes
        links = set()
        if crypto_potato_div:
            for a_tag in crypto_potato_div.find_all("a", href=True, limit=5):
                href = a_tag['href']
                if href.startswith("/author"):
                    continue
                if href.startswith("/"):
                    href = "https://cryptopotato.com/" + href
                links.add(href)
 
        # Fetch details of all the articles
        return list(links)


    


       