import React, { useState, useEffect } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { ItemList } from "@components/home/item-list";
import { ItemData } from "@components/home/item";
import { toast } from "react-hot-toast";

export function SertifikaContent() {
  const { publicKey } = useWallet();
  const [data, setData] = useState<Array<ItemData>>([]);
  const [loading, setLoading] = useState(false);

  const url = `https://mainnet.helius-rpc.com/?api-key=094d02d1-10ef-4504-92c8-85038f28a9ee`

  const getAssetsByOwner = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: publicKey,
          page: 1, // Starts at 1
          limit: 1000,
        },
      }),
    });
    const { result } = await response.json();

    setData(result.items)
  };

  React.useEffect(() => {
    if (publicKey) getAssetsByOwner()
  }, [publicKey])

  if (loading) {
    return <p className="text-center p-4">Sertifikalar Yükleniyor...</p>;
  }

  if (!publicKey) {
    return (
      <div className="text-center p-4">
        Sertifikalarınızı görüntülemek için cüzdanınıza bağlanın.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1">
      <ItemList items={data} />
    </div>
  );
}
