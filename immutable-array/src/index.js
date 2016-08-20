import React from "react";
import ReactDOM from "react-dom";
import { Map } from "immutable";

import {
    createStore,
    applyMiddleware
} from "redux";

import { 
    reducer as formReducer
} from "redux-form/immutable";

import Form from "./form";

const mainReducer = (state = Map(), action) => {
    state.set('form', formReducer(state.get('form'), action));
    return state;
}; 

ReactDOM.render(<Form />, document.getElementById('main'));