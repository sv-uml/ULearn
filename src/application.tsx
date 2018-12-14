import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { AppReducer } from "./misc/AppReducer";
import { App } from "./layout/App";

let localState: Object;
if (localStorage.getItem("state"))  {
    localState = JSON.parse(localStorage.getItem("state"));
} else {
    localState = {};
}

let store = createStore(AppReducer, localState);
store.subscribe(() => {
    localStorage.setItem("state", JSON.stringify(store.getState()));
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={"/~sverma1"} >
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
