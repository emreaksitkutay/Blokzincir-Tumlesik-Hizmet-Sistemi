// pages/tarim.tsx
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Header } from "@components/layout/header";
import { PageContainer } from "@components/layout/page-container";
import { TarimContent } from "@components/tarim/tarim-content";
import { DrawerContainer } from "@components/layout/drawer-container";
import { Menu } from "@components/layout/menu";
import { Footer } from "@components/layout/footer";

const Tarim: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tarım - Blokzincir Tümleşik Hizmetler Sistemi</title>
        <meta
          name="description"
          content="Tarım ve çiftçilikle ilgili bilgiler"
        />
      </Head>
      <DrawerContainer>
        <PageContainer>
          <Header />
          <TarimContent />
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

export default Tarim;