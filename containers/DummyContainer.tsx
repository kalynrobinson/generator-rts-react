import React, { useState } from "react"

import { DummyContext, DummyState, initialDummyState } from "containers"

export const DummyContainer: React.FC = ({ children }) => {
    const [dummy, setDummy] = useState<any>()

    const state: DummyState = {
        ...initialDummyState,

        dummy
    }

    return (
        <DummyContext.Provider value={state}>{children}</DummyContext.Provider>
    )
}
