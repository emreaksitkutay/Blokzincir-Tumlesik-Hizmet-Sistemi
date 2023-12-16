// pages/kontrol.tsx
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { checkTransactionStatus } from "@utils/solanaRpc";
import { Header } from "@components/layout/header";
import { PageContainer } from "@components/layout/page-container";
import { DrawerContainer } from "@components/layout/drawer-container";
import { Menu } from "@components/layout/menu";
import { Footer } from "@components/layout/footer";

const Kontrol: NextPage = () => {
    const [txId, setTxId] = useState("");
    const [status, setStatus] = useState("");
  
    const handleCheckStatus = async () => {
      const result = await checkTransactionStatus(txId);
      setStatus(result);
    };
  
    return (
      <>
        <Head>
          <title>İşlem Durumu Kontrolü - Blokzincir Tümleşik Hizmetler Sistemi</title>
        </Head>
        <DrawerContainer>
          <PageContainer>
            <Header />
            {/* İşlem Durumu Kontrolü İçeriği */}
            <div>
              <h1>İşlem Durumu Kontrolü</h1>
              <input
                type="text"
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
                placeholder="İşlem Kimliğini Girin"
              />
              <button onClick={handleCheckStatus}>Durumu Kontrol Et</button>
              {status && <p>İşlem Durumu: {status}</p>}
            </div>
            <Footer />
          </PageContainer>
          <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <Menu className="p-4 w-80 bg-base-100 text-base-content" />
          </div>
        </DrawerContainer>
      </>
    );
  };
  
  export default Kontrol;