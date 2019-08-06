import React from "react"

export interface <%= name %>State {
    <% for (let i=0; i < props.length; i++) { %>
        "<%= props[i].attributeName %>": <%= props[i].attributeType %>
    <% } %>
}

export const initial<%= name %>State: <%= name %>State = {
    <% for (let i = 0; i < props.length; i++) { %>
        "<%= props[i].attributeName %>": console.warn("Missing <%= name %>State#<%= props[i].attributeName %>"),
    <% } %>
}

export const <%= name %>Context = React.createContext <<%= name %>State>(
    initial<%= name %>State
)
