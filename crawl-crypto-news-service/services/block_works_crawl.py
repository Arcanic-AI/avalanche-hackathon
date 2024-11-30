from services.crawl_tool import parseHtml, fetch_all_article_details
from constant import BLOCK_WORKS_MARKET_URL,BLOCK_WORKS_ANALYSIS_URL

class BlockWorksCrawler:
    # def __init__(self):
    #     self.base_url = BLOCK_WORKS_URL

    async def getMarketArticles(self):
        soup = parseHtml(BLOCK_WORKS_MARKET_URL)
        img_tags = soup.find_all('img', alt="article-image",limit=10)
        links = []
        for img_tag in img_tags:
            parent_a = img_tag.find_parent('a')
            href = parent_a['href']
            href = "https://blockworks.co" + href
            links.append(href)

        return links
    
    async def getAnalysisLinks(self):
        soup = parseHtml(BLOCK_WORKS_ANALYSIS_URL)

        img_tags = soup.find_all('img', alt="article-image",limit=10)

        links = []
        for img_tag in img_tags:
            parent_a = img_tag.find_parent('a')
            href = parent_a['href']
            href = "https://blockworks.co" + href
            links.append(href)

        return links

