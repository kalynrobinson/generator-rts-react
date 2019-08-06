import React, { useState, useContext } from "react"

import { useTranslation } from "react-i18next"

export interface DummyProps {
    dummy: "any"
}

export const Dummy: React.FunctionComponent<DummyProps> = ({ dummy }) => {
    const { t } = useTranslation()

    // const [state, setState] = useState();

    // const { dummy } = useContext(DummyContext);

    return <div>{t("hello_world")}</div>
}
