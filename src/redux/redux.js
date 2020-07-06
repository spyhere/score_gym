const UPDATE = "UPDATE";

const updateState = (newState) => {
    return {type: UPDATE,
    newState}
}

let stateInit = {barsQuant: 8, measure: "four_quarters", pauseValue: 10, easyOBProb: 20, tripletValue: 90, groupRest: true, bpm: 70,
easyGrouping: 95, linkIns: true, linkOut: 50, lvl: 2, simpleK: 50, dotsK: -0.1, groupK: 60, maxK: 60, beat: true, beatNumb: true, beamNum: 1,  
noteValues: {whole: 5, half: 11, quarter: 15, eighth: 35, sixteenth: 36, thirtySecond: 0},
dottedValues: {whole: -0.1, half: 5, quarter: 10, eighth: 30, sixteenth: 0, thirtySecond: 0},
groupingValues: {whole: -0.1, half: 3, quarter: 10, eighth: 12},
simValIns: {whole: -0.1, half: 5, quarter: 15, eighth: 20, sixteenth: 25, thirtySecond: 0}, 
quintepletMap: {whole: -0.1, half: 5, quarter: 15, eighth: 0},
maxSimple: 5, maxDotted: 4, maxTuplet: 4, maxValsInTuplet: 5, maxQuintepletProb: 3,
inputLag: 100, gap: 100, metronomeSwitch: false, mistakes: null, mode: null, settings: false, info: false, tips: true, tab: 0};

export const stateReducer = (state = stateInit, action) => {
    let prevState = {...state};
    switch (action.type) {
        case UPDATE:
            let keys = Object.keys(action.newState);
            for (let n in keys) {
                if (prevState.hasOwnProperty(keys[n])) {
                    prevState[keys[n]] = action.newState[keys[n]];
                }
                
            }
            return prevState;
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
        updateState: (newState) => {
            dispatch(updateState(newState))
        }
    }    
}