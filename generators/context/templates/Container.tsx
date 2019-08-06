import React, { useState } from "react"

import {
    <%= name %>Context,
    <%= name %>State,
    initial<%= name %>State
} from "<%= output %>"

export const <%= name %>Container: React.FC = ({ children }) => {
    <% for (let i = 0; i < props.length; i++) { %>
        const [
            <%= props[i].attributeName %>, 
            set<%= props[i].attributeName.substr(0, 1).toUpperCase() + props[i].attributeName.substr(1).toLowerCase() %>
        ] = useState<<%= props[i].attributeType %>>()
    <% } %>

    const state: <%= name %>State = {
        ...initial<%= name %>State,
        <% for (let i=0; i < props.length; i++) { %>
            <%= props[i].attributeName %>,
        <% } %>
    }

    return (
        <<%= name %>Context.Provider value={state}>
            {children}
        </<%= name %>Context.Provider>
    )
}
