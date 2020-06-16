import React from 'react';
import {mapStateToProps, mapDispatchToProps} from "./redux/redux";
import {connect} from "react-redux";
import tick01 from "../src/Sounds/metro_1.mp3";
import tick02 from "../src/Sounds/metro_other.mp3";
import note01 from "../src/Sounds/clap01.mp3";
import {updateData, generatingValues, measureReassign} from './notes';
import Settings from "./Settings";

let soundArr = [];

let valInTup = [{
  half: 1.3333333333333333,
  quarter: 0.6666666666666666,
  eighth: 0.3333333333333333,
  sixteenth: 0.16666666666666666,
  thirty: 0.08333333333333333
}, {
  quarter: 0.8,
  eighth: 0.4,
  sixteenth: 0.2,
  thirty: 0.1
}];



let reading, arr, beatReadN, rand, beatFill, metronome, inputOpen, wholeBar, mistakes;
let inputPerc = 30; // PERCANTAGE OF WINDOW TO HIT (% FROM ONE SIDE)
let soundInd = 0;


class Presentational extends React.Component {
  constructor(props) {
    super(props);

    this.state = {bars: [], barsQuant: 8, measure: "four_quarters", pauseValue: 10, easyOBProb: 20, tripletValue: 90, groupRest: true, bpm: 70,
    easyGrouping: 95, linkIns: true, linkOut: 50, lvl: 2, simpleK: 50, dotsK: -0.1, groupK: 60, beat: true, beatNumb: true, beamNum: 1, receivedVal: [],  
    noteValues: {whole: 5, half: 11, quarter: 15, eighth: 35, sixteenth: 36, thirtySecond: 0},
    dottedValues: {whole: -0.1, half: 5, quarter: 10, eighth: 30, sixteenth: 0, thirtySecond: 0},
    groupingValues: {whole: -0.1, half: 3, quarter: 10, eighth: 12}, 
    simValIns: {whole: -0.1, half: 5, quarter: 15, eighth: 20, sixteenth: 25, thirtySecond: 0},
    metronomeSwitch: false, mistakes: null, mode: null, settings: false};

  this.tick01 = React.createRef();
  this.tick02 = React.createRef();
  this.note01 = React.createRef();


  this.beginner = this.beginner.bind(this);
  this.intermediate = this.intermediate.bind(this);
  this.expert = this.expert.bind(this);
  this.nextGen = this.nextGen.bind(this);
  this.beat = this.beat.bind(this);
  this.beatNumb = this.beatNumb.bind(this);
  this.beatReading = this.beatReading.bind(this);
  this.beatReadingFunc = this.beatReadingFunc.bind(this);
  this.stop = this.stop.bind(this);
  this.beatInput = this.beatInput.bind(this);
  this.beatInputFunc = this.beatInputFunc.bind(this);
  this.beatInputListener = this.beatInputListener.bind(this);
  this.settings = this.settings.bind(this);
  }

  beginner() {
    this.setState({
      barsQuant: 4,
      measure: "four_quarters",
      pauseValue: 5,
      easyOBProb: 50,
      bpm: 50,
      linkIns: true,
      linkOut: 0,
      lvl: 0,
      beamNum: 1,
      groupRest: false,
      noteValues: {
        whole: 10,
        half: 15,
        quarter: 44,
        eighth: 56,
        sixteenth: 0,
        thirtySecond: 0
      },
      mode: 1
    });
    setTimeout(() => updateData(this.state), 50);
  }

  intermediate() {
    this.setState({
      barsQuant: 8,
      measure: "four_quarters",
      pauseValue: 10,
      easyOBProb: 35,
      bpm: 70,
      linkIns: true,
      linkOut: 50,
      lvl: 1,
      beamNum: 1,
      groupRest: true,
      noteValues: {
        whole: 5,
        half: 11,
        quarter: 44,
        eighth: 56,
        sixteenth: 64,
        thirtySecond: 0
      },
      dottedValues: {
        whole: -0.1,
        half: 5,
        quarter: 10,
        eighth: 30,
        sixteenth: 0,
        thirtySecond: 0
      },
      simpleK: 75,
      dotsK: 95,
      mode: 2
    });
    setTimeout(() => updateData(this.state), 50);
  }

  expert() {
    this.setState({
      barsQuant: 16,
      measure: "four_quarters",
      pauseValue: 10,
      easyOBProb: 17,
      bpm: 90,
      linkIns: false,
      linkOut: 70,
      lvl: 2,
      beamNum: 1,
      groupRest: true,
      noteValues: {
        whole: 5,
        half: 11,
        quarter: 20,
        eighth: 56,
        sixteenth: 64,
        thirtySecond: 0
      },
      dottedValues: {
        whole: -0.1,
        half: 5,
        quarter: 10,
        eighth: 30,
        sixteenth: 0,
        thirtySecond: 0
      },
      groupingValues: {
        whole: -0.1,
        half: 3,
        quarter: 10,
        eighth: 12
      },
      easyGrouping: 95,
      tripletValue: 90,
      simpleK: 75,
      dotsK: 80,
      groupK: 100,
      mode: 3
    });
    setTimeout(() => updateData(this.state), 50);
  }

  settings() {
    this.setState({settings: !this.state.settings});
    document.querySelector(".main_page").classList.toggle("main_page--anim");
  }

  nextGen() {
    console.clear();
    wholeBar = 0;
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
              arr.push([y[n][0],valInTup[tupletState][y[n][0].match(/[a-z]+/).join("")]])
            }
          }
          else {
            arr.push([y[0],y[1]])
          }
          
        }
      })
    })

    this.setState({receivedVal: arr})

    }, 50);
    switch (this.state.mode) {
      case 1: this.setState({beat: true, beatNumb: true});
      break;
      case 2: this.setState({beat: true, beatNumb: false});
      break;
      case 3: this.setState({beat: false, beatNumb: false});
      break;
      default: return;
    }
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

  beatReading(input) {
    this.setState({metronomeSwitch: true});
    this.setState({mistakes: null});
    mistakes = 0;
    metronome = [];
    inputOpen = false;
    beatReadN = 0;
    beatFill  = 0;
    rand = 0;
    let metronomeFill = 0;

    arr = Array.from(document.querySelectorAll(".value"));
    arr.shift();

    this.tick01.current.volume = 0.3;
    this.tick02.current.volume = 0.2;
    
    wholeBar = measureReassign[this.state.measure] / (this.state.bpm / 60) * 1000;

    this.tick01.current.play();

    metronomeFill += wholeBar / measureReassign[this.state.measure];
    
    if (input === "input") {
      metronome.push(setInterval(() => {
        this.tick01.current.play();
      }, wholeBar))
      while (metronomeFill < wholeBar) {
        metronome.push(setTimeout(() => {
          this.tick02.current.play();
          metronome.push(setInterval(() => this.tick02.current.play(), wholeBar)) 
        }, metronomeFill));
        metronomeFill += wholeBar / measureReassign[this.state.measure];
      }
      metronome.push(setTimeout(this.stop, (this.state.barsQuant + 1) * wholeBar - 50) );
    }
    else {
      while (metronomeFill < wholeBar) {
            metronome.push(setTimeout(() => {
              this.tick02.current.play();
            }, metronomeFill)); 
            metronomeFill += wholeBar / measureReassign[this.state.measure];
          }
    }
    
    if (input === "input") {
      metronome.push(setTimeout(this.beatInputFunc, wholeBar - 100));
    }
    else {
      metronome.push(setTimeout(this.beatReadingFunc, wholeBar));
      mistakes --;
    }
    
  }

  beatReadingFunc() {
  if (beatFill > measureReassign[this.state.measure] - 0.1) {
    beatFill = 0;
  }
    if (beatFill === measureReassign[this.state.measure]) {
      beatFill = 0;
    }

    if (!beatReadN) {
          arr[0].classList.toggle("value--animation");
          if (!(/--rest/).test(arr[beatReadN].className)) {
            soundArr[0].play();
            rand ++ 
          }
          reading = setTimeout(this.beatReadingFunc, 1000 * this.state.receivedVal[beatReadN][1] / (this.state.bpm / 60));
          
        }
    console.log(beatFill)
    if (!beatFill || !beatReadN) {
      let metronomeFill = 0;
      let wholeBar = measureReassign[this.state.measure] / (this.state.bpm / 60) * 1000;

      this.tick01.current.play();

      metronomeFill += wholeBar / measureReassign[this.state.measure];
      while (metronomeFill < wholeBar) {
        metronome.push(setTimeout(() => {
          this.tick02.current.play();
        }, metronomeFill)); 
        metronomeFill += wholeBar / measureReassign[this.state.measure];
    }
    if (!beatReadN) {
      beatFill += this.state.receivedVal[beatReadN][1];
      beatReadN ++;
      return;
    }

    }


    if (beatReadN < arr.length-1) {
      reading = setTimeout(this.beatReadingFunc, 1000 * this.state.receivedVal[beatReadN][1] / (this.state.bpm / 60));
    }
    else {
      setTimeout(this.stop, 1000 * this.state.receivedVal[beatReadN][1] / (this.state.bpm / 60));
    }
    
    arr[beatReadN].classList.toggle("value--animation");

    if (!(/--rest/).test(arr[beatReadN].className) && (!beatReadN || !(/^[\d]/).test(this.state.receivedVal[beatReadN-1][0]))) {
      soundArr[rand].play();
    }
    

    beatFill += this.state.receivedVal[beatReadN][1];
    beatReadN ++;
    rand ++ 
    if (rand === soundArr.length-1) {
      rand = 0;
    }
  }

  beatInput() {
    soundInd = 0;
    this.setState({metronomeSwitch: true});
    document.addEventListener("keydown", this.beatInputListener);
    this.beatReading("input");
  }

  beatInputListener() {
    if (inputOpen && !(/--rest/).test(arr[beatReadN].className) && (beatReadN === 0 || !(/^[\d]/).test(this.state.receivedVal[beatReadN-1][0]))) {
      arr[beatReadN].classList.toggle("value--animation");
      // soundArr[soundInd].play()
      // soundInd ++
      inputOpen = false;
      // if (soundInd === soundArr.length-1) {
      //   soundInd = 0;
      // }
    }
    else if (!inputOpen || inputOpen && ((/--rest/).test(arr[beatReadN].className) || (beatReadN === 0 || (/^[\d]/).test(this.state.receivedVal[beatReadN-1][0])) )) {
      mistakes ++;
      inputOpen = false;
    }
  }
  
  beatInputFunc() {
    inputOpen = true;
    metronome.push(setTimeout(() => {
     if (inputOpen && (!(/--rest/).test(arr[beatReadN].className) && (beatReadN === 0 || !(/^[\d]/).test(this.state.receivedVal[beatReadN-1][0]))) ) {
      mistakes ++;
     }
    beatReadN ++;
    inputOpen = false;
    }, (1000 * this.state.receivedVal[beatReadN][1] / (this.state.bpm / 60)) * (inputPerc*3) / 100));
    if (beatReadN < arr.length-1) {
      reading = setTimeout(this.beatInputFunc, 1000 * this.state.receivedVal[beatReadN][1] / (this.state.bpm / 60));
    }
    
    
  }
  
  stop() {
    this.setState({mistakes: mistakes});
    document.removeEventListener("keydown", this.beatInputListener);
    this.setState({metronomeSwitch: false})
    for (let n in metronome) {
      clearTimeout(metronome[n]);
      clearInterval(metronome[n]);
    }

    for (let n in arr) {
      if (arr[n].classList.contains("value--animation")) {
        arr[n].classList.toggle("value--animation")
      }
    }

    clearTimeout(reading);
  }

  componentDidMount() {
    updateData(this.state);

    for (let i = 0; i < 20; i ++) {
      let sound = this.note01.current;
      sound.volume = 0.2;
      soundArr.push(sound);
      let soundClone = sound.cloneNode(true);
      soundClone.volume = 0.2;
      soundArr.push(soundClone);
    }
    
  } 
  render() {
    let bars = this.state.bars;
    return (
      <div>
        {this.state.settings ? <Settings settings={this.state.settings} /> : null}
        <div className="main_page">
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
                  <div className="button__holder">
                    <button disabled={this.state.mode === 1} className="button__lvl" onClick={this.beginner}>Beginner</button>
                    <button disabled={this.state.mode === 2} className="button__lvl" onClick={this.intermediate}>Intermediate</button>
                    <button disabled={this.state.mode === 3} className="button__lvl" onClick={this.expert}>Expert</button> 
                    </div>
                  <div></div>
                  <button onClick={this.nextGen} disabled={this.state.metronomeSwitch}>NextGen</button>
                  <button onClick={this.beat}>Beat</button>
                  <button disabled={!this.state.beat} onClick={this.beatNumb}>Num</button>
                  <button onClick={this.beatReading} disabled={this.state.bars.length < 1 || this.state.metronomeSwitch}>Reading</button>
                  <button onClick={this.stop} disabled={!this.state.metronomeSwitch}>Stop</button>
                  <button onClick={this.beatInput} disabled={this.state.bars.length < 1 || this.state.metronomeSwitch}>Practice</button>
                  <div style={{opacity: (this.state.mistakes !== null && mistakes >= 0) ? "1" : "0"}}>Mistakes: {this.state.mistakes}</div>
                </nav>
                
    
                  <div className="info">#Info, #tutorial</div>
            </header>

                <div style={{display: (this.state.settings) ? "none" : null}} className="settings--hook" onMouseOver={this.settings}>Settings</div>
                

            <div className="score_body">
              <div className="score">
              {bars.map((x, index) => {
                let beat = 0;
                let count = 0;
                return <div className={(bars.length-1 === index) ? "bar bar_last" : ((index === 0) ? "bar bar_first" : "bar")} key={String(index)}>
                  <div className="bar__inside"> 
                  {x.map((y, ind) => {

                    if (ind+1 <= x.length-1 && Array.isArray(x[ind+1][0])) {
                      beat += y[1];
                      return <div style={{position: "relative", height: "118px"}} key={String(index) + "_" + ind}>
                        <span className="tuplet__num">{(/triplet/).test(y[0]) ? 3 : 5}</span>
                        {(( (ind === 0 && Array.isArray(y)) || (ind === 1 && beat === y[1]) || Number.isInteger(beat-y[1]) || (ind === x.length-1 && y[1] === this.state.beamNum) ) && count < measureReassign[this.state.measure] ? (<div key={beat+y[0]} className="beat" style={this.state.beat ? ((/rest|whole/).test(y[0]) ? ({opacity: "100%", top:"100%", left:"5px"}) : ((/--end/).test(y[0]) ? ({opacity: "100%", left: "10px"}) : ({opacity: "100%"}))) : {opacity: "0%"}}><div style={this.state.beatNumb ? {opacity:"1"} : {opacity:"0"}}>{beat-y[1] + 1}</div><span style={{display: "none"}}>{count ++ }</span></div>) : null)}
                        <div className={(/triplet/).test(y[0]) ? "triplet" : "quinteplet"}>
                        {x[ind+1].map((z, indI) => {
                          if (!indI) {
                            return <div className={"value " + z[0]} style={{marginLeft: "0"}} key={z[0]+String(index) + indI}></div>
                          }
                          else if (indI === x[ind+1].length-1) {
                            return <div className={"value " + z[0]} style={{marginRight: "0"}} key={z[0]+String(index) + indI}></div>
                          }
                          else {
                            return <div className={"value " + z[0]} key={z[0]+String(index) + indI}></div>
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
                    link = Number(elem.slice(0, 1));
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
                    return <div className={Array.isArray(y) ? ("value " + y[0].match(/\D+[\d]*.+/).join("")) : ("value  " + this.state.measure)} key={index+ind + y[0]}>
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

let App = connect(mapStateToProps, mapDispatchToProps)(Presentational);

export default App;


