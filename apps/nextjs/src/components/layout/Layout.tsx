import React, { PropsWithChildren } from "react";
import { Navbar } from "../navigation/navbar";
import Head from "next/head";
import { useAuth } from "@clerk/nextjs";
import LoadingSpinner from "../static/LoadingSpinner";

const Layout = ({ children }: PropsWithChildren) => {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <>
      {!isLoaded ? (
        <div className=" bg-lightPrimary dark:bg-darkPrimary flex h-svh w-full  items-center justify-center align-middle">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <Head>
            <title>Anime Recommender</title>
            <meta
              name="description"
              content="Web application for recommending Anime"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex h-screen  flex-col items-center ">
            {isSignedIn && <Navbar />}
            <div className=" bg-lightPrimary dark:bg-darkPrimary  h-full  w-full  ">
              {children}
            </div>
          </main>
        </>
      )}
    </>
  );
};
export default Layout;
