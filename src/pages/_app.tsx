import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { PageLayout } from "~/components/layout";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>JMT Bistro🍺</title>
        <meta name="description" content="have a nice day and 🍷" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
      <Toaster position="bottom-center" />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
