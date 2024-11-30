import FormTransData from "@/components/form-trans-data";
import React, { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import axios from "axios";
import toast from "react-hot-toast";
interface Transaction {
  id: string;
  created_at: string;
  updated_at: string;
  address: string;
  amount: number;
  token_symbol: string;
  type: string;
}
const TransactionHistory = () => {
  const { isConnected } = useAccount();
  const [boxTransData, setBoxTransData] = useState({
    x: 0,
    y: 0,
    show: false,
  });
  const [transaction, setTransactions] = React.useState<Transaction[]>([]);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [statusTransForm, setStatusTransForm] = useState(false);
  const [status, setStatus] = useState<boolean>(false);
  const fetchHistoryByCoin = async () => {
    // if (!address) {
    //   toast.success(
    //     "Truyền private thành công. Bây giờ bạn có thể sử dụng mua bán tự động"
    //   );
    //   return;
    // }
    try {
      const res = await axios.get(`/transaction/history?address=${address}`, {
        baseURL: baseURL,
        headers: {
          accept: "application/json",
        },
      });
      setTransactions(res.data);
      return res.data;
    } catch (error) {
      console.error("error fetchding data", error);
    }
  };

  const fetchAutomateTrading = async () => {
    try {
      const res = await axios.get(`/auth?address=${address}`, {
        baseURL: baseURL,
        headers: {
          accept: "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Biến lưu trữ dữ liệu cũ

  React.useEffect(() => {
    if (address) {
      fetchHistoryByCoin();
      fetchAutomateTrading()
        .then((response) => {
          if (response.data.data !== null) {
            setStatus(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching automate trading:", error);
        });
    }
  }, [address, statusTransForm]);

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
    <div className="flex flex-col  gap-y-4 bg-gray-200 p-4 w-1/3 border-r border-gray-300 h-full">
      {isConnected && (
        <FormTransData
          open={boxTransData.show}
          status={setStatusTransForm}
          x={boxTransData.x}
          y={boxTransData.y}
          close={() => {
            setBoxTransData({
              x: 0,
              y: 0,
              show: !boxTransData.show,
            });
          }}
        />
      )}
      <div className="flex gap-x-6 max-h-[40px]">
        {/* <button

                    onClick={handlLogout}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                    Đăng xuất
                </button> */}
        <button
          onClick={
            !status
              ? (e) => {
                  e.preventDefault();
                  setBoxTransData({
                    x: e.pageX,
                    y: e.pageY,
                    show: !boxTransData.show,
                  });
                }
              : () => {
                  toast.success(
                    "Your account has already transmitted information before. You can use the automated trading feature now!"
                  );
                }
          }
          className={`${
            status ? "bg-green-400" : "bg-red-400"
          }  text-white py-2 px-4 rounded `}
        >
          Automated trading : {status ? <span>ON</span> : <span>OFF</span>}
        </button>
        <button
          onClick={() => disconnect()}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 w-1/3"
        >
          Logout
        </button>
      </div>
      <div className="history overflow-y-auto h-full  relative bg-white rounded-lg px-6">
        <h2 className="text-2xl h-[48px] sticky top-0 bg-white z-10 font-bold flex flex-col justify-center">
          Transaction History
        </h2>
        <div className="">
          <table className="w-full table-auto text-xs ">
            <thead className=" sticky top-12 z-10">
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Token Symbol</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody className="h-fit history ">
              {transaction.length > 0 &&
                transaction.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`border-b  ${
                      transaction.type === "buy"
                        ? "bg-green-100 hover:bg-green-200"
                        : "bg-red-100 hover:bg-red-200"
                    }`}
                  >
                    <td className="px-4 py-2">
                      {formatDate(transaction.created_at)}
                    </td>
                    <td className="px-4 py-2">{transaction.token_symbol}</td>
                    <td className="px-4 py-2">{transaction.amount}</td>
                    <td
                      className={`px-4 py-2 ${
                        transaction.type === "buy"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>
            {transaction.length === 0 && (
              <div className="flex items-center justify-center min-w-full text-center pt-6">
                <p className="text-red-400">Not transaction ?</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
