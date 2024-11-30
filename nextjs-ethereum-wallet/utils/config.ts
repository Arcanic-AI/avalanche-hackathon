import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const avalancheTestnet = {
  id: 43113,
  name: "Avalanche Fuji C-Chain", // Tên chính thức của testnet là Fuji
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://api.avax-test.network/ext/bc/C/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://testnet.snowtrace.io",
    },
  },
  contracts: {
    // Có thể để trống nếu không có hợp đồng cụ thể nào cần khai báo
  },
};

export const config = createConfig({
  chains: [avalancheTestnet],
  ssr: true,
  connectors: [metaMask()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [avalancheTestnet.id]: http(),
    // [base.id]: http(),
  },
});
