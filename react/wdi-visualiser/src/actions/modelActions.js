export const updateMLParams = (target, update) => {
    return {
    type: "CHANGE_ML_PARAMS",
    payload: {
        target: target,
        value: update
    }
  }
}

export const updateModel = (model) => {
    return {
        type: "UPDATE_MODEL",
        payload: {
            results: model,
            type: model.type
        }
    }
}

export const waitingForML = () => {
    return {
        type: "WAITING_FOR_MODEL"
    }
}

export const notWaiting = () => {
    return {
        type: "NOT_WAITING"
    }
}

export const mlTypeChange = () => {
    return {
        type: "ML_TYPE_CHANGE"
    }
}