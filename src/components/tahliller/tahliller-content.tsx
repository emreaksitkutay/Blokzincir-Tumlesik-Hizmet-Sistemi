// components/tahliller/tahliller-content.tsx
import React, { useState, useEffect } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { useDataFetch } from "@utils/use-data-fetch";
import { ItemList } from "@components/home/item-list";
import { ItemData } from "@components/home/item";
import { toast } from "react-hot-toast";

export function TahlillerContent() {
  const { publicKey } = useWallet();
  const [data, setData] = useState<Array<ItemData>>([]);
  const [loading, setLoading] = useState(false);

  const fetchTahliller = async () => {
    if (publicKey) {
      setLoading(true);
      try {
        const response = await fetch(`/api/items/${publicKey.toBase58()}`);
        if (response.ok) {
          const tahlillerData: Array<ItemData> = await response.json();
          setData(tahlillerData);
        } else {
          toast.error("Failed to load tahliller.");
        }
      } catch (error) {
        console.error("Fetching tahliller error:", error);
        toast.error("An error occurred while fetching tahliller.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTahliller();
  }, [publicKey]);

  if (loading) {
    return <p className="text-center p-4">Loading tahliller...</p>;
  }

  if (!publicKey) {
    return (
      <div className="text-center p-4">
        Please connect your wallet to view your tahliller.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1">
      <ItemList items={data} />
    </div>
  );
}
