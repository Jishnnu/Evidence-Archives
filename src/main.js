import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
        domain="dev-5zswcr5bk4qhfu4r.us.auth0.com"
        clientId="GqQdYyGeLhvvlMLfMdvY7Qwg3iMtrkOD"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);
export default renderApp;