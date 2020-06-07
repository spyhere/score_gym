import React from 'react';
import {updateData, generatingValues} from './notes';

// let test = ["blue", "red", "green",["black", "orange", "yellow"], "white", ["blue", "red", "purple", "green"], "yellow"];

// {test.map((x,ind) => {
//   if (Array.isArray(test[ind+1])) {
//     return <div className="square" id={x+ind} style={{backgroundColor: x, display: "flex"}}>
//       {test[ind+1].map((y) => {
//         return <div className="square" id={x+ind+y} style={{backgroundColor: y, width: "10px", height: "10px"}}></div>
//       })}
//     </div>
//   }
//   else if (Array.isArray(x)) {
//     return;
//   }
//   else {
//     return <div className="square" id={x+ind} style={{backgroundColor: x}}></div>
//   }
// })}

let measureString = {
  4: "four_quarters"
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {bars: [], barsQuant: 16, measure: 4, pauseValue: 10, easyOBProb: 20, tripletValue: 90, groupRest: true, showBeat: false,
    easyGrouping: 95, linkIns: false, linkOut: 50, lvl: 2, simpleK: 50, dotsK: -0.1, groupK: 60, beat: true, beatNumb: true, beamNum: 1,
    noteValues: {whole: 5, half: 11, quarter: 15, eighth: 35, sixteenth: 36, thirtySecond: 0},
    dottedValues: {whole: -0.1, half: 5, quarter: 10, eighth: 30, sixteenth: 0, thirtySecond: 0},
    groupingValues: {whole: -0.1, half: 3, quarter: 10, eighth: 12}, 
    simValIns: {whole: -0.1, half: 5, quarter: 15, eighth: 20, sixteenth: 25, thirtySecond: 0}};


  this.try = this.try.bind(this);
  this.beat = this.beat.bind(this);
  this.beatNumb = this.beatNumb.bind(this);
  }
  try() {
    console.clear();
    this.setState({bars: generatingValues()});
  }
  beat() {
    this.setState({
      beat: !this.state.beat
    });
  }
  beatNumb() {
    this.setState({
      beatNumb: !this.state.beatNumb
    })
  }
  componentDidMount() {
    updateData(this.state);
  } 
  render() {
    let bars = this.state.bars;
    return (
      <div>
        <header>
          <h1>Welcome to <strong>Score Gym</strong></h1>
            <nav>
              <div>Beginner, Intermediate, Expert</div>
              <div>Listen or Practise</div>
              <button onClick={this.try}>TRY</button>
              <button onClick={this.beat}>Beat</button>
              <button onClick={this.beatNumb}>Num</button>
            </nav>
              <div className="settings">SETTINGS: #measures, #number_of_bars, #bpm, #licked_notes</div>
              <div className="info">#Info, #tutorial</div>
        </header>
        <div className="score_body">
          <div className="score">
          {bars.map((x, index) => {
            let beat = 0;
            let count = 0;
            return <div className={(bars.length-1 === index) ? "bar bar_last" : ((index === 0) ? "bar bar_first" : "bar")}>
              <div className="bar__inside"> 
              {x.map((y, ind) => {

                if (ind+1 <= x.length-1 && Array.isArray(x[ind+1][0])) {
                  beat += y[1];
                  return <div style={{position: "relative", height: "118px"}}>
                    <span className="tuplet--num">{(/triplet/).test(y[0]) ? 3 : 5}</span>
                    {(( (ind === 0 && Array.isArray(y)) || (ind === 1 && beat === y[1]) || Number.isInteger(beat-y[1]) || (ind === x.length-1 && y[1] === this.state.beamNum) ) && count < this.state.measure ? (<div key={beat+y[0]} className="beat" style={this.state.beat ? ((/rest|whole/).test(y[0]) ? ({opacity: "100%", top:"100%", left:"5px"}) : ((/--end/).test(y[0]) ? ({opacity: "100%", left: "10px"}) : ({opacity: "100%"}))) : {opacity: "0%"}}><div style={this.state.beatNumb ? {opacity:"1"} : {opacity:"0"}}>{beat-y[1] + 1}</div><span style={{display: "none"}}>{count ++ }</span></div>) : null)}
                    <div className={(/triplet/).test(y[0]) ? "triplet" : "quinteplet"}>
                    {x[ind+1].map((z, indI) => {
                      if (!indI) {
                        return <div className={"value " + z[0]} style={{marginLeft: "0"}}></div>
                      }
                      else if (indI === x[ind+1].length-1) {
                        return <div className={"value " + z[0]} style={{marginRight: "0"}}></div>
                      }
                      else {
                        return <div className={"value " + z[0]}></div>
                      }
                      
                    })}
                    </div>
                    </div>
                }

                else if (Array.isArray(y[0])) {
                  return;
                }

                else {
                let link = null;
               if (Array.isArray(y) && (y[0][0] === '0' || y[0][0] === '1')) { // DETERMINING WHERE IS THE LINK
                 let elem = y[0].split("");
                 link = Number(elem.splice(0, 1));
                 y[0] = elem.join("");
               }
               let ch;
               if (Array.isArray(y)) {                    // CORRECTING THE POSITION OF THE LINK
                 let elem = y[0].split("");
                 elem.reverse();
                 ch = elem.slice(0, 3)
                          .join("");
                beat += y[1];
               }
                return <div className={Array.isArray(y) ? ("value " + y[0]) : ("value  " + measureString[y])} id={index+ind}>
                  <Linked link={link} ch={ch} ind={ind} bars={this.state.bars} />
                  {(( (ind === 0 && Array.isArray(y)) ||( ind === 1 && beat === y[1]) || Number.isInteger(beat-y[1]) || (ind === x.length-1 && y[1] === this.state.beamNum) ) && count < this.state.measure ? (<div key={beat+y[0]} className="beat" style={this.state.beat ? ((/rest|whole/).test(y[0]) ? ({opacity: "100%", top:"100%", left:"5px"}) : ((/--end/).test(y[0]) ? ({opacity: "100%", left: "10px"}) : ({opacity: "100%"}))) : {opacity: "0%"}}><div style={this.state.beatNumb ? {opacity:"1"} : {opacity:"0"}}>{beat-y[1] + 1}</div><span style={{display: "none"}}>{count ++ }</span></div>) : null)}
                  </div>
                }

            })}
            </div>
            </div>
          })
          }

          </div>

        </div>
        
      </div>
    )
  }
}

class Linked extends React.Component {
shouldComponentUpdate(nextState) {
if (this.props.bars !== nextState.bars) {
  return true;
}
else {
  return false;
}
}
render () {
  return <div>{(this.props.link !== null) ? (<div style={(this.props.ch === "dne") ? {left: "34px", width: "15px",top: "-21px",height: "40px"} : null} key={this.props.ch+this.props.ind} className={(this.props.link===0) ? "linked_in" : "linked_out"}></div>) : null}</div>
}
}

export default App;

