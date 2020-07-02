const CHANGE = "CHANGE";
const UPDATE = "UPDATE";

const changeState = (newState) => {
    return {type: CHANGE,
    newState}
}

const updateState = (newState) => {
    return {type: UPDATE,
    newState}
}

let stateInit = {bars: [], barsQuant: 8, measure: "four_quarters", pauseValue: 10, easyOBProb: 20, tripletValue: 90, groupRest: true, bpm: 70,
easyGrouping: 95, linkIns: true, linkOut: 50, lvl: 2, simpleK: 50, dotsK: -0.1, groupK: 60, beat: true, beatNumb: true, beamNum: 1, receivedVal: [],  
noteValues: {whole: 5, half: 11, quarter: 15, eighth: 35, sixteenth: 36, thirtySecond: 0},
dottedValues: {whole: -0.1, half: 5, quarter: 10, eighth: 30, sixteenth: 0, thirtySecond: 0},
groupingValues: {whole: -0.1, half: 3, quarter: 10, eighth: 12}, 
simValIns: {whole: -0.1, half: 5, quarter: 15, eighth: 20, sixteenth: 25, thirtySecond: 0},
metronomeSwitch: false, mistakes: null, mode: null, settings: false, info: false};

export const stateReducer = (state = stateInit, action) => {
    let prevState = {...state};
    switch (action.type) {
        case CHANGE:
            let key = Object.keys(action.newState);
            prevState[key] = action.newState[key];
            return prevState;
        case UPDATE:
            return action.newState;
        default:
            return state;
    }
}

export const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        newState: (newState) => {
            dispatch(changeState(newState))
        },
        updateState: (newState) => {
            dispatch(updateState(newState))
        }
    }    
}