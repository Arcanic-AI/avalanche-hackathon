import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Eye, EyeOff, X, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClickAway } from "@/hooks/useclick";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
const axios = require("axios");
export default function FormTransData({
  open,
  x,
  y,
  close,
  status,
}: {
  open: boolean;
  x: any;
  y: any;
  close: () => void;
  status: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [privateKey, setPrivateKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const { address } = useAccount();
  const [addressWallet, setAddress] = useState(address);
  const ref = useRef<HTMLDivElement>(null);
  const toggleKeyVisibility = () => {
    setShowKey(!showKey);
  };
  useClickAway(ref, close);
  const handleclickTransPRK = async () => {
    const url = "/auth/verify";

    const data = {
      privateKey,
      expectedAddress: addressWallet,
    };
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    const headers = {
      accept: "*/*",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(url, data, {
        baseURL,
        headers,
      });
      close();
      toast.success(
        "Private transmission successful. Now you can use automatic trading"
      );
      status(true);
      return response.data; // Trả về kết quả từ API
    } catch (error: any) {
      if (error.response.status === 500) {
        toast.error(
          "You need to transmit the correct information to use self-trading"
        );
      } else if (error.response.status === 404) {
        toast.error("Invalid authentication information");
      } else {
        throw error.response ? error.response.data : error.message;
      }
    }
  };
  return (
    <>
      {open && (
        <div
          ref={ref}
          className={`absolute z-50 p-6  bg-white  max-h-[283px] w-1/3 flex flex-col gap-y-2  rounded-lg shadow-custom-shadow mt-6`}
          style={{
            top: `${y}px`,
            boxShadow: "0px 10px 20px 2px #00000040",
          }}
        >
          <div className="pb-5 flex   justify-between">
            <div className="font-semibold text-2xl">
              Transmit private wallet key
            </div>
            <div onClick={close}>
              <X size={20} color="red" />
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center w-[30%] text-xs ">
              Private key :
            </div>
            <div className="relative w-full h-10">
              <input
                type={"password"}
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="w-full h-10 border rounded-lg p-2 text-xs pr-10"
                placeholder="Enter private key to use automatic trading"
              />
              <button
                type="button"
                onClick={toggleKeyVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              ></button>
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="flex items-center w-[30%] text-xs ">
              Address wallet:
            </div>

            <div className="relative w-full h-10">
              <input
                type={showKey ? "text" : "password"}
                value={addressWallet}
                onChange={(e: any) => setAddress(e.target.value)}
                className="w-full h-10 border rounded-lg p-2 text-xs pr-10"
                placeholder="Enter wallet address"
                disabled
              />
              <button
                type="button"
                onClick={toggleKeyVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showKey ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleclickTransPRK}
            className="rounded-lg p-2 bg-green-300 "
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}
