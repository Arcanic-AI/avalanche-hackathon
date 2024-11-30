import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CrawlerService {
    private readonly baseUrl = process.env.CRAWL_CRYPTO_NEWS_API_URL
    constructor() { }

    async getAiSummary() {
        const payload = {
            public_user_id: uuidv4(),
        }
        try {
            const response = await axios.post(`${this.baseUrl}/ai-summary`, payload, { timeout: 600000 });
            return response.data;
        } catch (error) {
            console.error('Error fetching AI summary:', error);  // Log the error for debugging purposes
            throw new NotFoundException('Error fetching AI summary');
        }
    }
}
