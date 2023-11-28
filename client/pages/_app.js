import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>User Contact</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
