export const simpleAction = () => ({
    type: "HELLO_REACT"
})

export const colourAction = (a) => ({
    type: "CHANGE_COLOUR",
    payload: !a
})