import React, { PropsWithChildren } from "react";
import { Navbar } from "../navigation/navbar";
import Head from "next/head";
import { useAuth } from "@clerk/nextjs";


const Layout = ({ children }: PropsWithChildren) => {
    const { isSignedIn } = useAuth();


    return (
        <>
            <Head>
                <title>Anime Recommender</title>
                <meta name="description" content="Web application for recommending Anime" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col  h-screen items-center ">
                {isSignedIn && <Navbar />}
                <div className=" w-full h-full bg-lightPrimary dark:bg-darkPrimary  overflow-scroll">
                    {children}
                </div>
            </main>

        </>
    );
};
export default Layout;