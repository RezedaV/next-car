import type {AppContext, AppProps} from 'next/app'
import {Provider} from "react-redux";
import App from "next/app";
import {store} from "../store";

const CarApp = ({ Component, pageProps }: AppProps) => {
    return(
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
CarApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
}

export default CarApp
