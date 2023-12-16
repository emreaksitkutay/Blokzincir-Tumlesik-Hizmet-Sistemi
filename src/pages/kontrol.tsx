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
          <main style={{ textAlign: 'center', margin: '0 auto', maxWidth: '500px' }}>
            <h1 style={{ fontSize: '24px', margin: '20px 0' }}>İşlem Durumu Kontrolü</h1>
            <p style={{ fontSize: '18px', margin: '20px 0' }}>Lütfen size SMS olarak gelen İşlem Kimliğini gerekli yere giriniz.</p>
            <input
              type="text"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder="İşlem Kimliğini Girin"
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px', width: '100%', boxSizing: 'border-box' }}
            />
            <button
              onClick={handleCheckStatus}
              style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '10px' }}
            >
              Durumu Kontrol Et
            </button>
            {status && <p style={{ marginTop: '10px' }}>İşlem Durumu: {status}</p>}
          </main>
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
