from services.crawl_tool import parseHtml, fetch_all_article_details
from constant import NEW_BIT_URL

class NewBitCrawler:
    def __init__(self):
        self.base_url = NEW_BIT_URL
        self.soup = parseHtml(self.base_url)

    async def getNewBit(self):
        """
        Fetch all the crypto news articles.
        Extracts links from the leaderboard section and fetches article details.
        """
        # Send a request to the website

        new_bit_div = self.soup.find("div", class_="sc-gDLfIo kekCCr")

        # Find all <a> tags and extract href attributes
        links = set()
        if new_bit_div:
            for a_tag in new_bit_div.find_all("a", href=True):
                href = a_tag['href']
                if href.startswith("/author"):
                    continue
                if href.startswith("/"):
                    href = "https://news.bitcoin.com/" + href
                links.add(href)
 
        # Fetch details of all the articles
        return list(links)


    


       