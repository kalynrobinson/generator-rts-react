import React from 'react';
import ReactDOM from 'react-dom';

import { <%= name %> } from "../"

describe("<<%= name %>/>", () => {
    it("mounts without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<<%= name %> />, div);
    })
})