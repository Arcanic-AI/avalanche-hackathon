<!-- # FastAPI Data Crawling API

This project is a FastAPI-based API for crawling web data, storing it in an SQLite database, and retrieving the data via API endpoints.

## Features

- **Crawl Website Data**: Crawl and store web page content by providing a URL.
- **Retrieve Data**: Retrieve stored crawled data from the database.

--- -->

## Requirements

- Python 3.7+
- FastAPI
- Uvicorn
- SQLite (comes with Python by default)

---

## Installation

### 1. Clone the Repository

```bash
git clone git@git.arcanic.ai:arcanic-platform/crawl-crypto-news-service.git
cd crawl-crypto-news-service
```

### 2. Create venv
### Ubuntu
```bash
python3 -m venv venv
source venv/bin/activate
```
### Windows
```bash
python3 -m venv venv
source venv/Scripts/activate
```

### 3. Install requirements

```bash
pip install -r requirements.txt
```

### 4. Run project 

```bash
 fastapi dev main.py
``` 