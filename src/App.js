import React from 'react';
import tick01 from "../src/Sounds/metro_1.mp3";
import tick02 from "../src/Sounds/metro_other.mp3";
import note01 from "../src/Sounds/clap01.mp3";
import {updateData, generatingValues, measureReassign} from './notes';

let testArr = [];

let valInTup = [{
  half: 1.333333333333333,
  quarter: 0.6666666666666667,
  eighth: 0.3333333333333333,
  sixteenth: 0.1666666666666667,
  thirty: 0.0833333333333333
}, {
  quarter: 0.8,
  eighth: 0.4,
  sixteenth: 0.2,
  thirty: 0.1
}];



let reading;



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {bars: [], barsQuant: 16, measure: "four_quarters", pauseValue: 10, easyOBProb: 20, tripletValue: 90, groupRest: true, showBeat: false, bpm: 60,
    easyGrouping: 95, linkIns: true, linkOut: 50, lvl: 2, simpleK: 50, dotsK: -0.1, groupK: 60, beat: true, beatNumb: true, beamNum: 1, receivedVal: [], receivedValTimeouts: [],  
    noteValues: {whole: 5, half: 11, quarter: 15, eighth: 35, sixteenth: 36, thirtySecond: 0},
    dottedValues: {whole: -0.1, half: 5, quarter: 10, eighth: 30, sixteenth: 0, thirtySecond: 0},
    groupingValues: {whole: -0.1, half: 3, quarter: 10, eighth: 12}, 
    simValIns: {whole: -0.1, half: 5, quarter: 15, eighth: 20, sixteenth: 25, thirtySecond: 0},
    metronome: []};

  this.tick01 = React.createRef();
  this.tick02 = React.createRef();
  this.note01 = React.createRef();


  this.nextGen = this.nextGen.bind(this);
  this.beat = this.beat.bind(this);
  this.beatNumb = this.beatNumb.bind(this);
  this.beatReading = this.beatReading.bind(this);
  this.beatReadingFunc = this.beatReadingFunc.bind(this);
  this.stop = this.stop.bind(this);
  }

  nextGen() {
    console.clear();
    let arr = [];
    let tupletState;
    this.setState({bars: generatingValues()});
    setTimeout(() => {                              // RECORDING THE DURATION VALUES IS ARRAY
      this.state.bars.forEach((x) => {
      x.forEach((y) => {
        if ((/triplet/).test(y[0])) {
          tupletState = 0;
        }
        else if ((/quinteplet/).test(y[0])) {
          tupletState = 1;
        }

        if (!(/triplet|quinteplet/).test(y[0]) && Array.isArray(y)) {
          if (Array.isArray(y[0])) {
            for (let n in y){
              arr.push(valInTup[tupletState][y[n][0].match(/[a-z]+/).join("")])
            }
          }
          else {
            arr.push(y[1])
          }
          
        }
      })
    })

    this.setState({receivedVal: arr})

    }, 50);
    
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

  beatReading() {
    this.tick01.current.volume = 0.3;
    this.tick02.current.volume = 0.2;
    let metronomeTemp = [];
    let metronomeFill = 0;
    let wholeBar = measureReassign[this.state.measure] / (this.state.bpm / 60) * 1000;

    this.tick01.current.play();
    metronomeTemp.push(setInterval(()=> this.tick01.current.play(), wholeBar));

    metronomeFill += wholeBar / measureReassign[this.state.measure];
    while (metronomeFill < wholeBar) {
      setTimeout(() => {
        metronomeTemp.push(setInterval(()=> this.tick02.current.play(), wholeBar));
        this.tick02.current.play();
      }, metronomeFill); 
      metronomeFill += wholeBar / measureReassign[this.state.measure];
    }

    this.setState({metronome: metronomeTemp});


    setTimeout(this.beatReadingFunc, measureReassign[this.state.measure] / (this.state.bpm / 60) * 1000 - 50);
  }

  beatReadingFunc() {
    let arr = Array.from(document.querySelectorAll(".value"));
    let temp = [];
    arr.shift();
    let fill = 0;

    arr[0].classList.toggle("value--animation");
    testArr[0].load();
    testArr[0].play();
    for (let n in arr) {
      fill += 1000 * this.state.receivedVal[n] / (this.state.bpm / 60);
      if (Number(n)+1 <= arr.length-1) {
        temp.push(setTimeout(() => {
          arr[Number(n)+1].classList.toggle("value--animation");

          if (!(/--rest/).test(arr[Number(n)+1].className)) {
            let rand = Math.floor(Math.random()*40);
            testArr[rand].load();
            testArr[rand].play();
          }
          
        }, fill));
      }
    }
    this.setState({receivedValTimeouts: temp})
    reading = setTimeout(this.stop, fill - 100)
  }
  
  stop() {
    let arr = Array.from(document.querySelectorAll(".value"));
    arr.shift();
    let tempRead = this.state.receivedValTimeouts;
    let tempMetronome = this.state.metronome;
    for (let n in tempRead) {
      clearTimeout(tempRead[n]);
      if (arr[n].classList.contains("value--animation")) {
        arr[n].classList.toggle("value--animation")
      }
    }

    for (let n in tempMetronome) {
      clearTimeout(tempMetronome[n])
    }

    clearTimeout(reading);
  }

  componentDidMount() {
    updateData(this.state);

    for (let i = 0; i < 20; i ++) {
      let sound = this.note01.current;
      sound.volume = 0.2;
      testArr.push(sound);
      let soundClone = sound.cloneNode(true);
      soundClone.volume = 0.2;
      testArr.push(soundClone);
    }
    
  } 
  render() {
    let bars = this.state.bars;
    return (
      <div>
        <div>
        <audio ref={this.tick01}>
      <source src={tick01} type="audio/mpeg"></source>
        </audio>
        <audio ref={this.tick02}>
          <source src={tick02} type="audio/mpeg"/>
        </audio>
        <audio ref={this.note01}>
          <source src={note01} type="audio/mpeg"/>
        </audio>
        </div>
        <header>
          <h1>Welcome to <strong>Score Gym</strong></h1>
            <nav>
              <div>Beginner, Intermediate, Expert</div>
              <div></div>
              <button onClick={this.nextGen}>NextGen</button>
              <button onClick={this.beat}>Beat</button>
              <button onClick={this.beatNumb}>Num</button>
              <button onClick={this.beatReading}>Reading</button>
              <button onClick={this.stop}>Stop</button>
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
                    <span className="tuplet__num">{(/triplet/).test(y[0]) ? 3 : 5}</span>
                    {(( (ind === 0 && Array.isArray(y)) || (ind === 1 && beat === y[1]) || Number.isInteger(beat-y[1]) || (ind === x.length-1 && y[1] === this.state.beamNum) ) && count < this.state.measure ? (<div key={beat+y[0]} className="beat" style={this.state.beat ? ((/rest|whole/).test(y[0]) ? ({opacity: "100%", top:"100%", left:"5px"}) : ((/--end/).test(y[0]) ? ({opacity: "100%", left: "10px"}) : ({opacity: "100%"}))) : {opacity: "0%"}}><div style={this.state.beatNumb ? {opacity:"1"} : {opacity:"0"}}>{beat-y[1] + 1}</div><span style={{display: "none"}}>{count ++ }</span></div>) : null)}
                    <div className={(/triplet/).test(y[0]) ? "triplet" : "quinteplet"}>
                    {x[ind+1].map((z, indI) => {
                      if (!indI) {
                        return <div className={"value " + z[0]} style={{marginLeft: "0"}} key={z[0]+String(index)}></div>
                      }
                      else if (indI === x[ind+1].length-1) {
                        return <div className={"value " + z[0]} style={{marginRight: "0"}} key={z[0]+String(index)}></div>
                      }
                      else {
                        return <div className={"value " + z[0]} key={z[0]+String(index)}></div>
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
                return <div className={Array.isArray(y) ? ("value " + y[0]) : ("value  " + this.state.measure)} id={index+ind}>
                  <Linked link={link} ch={ch} ind={ind} bars={this.state.bars} />
                  {(( (ind === 0 && Array.isArray(y)) ||( ind === 1 && beat === y[1]) || Number.isInteger(beat-y[1]) || (ind === x.length-1 && y[1] === this.state.beamNum) ) && count < measureReassign[this.state.measure] ? (<div key={beat+y[0]} className="beat" style={this.state.beat ? ((/rest|whole/).test(y[0]) ? ({opacity: "100%", top:"100%", left:"5px"}) : ((/--end/).test(y[0]) ? ({opacity: "100%", left: "10px"}) : ({opacity: "100%"}))) : {opacity: "0%"}}><div style={this.state.beatNumb ? {opacity:"1"} : {opacity:"0"}}>{beat-y[1] + 1}</div><span style={{display: "none"}}>{count ++ }</span></div>) : null)}
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
  let st = null;
  if (this.props.ch === "dne" && this.props.link === 0) {
    st = {left: "38px", width: "15px",top: "-21px",height: "40px"}
  }

  return <div>{(this.props.link !== null) ? (<div style={st} key={this.props.ch+this.props.ind} className={(this.props.link===0) ? "linked_in" : "linked_out"}></div>) : null}</div>
}
}

export default App;


