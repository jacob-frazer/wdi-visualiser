export const addMappings = (mappings) => {
    return {
    type: "ADD_MAPPINGS",
    payload: mappings
}}

export const addRevMappings = (mappings) => {
    return {
    type: "ADD_REVERSED_MAPPINGS",
    payload: mappings
}}

export const waitingMappings = () => ({
    type: "WAITING_MAPPINGS"
})

export const receivedMappings = () => ({
    type: "RECEIVED_MAPPINGS"
})
