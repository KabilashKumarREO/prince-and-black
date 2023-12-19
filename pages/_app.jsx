import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../store";
import Router from "next/router";
import nProgress from "nprogress";

nProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
