// utils/solanaRpc.js
export const checkTransactionStatus = async (txId) => {
    const url = "https://docs-demo.solana-mainnet.quiknode.pro/";
    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "getSignatureStatuses",
      params: [[txId], { searchTransactionHistory: true }]
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      const txStatus = result && result.result && result.result.value && result.result.value[0];
  
      if (!txStatus) {
        return "not found";
      }
  
      if (txStatus.err) {
        return "failed";
      }
  
      if (txStatus.confirmations === null) {
        return "finalized";
      } else if (txStatus.confirmations !== undefined) {
        return "confirmed";
      }
  
      return "pending";
    } catch (error) {
      console.error("Error fetching transaction status:", error);
      return "error";
    }
  };
  