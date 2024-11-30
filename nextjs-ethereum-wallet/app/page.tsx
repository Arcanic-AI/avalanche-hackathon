"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAccount } from "wagmi";
export default function Home() {
  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      window.location.href = "/chat";
    } else {
      redirect("/auth");
    }
  }, [isConnected]);
  return <></>;
}
