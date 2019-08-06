import React, {
    <%= state ? "useState," : "" %>
    <%= context ? "useContext," : "" %>
} from "react"

<% if (i18n) { %>
import { useTranslation } from "react-i18next"
<% } %>

<% if (typed) { %>
export interface <%= name %>Props {
    <% for (let i=0; i < props.length; i++) { %>
        "<%= props[i].attributeName %>": "<%= props[i].attributeType %>",
    <% } %>
}
<% } %>

export const <%= name %>: React.FunctionComponent<
<%= typed ? name + "Props" : "{}" %>
> = (
    <% if (typed) { %>
    {
        <% for (let i = 0; i < props.length; i++) { %>
        <%= props[i].attributeName %>,
        <% } %>
    }
    <% } %>
) => {
    <% if (i18n) { %>
        const { t } = useTranslation();
    <% } %>
    
    <% if (state) { %>
        // const [state, setState] = useState();
    <% } %>
    
    <% if (context) { %>
        // const { dummy } = useContext(DummyContext);
    <% } %>

    return (
        <div>
            <% if (i18n) { %>
                {t("hello_world")}
            <% } else { %>
                hello world
            <%  } %>
        </div>
    )
}
