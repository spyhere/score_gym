let valuesSimple = [["whole", "whole--rest", 4],["half", "half--rest", 2],["quarter", "quarter--rest", 1],
["eighth", "eighth--rest", 0.5],["sixteenth", "sixteenth--rest", 0.25],["thirty-second", "thirty-second--rest", 0.125]];
let valuesDots = [["whole--dot", "whole--dot--rest", 6],["half--dot","half--dot--rest",3],["quarter--dot","quarter--dot--rest",1.5],
["eighth--dot","eighth--dot--rest",0.75],["sixteenth--dot","sixteenth--dot--rest",0.375],["thirty-second--dot","thirty-second--dot--rest",0.1875]];
let valuesGroupings = [["whole--triplet","whole--quinteplet", 4],["half--triplet","half--quinteplet", 2],["quarter--triplet","quarter--quinteplet",1],
["eighth--triplet","eighth--quinteplet",0.5]];

let values = [valuesSimple].concat([valuesDots]);
values = values.concat([valuesGroupings]); // THE WHOLE ARRAY OF NOTE VALUES

export let measureReassign = {     // GIVING MEASURE IN NUMBER EQUIVALENT
    "two_quarters": 2,
    "three_quarters": 3,
    "four_quarters": 4,
    "five_quarters": 5,
    "seven_quarters": 7,
    "five_eights": 2.5,
    "six_eights": 3
}

let names4Beaming = [/eighth|sixteenth|thirty-second/,/rest/]; // REGEX TO MAKE BEAMING
let beamNum = 1; // THE QUANTITY OF QUARTERS TO BEAM


let barsQuant = 4;  // CHOOSEN QUANTITY OF BARS
let bars = [];      // CHOOSEN NOTE VALUES
let measure = 4;    // MEASURE IN QUARTER EQUIVALENT
let pauseValue = 10; // POSSIBILITY OF PAUSE
let easyOBProb = 20; // PROBABILITY OF LONGER NOTE VALUE ON BEAT
let tripletValue = 90; // POSSIBILITY OF TRIPLET; 100 - tripletValue = POSSIBILITY OF QUINTEPLET
let easyGrouping = 100; // DIFFICULTY OF GROUPINGS IN TUPLETS
let linkIns = true; // ALLOWING GROPINGS WITH LINKS INSIDE THE BAR
let linkOut = 0; // PROBABILITY GROUPINGS WITH LINKS OUTSIDE THE BAR
let lvl = 0;        // LEVEL OF DIFFICULTY
let groupRest = true; // GROUPING REST
let showBeat = false; // NOT ALLOWING TO START THE GROUP BEFORE STRONG BEAT
let fixingBeatProb = 70; // PROBABILITY TO MOVE RHYTM TO STRONG OR WEAK BEAT 

// PROBABILITY OF SIMPLE VALUES****
let noteValues = {  // PROBABILITY 
    whole: 5,   //5
    half: 11,   //11
    quarter: 44,//44
    eighth: 56, //56
    sixteenth: 64, //64
    thirtySecond: 0 //66
}
let noteValuesNames = Object.keys(noteValues); 

let noteProbability = []; // ARRAY WITH "noteValuesNames" + PERCENTAGE OF PROBABILITY
let maxNoteValue = null;  // MAXIMUM PERCENTAGE VALUE OF PROBABILITY OF "noteValue";

// PROBABILITY OF SIMPLE VALUES****

// PROBABILITY OF DOTTED VALUES****
let dottedValues = {
    whole: -0.1,//0
    half: -0.1,//0
    quarter: 10,//10 
    eighth: 30, //30    enable noteValues sixteenth
    sixteenth: 0, //35  enable noteValues thirtySecond
    thirtySecond: 0 //66
}
let dottedValuesNames = Object.keys(dottedValues);

let dottedProbability = [];
let maxDottedValue = null;

// PROBABILITY OF DOTTED VALUES****

// PROBABILITY OF GROUPING VALUES****
let groupingValues = {
    whole: -0.1,    //0
    half: 3,        //3
    quarter: 10,    //10  simValIns triplet=eights, quinteplet=sixteenth
    eighth: 12     //12 
}
let groupingValuesNames = Object.keys(groupingValues);

let groupingProbability = [];
let maxGroupingValue = null;

// PROBABILITY OF GROUPING VALUES****

// THE ARRAY OF PROBABILITIES
let probability = null; 

// PROBABILITY OF VALUES INSIDE THE TUPLET
let simValIns = {
    whole: -0.1,
    half: 5,
    quarter: 15,
    eighth: 20,
    sixteenth: 25,
    thirtySecond: 30
}

let simValInsNames = Object.keys(simValIns);

let simValInsProbability = [];
let maxSimValsIns = null;

// PROBABILITY OF VALUES INSIDE THE TUPLET



let ind = 0;        // INDEX OF ARRAY: SIMPLE, DOTS, GROUPINGS
let indInner = 0;   // INDEX INSIDE THE ARRAY
let fill = 0;       // FILLING OF THE BAR

// DETERMINING THE PROBABILITY OF DIFFERENT NOTES VALUES
let simpleK = 75; // 75 
let dotsK = 95;   // 20 95
let groupK = 100;  // 5 100
let lvlK = null;  // MAXIMUM VALUE TO DETERMINE "ind"
let arrayOfProbability = [simpleK,dotsK,groupK];




export function updateData(state) {
    beamNum = state.beamNum;
    barsQuant = state.barsQuant;
    measure = measureReassign[state.measure];
    pauseValue = state.pauseValue;
    easyOBProb = state.easyOBProb;
    tripletValue = state.tripletValue;
    easyGrouping = state.easyGrouping;
    linkIns = state.linkIns;
    linkOut = state.linkOut;
    lvl = state.lvl;
    simpleK = state.simpleK;
    dotsK = state.dotsK;
    groupK = state.groupK;
    lvlK = state.lvlK;
    groupRest = state.groupRest;
    showBeat = state.showBeat;
    //////////////////
    noteValues = state.noteValues;
    noteProbability = [];
    maxNoteValue = null;

    for (let n in noteValuesNames) {
        if (noteValues[noteValuesNames[n]] !== 0) {
            noteProbability.push([noteValuesNames[n]]);
            noteProbability[n].push(noteValues[noteValuesNames[n]]);
        }
    }
    maxNoteValue = noteProbability.reverse()[0][1];
    noteProbability.reverse();
    //
    dottedValues = state.dottedValues;
    dottedProbability = [];
    maxDottedValue = null;

    for (let n in dottedValuesNames) {
        if (dottedValues[dottedValuesNames[n]] !== 0) {
            dottedProbability.push([dottedValuesNames[n]]);
            dottedProbability[n].push(dottedValues[dottedValuesNames[n]]);
        }
    }
    maxDottedValue = dottedProbability.reverse()[0][1];
    dottedProbability.reverse();
    //
    groupingValues = state.groupingValues;
    groupingProbability = [];
    maxGroupingValue = null;

    for (let n in groupingValuesNames) {    
        if (groupingValues[groupingValuesNames[n]] !== 0) {
            groupingProbability.push([groupingValuesNames[n]]);
            groupingProbability[n].push(groupingValues[groupingValuesNames[n]]);
        }
    }
    maxGroupingValue = groupingProbability.reverse()[0][1];
    groupingProbability.reverse();
    //
    simValIns = state.simValIns;
    simValInsProbability = [];
    maxSimValsIns = null;

    for (let n in simValInsNames) {
        if (simValIns[simValInsNames[n]] !== 0) {
           simValInsProbability.push([simValInsNames[n]]);
            simValInsProbability[n].push(simValIns[simValInsNames[n]]); 
        } 
    }
    maxSimValsIns = simValInsProbability.reverse()[0][1];
    simValInsProbability.reverse();
    //////////////////
    probability = [[noteProbability,maxNoteValue],[dottedProbability,maxDottedValue],
    [groupingProbability,maxGroupingValue]];
    arrayOfProbability = [simpleK,dotsK,groupK];
    //
    //  CHANGING THE LEVEL OF DIFFUCULTY
    if (lvl === 0) {
        lvlK = simpleK-1;
        // linkOut = 0;
    }
    else if (lvl === 1) {
        lvlK = dotsK-1;
        // linkOut = 50;
    } 
    else {
        lvlK = 100;
        // linkOut = 100;
    }
}

// generatingValues();

 export function generatingValues() {
    let bar = [];
    bars = [];
    while (bars.length < barsQuant) {
        let remained = measure - fill;
        let valuesInd = Math.round(Math.random()*(lvlK));
        ind = null;
        arrayOfProbability.forEach((x,index) => {
            if ((valuesInd < x) && (!ind) && (ind!==0) && (remained >= values[index][probability[index][0].length-1][2])) {
                ind = index;
            }
            else if (!ind && ind!==0 && index===probability.length-1) {
                ind = 0;
            }
        })

        // TUPLET NOT TO FALL ON WEAK BEAT
        if (!Number.isInteger(fill) && (ind === 2) && (dotsK > simpleK) ) {
            ind = 1
        }
        else if (!Number.isInteger(fill) && (ind === 2) && (dotsK < simpleK) ) {
            ind = 0;
        }
            

        let min = null;
        let safeMin = null;

        values[ind].forEach((x,index) => {
            if (x[2] <= remained && !min && min!==0) {
                min = index;
                safeMin = index;
                }
            });

        let linkOutPr = (measure - fill <= 1 && bars.length+1 < barsQuant && linkOut && ind !== 2) ? Math.round(Math.random()*100) : null;
        if (linkOutPr < linkOut && linkOutPr) {
            min = 1;
        } 
    
        // GENERATING NEW NOTE VALUE
        generatingIndex(min,fill,ind)
        
        let indInnerInner = insideValue();

        let checkOut = values[ind][indInner][2] - remained;
        if (measure - fill <= 1 && !values[0].some((x) => x[2] === checkOut) && !values[1].some((y) => y[2] === checkOut) && 
        ind !== 2 && checkOut > 0) {
            indInner = safeMin;
        }
       

        // LINKS OUTSIDE THE BAR
        if (fill + values[ind][indInner][2] > measure) {
            [bar, bars, fill] = groupingOut(bar, bars, indInner, indInnerInner, fill);
        }

         // GROUPING WITH LINKS INSIDE THE BAR
         else if (linkIns && !Number.isInteger(values[ind][indInner][2] + fill) 
         && !Number.isInteger(fill) && fill + values[ind][indInner][2] <= measure 
         && values[ind][indInner][2] + fill > Math.ceil(fill) && noteProbability.length < 6 && ind !== 2) {
             [bar, fill] = groupingIns(ind, bar, indInner, indInnerInner, fill);
         }

        // NO LINKS
        else {
            bar.push([values[ind][indInner][indInnerInner], values[ind][indInner][2]]);
            fill += values[ind][indInner][2];
        }

        
        
        // GENERATING NOTE VALUES FOR GROUPINGS
        if (values[ind][0][0] === "whole--triplet") {
            let barGroup = [];
            generatingGroupingValues(ind,indInner,indInnerInner,barGroup);
            bar.push(barGroup);
        }

        // FIXING THE BEAT
        if (String(measure - fill).length > 3 && Math.random()*100 <= fixingBeatProb) {
            values[0].forEach((z) => {
                if ((z[2] + fill === Math.ceil(fill) || z[2] + fill === Math.ceil(fill) - beamNum / 2) && String(measure - fill).length > 3) {
                    bar.push([z[0], z[2]]);
                    fill += z[2];
                }
            })
        }

        // CLOSING THE BAR
        if (fill === measure) {
            let beamFill = 0;
            let beamGr = 0;
            let beamGrNames = [];  

             // BEAMING EIGHTH, SIXTEENTH AND THIRTY-SECOND
            bar = beaming(beamFill, beamGr, beamGrNames, bar);
            // console.log("end")
            bars.push(bar);
            bar = [];
            fill = 0;
        }
    }
    bars[0].unshift(measure);
    // console.log(bars);
    return bars;
}


function generatingIndex(minimum,fill,ind,tuplet) {
    let maxVal = (tuplet) ? maxSimValsIns : probability[ind][1];
    indInner = 0;
    let minVal;
    let check = probability[ind][0];
    if (minimum === 0) {
        minVal = 0;
        }
    else if (!tuplet) {
        minVal = Math.round(probability[ind][0][minimum-1][1]);   
    }

    if (Number.isInteger(fill) && (probability[ind][0].length > minimum+2) && !tuplet) {
        let easyOnB = Math.round(Math.random()*100);
        if (fill === 0 && easyOnB-30 < easyOBProb && probability[ind][0].length > minimum+3) {
            maxVal = probability[ind][0][minimum+3][1];
            }
        else if (easyOnB < easyOBProb) {
            maxVal = probability[ind][0][minimum+2][1];
            }
    }
    
    if(tuplet) {
        minVal = (minimum === 0) ? 0 : simValInsProbability[minimum-1][1];
        check = simValInsProbability;
    }

    let randomInd = Math.random()*(maxVal-minVal)+minVal;

    for (let n in check) {
        if (randomInd < check[n][1]) {
            indInner = Number(n);
            return indInner
        }
    }
    return indInner = minimum;
}

// GENERATING NOTE OR REST, TRIPLET OR QUINTEPLET
function insideValue() {
    if (values[ind][0][0] === "whole--triplet") {
        let coef = Math.round(Math.random()*100);
        if (coef <= tripletValue ) {
            return 0;
        }
        return 1;
    }
    let coef = Math.round(Math.random()*100);
    if (coef < pauseValue) {
        return 1;
    }
    return 0;
    
}

// GROUPING OF TUPLETS
function generatingGroupingValues(ind, indInner, indInnerInner, barGroup) {
    let measureGroup; // MEASURE OF TUPLET IN QUARTER EQUIVALENT
    if (!indInnerInner) {
        measureGroup = (values[ind][indInner][2])/2*3;
    }
    else {
        measureGroup = (values[ind][indInner][2])/4*5;
    }
    let minGroupEasy = null
    let fillGroup = 0;
    let coefGroup = Math.round(Math.random()*100)-1;
    while (fillGroup < measureGroup) {
        let remainedGroup = measureGroup - fillGroup;
        let minGroup = null;
        let indInnerGroup;
        values[0].forEach((x,index) => {
            if (x[2] <= remainedGroup && !minGroup && minGroup!==0) {
                minGroup = index;
                if (!minGroupEasy) {minGroupEasy = index}
            }
        });

        if (coefGroup < easyGrouping) {
            if (!indInnerInner) {
                minGroup = minGroupEasy + 1;
            }
            else {
                minGroup = minGroupEasy + 2;
            }
            indInnerGroup = minGroup;
        }
        else {
            let tuplet = 1; // INVOKING SPECIAL ARRAY FOR THE INSIDE OF TUPLETS
            indInnerGroup = generatingIndex(minGroup,fillGroup,0,tuplet);
        }

        barGroup.push([values[0][indInnerGroup][0], values[0][indInnerGroup][2]]);
        fillGroup += values[0][indInnerGroup][2];
    } 
    return barGroup;
}

// GROUPING WITH LINKS INSIDE THE BAR
function groupingIns(ind, bar, indInner, indInnerInner, fill) {
    let remainedIns = Math.ceil(fill) - fill;
    let fillIns = 0;
    let indIns = null
    let run = 0;
    while (remainedIns > 0) {
        let indForCheck = (!run) ? 1 : 0;
        values[indForCheck].forEach((x,index) => {
            if (!indIns && indIns !== 0 && values[indForCheck][index][2] <= remainedIns) {
                if((indForCheck && index < 4) || !indForCheck) {
                    indIns = index;
                    bar.push([((indInnerInner === 0) ?  "0" : '') + values[indForCheck][indIns][indInnerInner], values[indForCheck][indIns][2]]);
                    remainedIns -= values[indForCheck][indIns][2];
                    fill += values[indForCheck][indIns][2];
                    fillIns += values[indForCheck][indIns][2];
                }
            }
        });
        run ++;
    }
    remainedIns = values[ind][indInner][2] - fillIns;
    run = 0;
    indIns = null;
    while (remainedIns > 0) {
        if (remainedIns > 1 || run > 1) {
            values[0].forEach((x,index) => {
                if (!indIns && indIns !== 0 && values[0][index][2] <= remainedIns) {
                        indIns = index;
                        bar.push([values[0][indIns][indInnerInner], values[0][indIns][2]]);
                        remainedIns -= values[0][indIns][2];
                        fill += values[0][indIns][2];
                        indIns = null;
                }
            });
        }
        let indForCheck = (!run) ? 1 : 0;
        values[indForCheck].forEach((x,index) => {
            if (!indIns && indIns !== 0 && values[indForCheck][index][2] <= remainedIns) {
                if((indForCheck && index < 4) || !indForCheck) {
                    indIns = index;
                    bar.push([values[indForCheck][indIns][indInnerInner], values[indForCheck][indIns][2]]);
                    remainedIns -= values[indForCheck][indIns][2];
                    fill += values[indForCheck][indIns][2];
                    indIns = null;
                }
            }
        });
        run ++;
    }

    return [bar, fill];
}

// LINKS OUTSIDE THE BAR 
function groupingOut (bar, bars, indInner, indInnerInner, fill) {
    let remainedIns = measure - fill;
    let run = 0;
            let indIns = null;
            while (measure - fill) {
                let indForCheck = (!run) ? 1 : 0;
                values[indForCheck].forEach((x,index) => {
                if (x[2] === remainedIns && !indIns && indIns!==0) {
                    indIns = index;
                    }
                });
                run++
                if (indIns) {
                    bar.push([((indInnerInner === 0) ?  "1" : '') + values[indForCheck][indIns][indInnerInner], values[indForCheck][indIns][2]]);

                    let beamFill = 0;
                    let beamGr = 0;
                    let beamGrNames = []; 
                    bar = beaming(beamFill, beamGr, beamGrNames, bar);
                    
                    bars.push(bar);
                    fill += values[indForCheck][indIns][2];
                }
            }
            
            bar = [];
            fill = 0;
            run = 0;
            while (fill !== values[ind][indInner][2] - remainedIns) {
                indIns = null;
                let indForCheck = (!run) ? 1 : 0;
                values[indForCheck].forEach((x,index) => {
                    if (x[2] === values[ind][indInner][2] - remainedIns && !indIns && indIns!==0) {
                        indIns = index;
                        }
                    });
                run ++;
                if (indIns) {
                    bar.push([values[indForCheck][indIns][indInnerInner], values[indForCheck][indIns][2]]);
                    fill += values[indForCheck][indIns][2];
            }
                
            }
            return [bar, bars, fill];
}

// BEAMING EIGHTH, SIXTEENTH AND THIRTY-SECOND
function beaming(beamFill, beamGr, beamGrNames, bar, tup) {
    let gr = 0;
    bar.forEach((x, index) => {           
        beamFill += x[1];
        if (Array.isArray(x[0])) {
            x = beaming(0, 0, [], x, true);
            gr = 0;
            beamGr = 0;
            beamGrNames = [];
            return;
        }
            if (names4Beaming[0].test(x[0]) && !names4Beaming[1].test(x[0])) { // DIVIDING EIGHTH+SIXTEENTH,THIRTY-SECOND BY BEAT
                beamGr += x[1];
                beamGrNames.push(x[0]);
            }
            else {
                beamGr = 0;
                beamGrNames = [];
            }
            if (beamGr > beamNum || beamGr === beamNum && !beamGrNames.some((y) => (/sixteenth|thirty-second/).test(y))) {
                beamGr = 0;
                beamGrNames = [];
            }

        if ((/rest/).test(x[0])) {      // GROUPING RESTS
            let a = null;
            if (index+1 <= bar.length-1 && (/rest/).test(bar[index+1][0]) && groupRest) {
                
                values.forEach((z) => z.forEach((y) => {
                    if (y[2] === x[1]+bar[index+1][1] && !a) {
                        // console.log(x[0])
                        bar[index][0] = y[1];
                        bar[index][1] = y[2];
                        beamFill += bar[index+1][1];
                        a = true;
                        // console.log(x[0]);
                        // console.log("end");
                    }
                }))

                if (a) {
                    bar.splice(index+1,1);
                }
            }

        }
        else {
            if (!names4Beaming[0].test(x[0])) {
                return;
            }
            else if (names4Beaming[1].test(x[0])) {
                return;
            }
            if (index+1 <= bar.length-1 && (names4Beaming[0].test(bar[index+1][0]) && !names4Beaming[1].test(bar[index+1][0])) && !(/triplet|quinteplet/).test(bar[index][0])) {



                                // START OF THE GROUP
                                if (beamGr === x[1] && beamFill !== measure/2 && (index === 0 || !(/--st|--gr/).test(bar[index-1][0]) || Array.isArray(bar[index-1][0])) &&
                                 (index === 0 || !((/rest/).test(bar[index-1][0]) && Number.isInteger(beamFill) && showBeat)) && (index<=bar.length-1 && !(/triplet|quinteplet/).test(bar[index+1][0])) ) {

                                    if ((/eighth/).test(x[0])) {                           
                                        bar[index][0] = bar[index][0] + "--st";
                                    }
                                    else if ((new RegExp((x[0].match(/\D/g)).join(""))).test(bar[index+1][0]) || ((/sixteenth|thirty-second/).test(x[0]) && (/sixteenth|thirty-second/).test(bar[index+1][0])) ) {
                                        bar[index][0] = bar[index][0] + "--1--st";
                                    }
                                    else {
                                        bar[index][0] = bar[index][0] + "--0--st";
                                    }
                                    gr++;
                                    
                                }

                                // MIDDLE SECTION
                                else if (index>0 && (/--st|--gr/).test(bar[index-1][0]) && (beamFill !== measure/2 && beamGr !== beamNum || tup) && gr &&
                                (index<=bar.length-1 && !(/triplet|quinteplet/).test(bar[index+1][0])) ) {                                 
                                    if ((/eighth/).test(x[0])) {                           
                                        bar[index][0] = bar[index][0] + "--gr";
                                        }
                                        else if (!(new RegExp((x[0].match(/\D/g)).join(""))).test(bar[index+1][0]) && 
                                        !(new RegExp((x[0].match(/\D/g)).join(""))).test(bar[index-1][0]) && !((/sixteenth|thirty-second/).test(x[0]) && (/sixteenth|thirty-second/).test(bar[index+1][0]))) {
                                            bar[index][0] = bar[index][0] + "--2--gr";
                                        }
                                        else if ((new RegExp((x[0].match(/\D/g)).join(""))).test(bar[index+1][0]) || ((/sixteenth|thirty-second/).test(x[0]) && (/sixteenth|thirty-second/).test(bar[index+1][0]))) {
                                            bar[index][0] = bar[index][0] + "--1--gr";
                                        }
                                        else {
                                            bar[index][0] = bar[index][0] + "--0--gr";
                                        } 
                                    gr ++;
                                }   
                                
                                
                            }

                            // ENDING SECTION
                            if (!(/--st|--gr/).test(x[0]) && index>0 && (/--st|--gr/).test(bar[index-1][0]) && gr &&
(index === bar.length-1 || beamGr === beamNum || beamFill === measure/2 || !names4Beaming[0].test(bar[index+1][0]) || names4Beaming[1].test(bar[index+1][0]) || (/triplet|quinteplet/).test(bar[index+1][0])) ) {
                                if ((/eighth/).test(x[0])) {                            
                                    bar[index][0] = bar[index][0] + "--end";
                                }
                                else if ((new RegExp((x[0].match(/\D/g)).join(""))).test(bar[index-1][0])) {
                                    bar[index][0] = bar[index][0] + "--1--end";
                                }
                                else {
                                    bar[index][0] = bar[index][0] + "--0--end";
                                }
                                beamGr = 0;
                                beamGrNames = [];
                                gr = 0;
                                
                            }
                        if (!(/--st|--gr|--end/).test(x[0])) {
                            beamGr = 0;
                            beamGrNames = [];
                        }

        }
        
    })
return bar;
}