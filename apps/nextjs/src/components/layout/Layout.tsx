import React, { PropsWithChildren } from "react";
import { Navbar } from "../navigation/navbar";
import Head from "next/head";
import { useAuth } from "@clerk/nextjs";
import LoadingSpinner from "../static/LoadingSpinner";

const Layout = ({ children }: PropsWithChildren) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="bg-lightPrimary dark:bg-darkPrimary dark:text-darkSecondary text-lightSecondary flex h-svh w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Anime Recommender</title>
        <meta
          name="description"
          content="Web application for recommending Anime"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-lightPrimary dark:bg-darkPrimary dark:text-darkSecondary text-lightSecondary flex min-h-screen flex-col items-center">
        {isSignedIn && <Navbar />}
        <div className="w-full">{children}</div>
      </main>
    </>
  );
};

export default Layout;
