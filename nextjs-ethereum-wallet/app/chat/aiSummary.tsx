import React from "react";
import axios from "axios";

interface AiSummaryItem {
  coin: string;
  symbol: string;
  signal: string;
  signal_strength: string;
  prediction: string;
  confidence_level: number;
  market_trend: {
    "24h_change": string;
  };
  ai_decision_reasoning: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: [
    {
      id: string;
      created_at: string;
      updated_at: string;
      data: AiSummaryItem[];
    }
  ];
}
const AiSummary = () => {
  const [summaryData, setSummaryData] = React.useState<AiSummaryItem[]>([]);
  const [lastUpdate, setLastUpdate] = React.useState<Date>(new Date());
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const refreshInterval = 1800000;
  const pendingRequest = React.useRef<boolean>(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const fetchAiSummary = async () => {
    try {
      pendingRequest.current = true;
      setIsLoading(true);
      setError(null);
      const res = await axios.get<ApiResponse>("/ai-evaluation", {
        baseURL: baseURL,
        headers: {
          accept: "application/json",
        },
        timeout: 10000,
      });

      if (res.data.statusCode === 200 && res.data.data[0]?.data) {
        const newData = res.data.data[0].data;
        if (JSON.stringify(newData) !== JSON.stringify(summaryData)) {
          setSummaryData(newData);
          setLastUpdate(new Date());
        }
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(fetchAiSummary, refreshInterval);
      }
    } finally {
      setIsLoading(false);
      pendingRequest.current = false;
    }
  };
  React.useEffect(() => {
    fetchAiSummary();
    intervalRef.current = setInterval(fetchAiSummary, refreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getSignalColor = (signal: string) => {
    switch (signal.toLowerCase()) {
      case "buy":
        return "text-green-600";
      case "sell":
        return "text-red-600";
      case "hold":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };
  return (
    <div className="p-4  grid bg-gray-200  w-1/3 border-r border-gray-30">
      <h2 className="text-2xl font-bold flex items-center justify-center">
        AI Market Analysis
      </h2>
      <div className="AiSumany grid gap-4 overflow-y-auto mt-6 ">
        {summaryData.length > 0 ? (
          summaryData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-xl font-bold">{item.coin}</h3>
                  <span className="text-gray-500">{item.symbol}</span>
                </div>
                <div className={`font-bold ${getSignalColor(item.signal)}`}>
                  {item.signal.toUpperCase()}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Signal Strength:</span>
                  <span className="font-medium">{item.signal_strength}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Prediction:</span>
                  <span className="font-medium">{item.prediction}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Confidence:</span>
                  <span className="font-medium">{item.confidence_level}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">24h Change:</span>
                  <span
                    className={`font-medium ${
                      parseFloat(item.market_trend["24h_change"]) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.market_trend["24h_change"]}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-medium mb-1">AI Analysis:</h4>
                <p className="text-gray-600 text-sm">
                  {item.ai_decision_reasoning}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="center-text">
            <p className="text-gray-600">No data available ?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiSummary;
