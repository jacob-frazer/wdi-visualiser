export const addMappings = (mappings) => {
    return {
    type: "ADD_MAPPINGS",
    payload: mappings
}
}

export const waitingMappings = () => ({
    type: "WAITING_MAPPINGS"
})
