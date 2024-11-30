from services.crawl_tool import parseHtml, fetch_all_article_details
from constant import THE_CRYPTO_BASIC_URL

class TheCryptoBasicCrawler:
    def __init__(self):
        self.base_url = THE_CRYPTO_BASIC_URL

    async def getAllNews(self):
        soup = parseHtml(THE_CRYPTO_BASIC_URL)

        # Find the element containing the "All News" section
        all_news_title = soup.find("h4", text="All News")
        block_title_wrap = all_news_title.find_parent("div")
        all_news_section = block_title_wrap.find_parent("div")

        article_a_tags = all_news_section.find_all("a", href=True, class_="td-image-wrap")


        # Find all article links (excluding the author's link)
        article_links = set()

        for a_tag in article_a_tags:
            href = a_tag['href']
            article_links.add(href)

        return list(article_links)    
    

