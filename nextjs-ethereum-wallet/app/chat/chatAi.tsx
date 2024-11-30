// pages/index.js
"use client";
import React, { useEffect, useState } from "react";
import TransactionHistory from "./historyByCoin";
import AiSummary from "./aiSummary";
import axios from "axios";
import { useAccount } from "wagmi";

interface ApiResponse {
  statusCode: number;
  message: string;
  data: Article[];
}
interface Article {
  id: string;
  title: string;
  url: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const ChatAI = () => {
  const { isConnected } = useAccount();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const limit = 10;
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const REFRESH_INTERVAL = 1800000;
  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `/articles/latest?limit=${limit}`,
        {
          baseURL: baseURL,
          headers: {
            accept: "application/json",
          },
        }
      );
      const newArticles = response.data.data || [];
      if (JSON.stringify(newArticles) !== JSON.stringify(articles)) {
        setArticles(newArticles);
        setLastUpdate(new Date());
      }
      return newArticles;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  useEffect(() => {
    if (!isConnected) {
      window.location.href = "/auth";
    }
  }, [isConnected]);

  React.useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <div className="flex h-screen w-full">
      <TransactionHistory />
      <AiSummary />
      <div className="grid w-1/3 p-4 bg-gray-200">
        <h2 className="text-2xl font-bold flex justify-center">Crypto News</h2>
        <div className="CryptoNew flex-1 mt-6 overflow-y-auto">
          <div className="">
            <ul className="list-none p-0">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <li
                    key={index}
                    className="mb-2 p-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors bg-white"
                  >
                    <p className="font-bold text-l">{article.title}</p>
                    <p text-black line-clamp-2>
                      {formatDate(article.created_at)}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-blue-600 font-bold animate-pulse"
                    >
                      {article.url}
                    </a>
                    <p className="text-black line-clamp-2">{article.content}</p>
                  </li>
                ))
              ) : (
                <div>
                  <div className="center-text">
                    <p className="text-gray-600">No data news ?</p>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
