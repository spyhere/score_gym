const ADD = "ADD";

const updateState = (newState) => {
    return {type: ADD,
    newState}
}

export const stateReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [action.newState];
        default:
            return state;
    }
}

export const mapStateToProps = (state) => {
    return {
        updatedState: state
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        newState: (newState) => {
            dispatch(updateState(newState))
        }
    }    
}