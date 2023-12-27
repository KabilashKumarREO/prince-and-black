import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../store";
import Router from "next/router";
import nProgress from "nprogress";
import Script from "next/script";
import Footer from "../components/Footer";

nProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script id="gtm-tag">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MSJ6WT3');
        `}
      </Script>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}

export default MyApp;
