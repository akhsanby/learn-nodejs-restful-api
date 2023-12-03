import Head from "next/head";
import nookies from "nookies";
import { getLoggedInUser } from "@/utils/axios-client.js";
import { store } from "@/utils/redux/store/index.js";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>User Contact</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const isAuthenticated = await getLoggedInUser();

  if (cookies.token || isAuthenticated) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }

  return { props: {} };
}
