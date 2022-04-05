// import '../styles/globals.css'
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "mobx-react";
import { useStore } from "./stores";

function MyApp({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps);
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
