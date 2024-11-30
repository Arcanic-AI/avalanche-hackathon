SYSTEM_PROMPT="Based on the articles in the list, identify which coins currently show buy or sell signals. Explain the reasoning behind your decision, including factors such as news, related events, and technical analysis."
TEMPLATE_CONTENT='[{"role":"system","content":"You are a knowledgeable assistant. Provide accurate answers to questions when possible."},{"role":"user","content":"Who are you?"},{"role":"assistant","content":"I am an intelligent and helpful AI chatbot."}]'

no="Please analyze the following coins and return a JSON response indicating whether they have a positive, neutral, or negative signal, along with relevant technical indicators, market trends, and AI decision reasoning. Provide the prediction for the next 24 hours, the confidence level, and a brief explanation of the decision-making process."

# SYSTEM_PROMPT="Analyze the following coins based on the articles in the list and provide a JSON response. Indicate whether each coin has a positive, neutral, or negative signal. Include the prediction for the next 24 hours, the confidence level, and a brief explanation of the decision-making process. The explanation should reference factors such as news, events, and technical analysis that influenced the signal. "

EXAMPLE_OUTPUT = {
    "data": [
        {
            "coin": "Bitcoin",
            "symbol": "BTC",
            "signal": "positive",
            "signal_strength": "high",
            "prediction": "Strong upward trend expected in the next 24 hours",
            "confidence_level": 90,
            "market_trend": {
                "24h_change": "+4.2%"
            },
            "ai_decision_reasoning": "AI model detected a strong bullish trend with a high RSI and positive SMA, indicating sustained upward momentum."
        },
        {
            "coin": "Ethereum",
            "symbol": "ETH",
            "signal": "neutral",
            "signal_strength": "medium",
            "prediction": "Stable with no major movement expected in the next 24 hours",
            "confidence_level": 70,
            "market_trend": {
                "24h_change": "+0.1%"
            },
            "ai_decision_reasoning": "AI model detected no significant trend or indicators, suggesting a stable or neutral market condition."
        }
    ]
}

# Define the documentation for the expected input and output
DOCUMENTATION = """

Output Fields:
1. Coin (string):
   - Represents the cryptocurrency name (e.g., "Bitcoin").
2. Symbol (string):
   - Represents the cryptocurrency symbol (e.g., "BTC").
3. Signal (string):
   - Values: "positive", "neutral", or "negative"
   - Based on market conditions, technical indicators, and price trends
4. Signal Strength (string):
   - Values: "high", "medium", or "low"
   - Indicates confidence in signal accuracy

5. Prediction (string):
   - 24-hour price movement forecast
   - Based on current trends and technical indicators

6. Confidence Level (integer):
   - Range: 0-10
   - Represents the AI model's confidence in the prediction. The AI model's confidence in the prediction is calculated based on:
      -  News Source Reliability:
         -  Rate the reliability of the news sources the user will provide. For example:
            - cryptonews.com: 6/10
            - bloomberg.com: 8/10
            - coindesk.com: 4/10
         -  The higher the score, the more reliable the source.
      - News Intensity and Trend:
         Evaluate the frequency and volume of articles about the coin within a specific time frame.
         If there are many articles discussing the coin in a short period, it indicates a strong trend, which should increase the confidence level.
      - Sentiment in Articles:
         Determine the strength of sentiment in the articles.
         Articles with strong positive or negative language (e.g., "surging", "plummeting") should have a higher score, reflecting a stronger sentiment.
      - Consistency Across Different Sources:
         Assess how consistent the information is across multiple sources.
         If multiple reputable sources are reporting the same sentiment or details about the coin, this should increase the confidence level.

7. Market Trend (object):
   - Contains data on recent price changes.
   - Fields:
      -24h_change (string): The percentage change in price over the past 24 hours (e.g., "+4.2%").

8. AI Decision Reasoning (string):
   - Explanation of signal generation
   - References key data and technical indicators
"""

# Define the main analysis prompt
CRYPTO_ANALYSIS_PROMPT = f"""
Analyze the following coins based on the provided articles and market data.You must generate a JSON response indicating whether each coin has a positive, neutral, or negative signal. Include 24-hour predictions, confidence levels, and detailed explanations of the decision-making process.

The analysis should consider:
- Recent news and events
- Market trends and volume
- Price action

Example Output Format:
{str(EXAMPLE_OUTPUT)}

Documentation and Requirements:
{DOCUMENTATION}
"""
