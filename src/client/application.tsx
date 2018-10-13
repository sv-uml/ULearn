import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./layout/App"
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { AppReducer } from "./reducers/AppReducer";

let logger = createLogger();

let localState: Object;
if (localStorage.getItem("appState"))  {
    localState = JSON.parse(localStorage.getItem('appState'));
} else {
    localState = {};
}

let store = createStore(AppReducer, localState);

store.subscribe(() => {
    localStorage.setItem("appState", JSON.stringify(store.getState()));
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById("app")
)