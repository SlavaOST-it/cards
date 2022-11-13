export type SetInitializedAT = ReturnType<typeof setInitializedAC>
export type AppActionType = SetInitializedAT

const initialState = {
    status: 'loading',
    error: null,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

// ===== ActionCreators ===== //
export const setInitializedAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)

// ===== ThunkCreators ===== //