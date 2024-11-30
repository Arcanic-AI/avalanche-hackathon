"use client";

import { useAppContext } from "@/context/AppContext";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { ConnectWalletComponent } from "@/components/ConnectWallet";
import FormTransData from "@/components/form-trans-data";

export default function Login() {
  const { isConnected } = useAccount();
  const [boxTransData, setBoxTransData] = useState({
    x: 0,
    y: 0,
    show: false,
  });
  useEffect(() => {
    if (isConnected) {
      window.location.href = "/chat";
    }
  }, [isConnected]);
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="h-1/3 w-1/4 border rounded-lg flex flex-col">
          <div className="text-lg font-semibold flex justify-center py-4">
            Connect Metamask wallet
          </div>

          <div className="flex-grow flex items-center justify-center">
            <div className="flex flex-col gap-y-4 justify-between">
              <button
                id="connectButton"
                className="flex items-center justify-center bg-orange-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300"
              >
                <Image
                  src="/image/image.png"
                  alt="MetaMask"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <ConnectWalletComponent />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
