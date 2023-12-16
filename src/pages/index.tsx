import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Header } from "@components/layout/header";
import { PageContainer } from "@components/layout/page-container";
import { HomeContent } from "@components/home/home-content";
import { DrawerContainer } from "@components/layout/drawer-container";
import { ButtonState } from "@components/home/button";
import { Menu } from "@components/layout/menu";
import { TwitterResponse } from "@pages/api/twitter/[key]";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDataFetch } from "@utils/use-data-fetch";
import { Footer } from "@components/layout/footer";

const Home: NextPage = () => {
  const { publicKey, signTransaction, connected } = useWallet();

  const { data } = useDataFetch<TwitterResponse>(
    connected && publicKey ? `/api/twitter/${publicKey}` : null
  );

  const twitterHandle = data && data.handle;

  const [txState, setTxState] = React.useState<ButtonState>("initial");

  return (
    <>
      <Head>
        <title>Blokzincir Tümleşik Hizmetler Sistemi</title>
        <meta
          name="description"
          content="Everything you need to start your Solana dApp"
        />
      </Head>
      <DrawerContainer>
        <PageContainer>
          <Header twitterHandle={twitterHandle} />
          <HomeContent />
          <Footer />
        </PageContainer>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <Menu
            twitterHandle={twitterHandle}
            className="p-4 w-80 bg-base-100 text-base-content"
          />
        </div>
      </DrawerContainer>

    </>
  );
};

export default Home;