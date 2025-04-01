import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const superseedMainnet = {
  chainId: "0x14d2", // hex 0x14d2 = 5330
  chainName: "Superseed",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.superseed.xyz"],
  blockExplorerUrls: ["https://explorer.superseed.xyz"],
};

export default function AddChainButton() {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkChain() {
      if (window.ethereum) {
        try {
          const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
          setIsAdded(currentChainId === superseedMainnet.chainId);
        } catch (error) {
          console.error("Error checking chain:", error);
        }
      }
    }
    checkChain();
  }, []);

  const addsuperseedMainnet = async () => {
    if (!window.ethereum) {
      alert("MetaMask Wallet is not installed. Please install it to use this feature.");
      return;
    }

    setIsLoading(true);

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [superseedMainnet],
      });
      setIsAdded(true);
    } catch (error) {
      console.error("Error adding Superseed chain:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={addsuperseedMainnet}
      disabled={isAdded || isLoading}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-gray-400"
    >
      {isLoading
        ? "Adding Superseed Network..."
        : isAdded
        ? "Superseed Network Added"
        : "Add Superseed Network"}
    </button>
  );
}
