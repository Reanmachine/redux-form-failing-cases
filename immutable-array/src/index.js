import React from "react";
import ReactDOM from "react-dom";
import { Map } from "immutable";

import {
    Provider
} from "react-redux";

import {
    createStore,
    applyMiddleware
} from "redux";

import { 
    reducer as formReducer
} from "redux-form/immutable";

import createLogger from "redux-logger";

import Form from "./form";

const mainReducer = (state = Map(), action) => {
    let form = formReducer(state.get('form'), action);
    return state.set('form', form);
}; 

const logger = createLogger({
    stateTransformer: state => state.toJS()
});
const withMiddleware = applyMiddleware(
    logger
)(createStore);
const store = withMiddleware(mainReducer);

// Let's save this onto the window for inspection.
window.store = store;

const Application = props => (
    <Provider store={store}>
        <Form />
    </Provider>
);

ReactDOM.render(<Application />, document.getElementById('main'));