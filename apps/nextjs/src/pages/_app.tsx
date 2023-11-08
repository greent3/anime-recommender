import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import Layout from "../components/layout/Layout";
import { dark } from '@clerk/themes';

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary:
            "bg-darkSecondary",
          footerActionLink:
            "text-darkSecondary",
          formResendCodeLink:
            "text-darkSecondary",
          identityPreviewEditButton:
            "text-darkSecondary"
        }

      }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
