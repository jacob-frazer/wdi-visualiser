export const addMappings = (mappings) => {
    console.log("add mappings has been dispatchwd")
    console.log(mappings)
    console.log()
    return {
    type: "ADD_MAPPINGS",
    payload: mappings
}
}

export const waitingMappings = () => ({
    type: "WAITING_MAPPINGS"
})
