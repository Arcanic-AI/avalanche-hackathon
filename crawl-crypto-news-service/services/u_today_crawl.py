from services.crawl_tool import parseHtml, fetch_all_article_details
from constant import U_TODAY_URL

class UTodayCrawler:
    def __init__(self):
        self.base_url = U_TODAY_URL
        self.soup = parseHtml("https://u.today/")

    async def getLatestStory(self):
        """
        Fetch all the crypto news articles.
        Extracts links from the leaderboard section and fetches article details.
        """
        # Send a request to the website

        latest_stories_div = self.soup.find("div", class_="news__row")

        # Find all <a> tags and extract href attributes
        links = set()
        if latest_stories_div:
            for a_tag in latest_stories_div.find_all("a", class_="news__item-body", href=True, limit=5):
                href = a_tag['href']
                if href.startswith("/author"):
                    continue
                if href.startswith("/"):
                    href = "https://u.today/" + href
                links.add(href)
 
        # Fetch details of all the articles
        return list(links)


    async def getTopStory(self):
        """
        Fetch all the crypto news articles.
        Extracts links from the leaderboard section and fetches article details.
        """
        # Send a request to the website

        top_stories_div = self.soup.find("div", class_="stories__card-body")

        # Find all <a> tags and extract href attributes
        links = set()
        if top_stories_div:
            for a_tag in top_stories_div.find_all("a", class_="news__item-body", href=True, limit=5):
                href = a_tag['href']
                if href.startswith("/author"):
                    continue
                if href.startswith("/"):
                    href = "https://u.today/" + href
                links.add(href)
        
        # Fetch details of all the articles
        return list(links)
    


       