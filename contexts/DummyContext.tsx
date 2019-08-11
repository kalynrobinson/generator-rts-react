import React from "react"

export interface DummyState {
    dummy: any
}

export const initialDummyState: DummyState = {
    dummy: console.warn("Missing DummyState#dummy")
}

export const DummyContext = React.createContext<DummyState>(initialDummyState)
