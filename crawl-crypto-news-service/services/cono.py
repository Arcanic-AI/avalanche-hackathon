import requests
from prompts import CRYPTO_ANALYSIS_PROMPT,SYSTEM_PROMPT
from services.crawl_tool import fetch_all_article_details
import os

class ConoAI:
    BASE_URL = os.getenv("CONO_AI_URL")

    def __init__(self):
        # self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
        })
        self.setup_interceptors()

    def setup_interceptors(self):
        # You can handle errors globally here, for example in a response wrapper
        def response_hook(response, *args, **kwargs):
            # Check for specific status codes or errors
            if response.status_code == 401:
                print('Unauthorized. Redirecting to login.')
            response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)
            return response
        
        self.session.hooks['response'] = [response_hook]

    # Example method to make a GET request
    def get(self, url: str, params: dict = None):
        full_url = f"{self.BASE_URL}/{url}"
        response = self.session.get(full_url, params=params)
        return response.json()

    # Example method to make a POST request
    def post(self, url: str, data: dict = None):
        full_url = f"{self.BASE_URL}/{url}"
        response = self.session.post(full_url, json=data)
        return response.json()
    
    # def create_conversation(self, system: str, content: str):
    #     endpoint_path = "conversation"
    #     post_data = {
    #         "system": system,
    #         "content": content
    #     }
    #     response_data = self.post(endpoint_path, data=post_data)
    #     return response_data

    # def chat_complete_v2(self, message: str, conv_id: str = None, model_name: str = "cono1.5"):
    #     endpoint_path = "chat/complete-v2"

    #     # Create the post_data dictionary and handle the case when conv_id is None
    #     post_data = {
    #         "message": message,
    #         "model_name": model_name
    #     }

    #     if conv_id:
    #         post_data["conversation_id"] = conv_id

    #     # Make the POST request
    #     response_data = self.post(endpoint_path, data=post_data)

    #     return response_data

    def complete_no_conv(self, message:str, public_user_id: str ):
        endpoint_path = "chat/complete-no-conv"

        sys = SYSTEM_PROMPT
        model_name = "cono2.5"    
            
        post_data = {
            "message": message,
            "system": sys,
            "secret_key": "arCaNiC098poiA@",
            "public_user_id": public_user_id,
            "model_name": model_name
        }
        response_data = self.post(endpoint_path, data=post_data)
        return response_data
    
    def ask_ai_analysis(self, articles, public_user_id):

        message = f"""This dataset contains articles about coins. Confirm your understanding by replying with I got it. No need to analyze it yet
        ```{articles}```"""

        response = self.complete_no_conv(message, public_user_id)
        return response