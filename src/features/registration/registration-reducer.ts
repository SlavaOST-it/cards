const initialState = {

}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: any) => {      // вместо any указать типизицию
    switch (action.type) {

        default:
            return {...state}
    }
}