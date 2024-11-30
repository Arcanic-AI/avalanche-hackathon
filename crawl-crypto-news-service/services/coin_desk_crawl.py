import re
from services.crawl_tool import parseHtml, fetch_all_article_details
from constant import COIN_DESK_URL


class CoinDeskCrawler:
    def __init__(self):
        self.base_url = COIN_DESK_URL
        self.soup = parseHtml(self.base_url)

    async def getNews(self):
        """
        Fetch all the crypto news articles.
        Extracts links from the leaderboard section and fetches article details.
        """
        # Send a request to the website

        leaderboard_div = self.soup.find("div", class_="leaderboard")

        # Find all <a> tags and extract href attributes
        links = set()
        if leaderboard_div:
            for a_tag in leaderboard_div.find_all("a", href=True):
                href = a_tag['href']
                if href.startswith("/author"):
                    continue
                if href.startswith("/"):
                    href = "https://www.coindesk.com" + href
                links.add(href)
        
        # Fetch details of all the articles
        return list(links)

    async def getMostRead(self):
        most_read_section = self.soup.find("h2", text="Most Read")

        if not most_read_section:
            return {"error": "Most Read section not found"}

        parent_div = most_read_section.find_parent("div")
        if not parent_div:
            return {"error": "Parent div not found for Most Read section"}

        grandparent_div = parent_div.find_parent("div")
        if not grandparent_div:
            return {"error": "Grandparent div not found for Most Read section"}

        links = []

        # Find all the article entries within this section using a regular expression
        articles_div = grandparent_div.find_all("div", class_=re.compile(r"^most-read-articlestyles__Wrapper"))

        # Iterate through each article and extract the link
        for article in articles_div:
            title = article.find("div", class_=re.compile(r"^most-read-articlestyles__Title"))
            a_tag = title.find("a", href=True)
            href = a_tag['href']
            if href.startswith("/"):
                href = "https://www.coindesk.com" + href
            links.append(href)

        # Fetch details of the most read articles
        return links