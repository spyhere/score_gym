import React from 'react';
import {mapStateToProps, mapDispatchToProps} from "./redux/redux";
import {connect} from "react-redux";
import tick01 from "../src/Sounds/metro_1.mp3";
import tick02 from "../src/Sounds/metro_other.mp3";
import note01 from "../src/Sounds/clap01.mp3";
import {updateData, generatingValues, measureReassign, values} from './notes';
import Settings from "./Settings/Settings";
import Info from "./Info";
import Header from "./Header";
import {UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import { $CombinedState } from 'redux';


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



let reading, arr, beatReadN, rand, beatFill, metronome, inputOpen, wholeBar, mistakes, inputLag;
let inputPerc = 30; // PERCANTAGE OF WINDOW TO HIT (% FROM ONE SIDE). INPUT VALUE IN "PRACTICE" MODE
let soundInd = 0;


class Presentational extends React.Component {
  constructor(props) {
    super(props);

    this.state = {bars: [], barsQuant: 8, measure: "four_quarters", pauseValue: 10, easyOBProb: 20, tripletValue: 90, groupRest: true, bpm: 70, fixingBeatProb: 70,
    easyGrouping: 95, linkIns: true, linkOut: 50, lvl: 2, simpleK: 50, dotsK: -0.1, groupK: 60, maxK: 60, beat: true, beatNumb: true, beamNum: 1, receivedVal: [], showBeat: false,  
    noteValues: {whole: 5, half: 11, quarter: 15, eighth: 35, sixteenth: 36, thirtySecond: 0},
    dottedValues: {whole: -0.1, half: 5, quarter: 10, eighth: 30, sixteenth: 0, thirtySecond: 0},
    groupingValues: {whole: -0.1, half: 3, quarter: 10, eighth: 12}, 
    simValIns: {whole: -0.1, half: 5, quarter: 15, eighth: 20, sixteenth: 25, thirtySecond: 0},
    quintepletMap: {whole: -0.1, half: 5, quarter: 15, eighth: 0},
    maxSimple: 5, maxDotted: 4, maxTuplet: 4, maxValsInTuplet: 5, maxQuintepletProb: 3,
    metronomeSwitch: false, mistakes: null, beatReadN: null, mode: null, tips: true};

  this.tick01 = React.createRef();
  this.tick02 = React.createRef();
  this.note01 = React.createRef();
  this.new = React.createRef();
  this.beatShow = React.createRef();
  this.num = React.createRef();
  this.clearScores = React.createRef();


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
  this.info = this.info.bind(this);
  this.scrollHUD = this.scrollHUD.bind(this);
  this.clearBars = this.clearBars.bind(this);
  }

  beginner() {
    this.setState({ barsQuant: 4, measure: "four_quarters", pauseValue: 5, easyOBProb: 50, bpm: 50, linkIns: true, linkOut: 0, lvl: 0, 
    beamNum: 1, groupRest: false, settings: false,
    noteValues: { whole: 10, half: 15, quarter: 44, eighth: 56, sixteenth: 0, thirtySecond: 0},
    mode: 1, dotsK: -0.1, groupK: -0.1, maxK: 100});
    
    setTimeout(() => this.props.updateState(this.state), 50);
    setTimeout(() => updateData(this.state), 50);
  }

  intermediate() {
    this.setState({ barsQuant: 8, measure: "four_quarters", pauseValue: 10, easyOBProb: 35, bpm: 70, linkIns: true, linkOut: 50, lvl: 1,
    beamNum: 1, groupRest: true, settings: false,
    noteValues: { whole: 5, half: 11, quarter: 44, eighth: 56, sixteenth: 64, thirtySecond: 0},
    dottedValues: { whole: -0.1, half: 5, quarter: 10, eighth: 30, sixteenth: 0, thirtySecond: 0},
    simpleK: 75, dotsK: 95, groupK: -0.1, mode: 2, maxK: 95});

    setTimeout(() => this.props.updateState(this.state), 50);
    setTimeout(() => updateData(this.state), 50);
  }

  expert() {
    this.setState({ barsQuant: 16, measure: "four_quarters", pauseValue: 10, easyOBProb: 17, bpm: 90, linkIns: false, linkOut: 70, lvl: 2,
    beamNum: 1, groupRest: true, settings: false,
    noteValues: { whole: 5, half: 11, quarter: 20, eighth: 56, sixteenth: 64, thirtySecond: 0},
    dottedValues: { whole: -0.1, half: 5, quarter: 10, eighth: 30, sixteenth: 0, thirtySecond: 0},
    groupingValues: { whole: -0.1, half: 3, quarter: 10, eighth: 12},
    quintepletMap: { whole: -0.1, half: 5, quarter: 15, eighth: 0},
    easyGrouping: 95, tripletValue: 90, simpleK: 75, dotsK: 80, groupK: 100, mode: 3, maxK: 100});

    setTimeout(() => this.props.updateState(this.state), 50);
    setTimeout(() => updateData(this.state), 50);
  }

  settings() {
    document.querySelector(".settings--hook").style.pointerEvents = "none";
    this.props.updateState({settings: !this.props.state.settings});
    if (this.state.metronomeSwitch) {
      setTimeout(this.stop, 300);
    }
  }

  info() {
    document.querySelector(".info--hook").style.pointerEvents = "none";
    this.props.updateState({info: !this.props.state.info});
    if (this.state.metronomeSwitch) {
      setTimeout(this.stop, 300);
    }
  }

  nextGen() {
    this.new.current.blur()
    this.setState({mistakes: null});

    console.clear();
    wholeBar = 0;
    let arr = [];
    let tupletState;
    let values = generatingValues();
    this.setState({bars: values.bars, maxSimple: values.maxSimple, maxDotted: values.maxDotted, maxTuplet: values.maxTuplet, maxValsInTuplet: values.maxValsInTuplet, maxQuintepletProb: values.maxQuintepletProb});
    setTimeout(() => {                              // RECORDING THE DURATION VALUES IN ARRAY
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
    this.props.updateState(this.state);

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

    // if (this.props.state.groupK && this.props.state.maxQuintepletProb) {
    //   inputLag = 
    // }
  } 

  beat() {
    this.beatShow.current.blur();
    this.setState({beat: !this.state.beat})
  }

  beatNumb() {
    this.num.current.blur();
    this.setState({beatNumb: !this.state.beatNumb})
  }

  beatReading(input) {
    this.setState({metronomeSwitch: true, mistakes: null});
    mistakes = 0;
    metronome = [];
    inputOpen = false;
    beatReadN = 0;
    beatFill  = 0;
    rand = 0;
    let metronomeFill = 0;

    
    for (let n in arr) {
      arr[n].classList.remove("value--animation",  "value--animation--mistake")
  }


    this.tick01.current.volume = 0.3;
    this.tick02.current.volume = 0.2;
        
    wholeBar = measureReassign[this.props.state.measure] / (this.props.state.bpm / 60) * 1000;

    this.tick01.current.play();
    metronomeFill += wholeBar / measureReassign[this.props.state.measure];

    if (input.target && input.target.id === "metronome") {
      metronome.push(setInterval(() => {
        this.tick01.current.play();
      }, wholeBar))
      while (metronomeFill < wholeBar) {
        metronome.push(setTimeout(() => {
          this.tick02.current.play();
          metronome.push(setInterval(() => this.tick02.current.play(), wholeBar)) 
        }, metronomeFill));
        metronomeFill += wholeBar / measureReassign[this.props.state.measure];
      }
    } else {

      arr = Array.from(document.querySelectorAll(".value"));
        arr.shift();

        
        if (input === "input") {
          metronome.push(setInterval(() => {
            this.tick01.current.play();
          }, wholeBar))
          while (metronomeFill < wholeBar) {
            metronome.push(setTimeout(() => {
              this.tick02.current.play();
              metronome.push(setInterval(() => this.tick02.current.play(), wholeBar)) 
            }, metronomeFill));
            metronomeFill += wholeBar / measureReassign[this.props.state.measure];
          }
          metronome.push(setTimeout(this.stop, (this.props.state.barsQuant + 1) * wholeBar - 50) );
        }
        else {
          while (metronomeFill < wholeBar) {
                metronome.push(setTimeout(() => {
                  this.tick02.current.play();
                }, metronomeFill)); 
                metronomeFill += wholeBar / measureReassign[this.props.state.measure];
              }
        }
        
        if (input === "input") {
          metronome.push(setTimeout(this.beatInputFunc, wholeBar - this.props.state.gap));
        }
        else {
          metronome.push(setTimeout(this.beatReadingFunc, wholeBar));
          mistakes --;
        }

    }

  }

  beatReadingFunc() {
  if (beatFill > measureReassign[this.props.state.measure] - 0.1) {
    beatFill = 0;
  }
    if (beatFill === measureReassign[this.props.state.measure]) {
      beatFill = 0;
    }

    if (!beatReadN) {
          arr[0].classList.toggle("value--animation");
          if (!(/--rest/).test(arr[beatReadN].className)) {
            soundArr[0].play();
            rand ++ 
          }
          reading = setTimeout(this.beatReadingFunc, 1000 * this.state.receivedVal[beatReadN][1] / (this.props.state.bpm / 60));
          
        }
    console.log(beatFill)
    if (!beatFill || !beatReadN) {
      let metronomeFill = 0;
      let wholeBar = measureReassign[this.props.state.measure] / (this.props.state.bpm / 60) * 1000;

      this.tick01.current.play();

      metronomeFill += wholeBar / measureReassign[this.props.state.measure];
      while (metronomeFill < wholeBar) {
        metronome.push(setTimeout(() => {
          this.tick02.current.play();
        }, metronomeFill)); 
        metronomeFill += wholeBar / measureReassign[this.props.state.measure];
    }
    if (!beatReadN) {
      beatFill += this.state.receivedVal[beatReadN][1];
      beatReadN ++;
      return;
    }

    }


    if (beatReadN < arr.length-1) {
      reading = setTimeout(this.beatReadingFunc, 1000 * this.state.receivedVal[beatReadN][1] / (this.props.state.bpm / 60));
    }
    else {
      setTimeout(this.stop, 1000 * this.state.receivedVal[beatReadN][1] / (this.props.state.bpm / 60));
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
    this.props.updateState({metronomeSwitch: true});
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
      if (inputOpen || !inputOpen || !beatReadN) {
        arr[beatReadN].classList.add("value--animation--mistake");
      } else if (beatReadN <= arr.length-1) {
        arr[beatReadN+1].classList.add("value--animation--mistake");
      }
      mistakes ++;
      inputOpen = false;
    }
  }
  
  beatInputFunc() {
    if (beatReadN === arr.length-1 || !arr[beatReadN].classList.contains("value--animation--mistake")) {
      inputOpen = true;
    }

    metronome.push(setTimeout(() => {
     if (inputOpen && (!(/--rest/).test(arr[beatReadN].className) && (beatReadN === 0 || !(/^[\d]/).test(this.state.receivedVal[beatReadN-1][0]))) ) {
      mistakes ++;
      arr[beatReadN].classList.add("value--animation--mistake");
     }
    beatReadN ++;
    inputOpen = false;
    }, (1000 * this.state.receivedVal[beatReadN][1] / (this.props.state.bpm / 60)) * (this.props.state.inputPerc*3) / 100));
    if (beatReadN < arr.length-1) {
      reading = setTimeout(this.beatInputFunc, 1000 * this.state.receivedVal[beatReadN][1] / (this.props.state.bpm / 60));
    } 
  }
  
  stop(event) {
    if (!this.props.state.info && !this.props.state.settings && !event) {
      this.setState({mistakes: mistakes});
    }
    document.removeEventListener("keydown", this.beatInputListener);
    this.setState({metronomeSwitch: false})
    for (let n in metronome) {
      clearTimeout(metronome[n]);
      clearInterval(metronome[n]);
    }

    clearTimeout(reading);
  }

  scrollHUD() {
   document.addEventListener("scroll", function() {
      var elem = document.querySelector(".main_page").offsetTop;
      var scroll = window.scrollY;
      if (scroll > elem / 4) {
        document.querySelector("nav").classList.add("nav--sticky");
      } else {
        document.querySelector("nav").classList.remove("nav--sticky");
      }
   })
  }

  clearBars() {
    this.setState({bars: []});

    this.clearScores.current.blur();
  }


  // shouldComponentUpdate(newState) {
    // if (JSON.stringify(this.state) !== JSON.stringify(this.props.state) || JSON.stringify(newState) !== JSON.stringify(this.state)) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
  // }

  componentDidMount() {
    updateData(this.props.state);

    for (let i = 0; i < 20; i ++) {
      let sound = this.note01.current;
      sound.volume = 0.2;
      soundArr.push(sound);
      let soundClone = sound.cloneNode(true);
      soundClone.volume = 0.2;
      soundArr.push(soundClone);
    }

    this.scrollHUD()
    
  } 

  render() {
    let bars = this.state.bars;
    return (
      <div>
        

        <div style={{overflow: "hidden"}}>
          <Header/>
          <div style={{position: "relative"}}>
            {this.props.state.info ? <Info/> : null}
            {this.props.state.settings ? <Settings/> : null}
          </div>
        
          <nav>
                  <div className="nav--hook--inv"></div>
                  <div className="nav--hook"></div>
                  <div className="button__holder">
                    <div className="btn-group m-1 mr-3 ml-4">
                      <button className="btn btn-dark" onClick={this.nextGen} disabled={this.state.metronomeSwitch} ref={this.new}><span id="new">New</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="new" placement="top">Generate new bars</UncontrolledTooltip> : null}

                      <UncontrolledButtonDropdown direction="top">
                        <DropdownToggle caret className="btn-dark" id="presets" disabled={this.state.metronomeSwitch}>
                          
                        </DropdownToggle>
                        <DropdownMenu style={{top: "-65px"}}>
                          <DropdownItem onClick={this.beginner}>
                            <button disabled={this.props.state.mode === 1 || this.state.metronomeSwitch} className="btn btn-dark"><span id="beginner">Beginner</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="beginner" placement="top">Only simple values</UncontrolledTooltip> : null}
                          </DropdownItem>
                          <DropdownItem onClick={this.intermediate}>
                            <button disabled={this.props.state.mode === 2 || this.state.metronomeSwitch} className="btn btn-dark"><span id="intermediate">Intermediate</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="intermediate" placement="top">+ dotted values</UncontrolledTooltip> : null}
                          </DropdownItem>
                          <DropdownItem onClick={this.expert}>
                            <button disabled={this.props.state.mode === 3 || this.state.metronomeSwitch} className="btn btn-dark"><span id="expert">Expert</span></button> 
                      {this.props.state.tips ? <UncontrolledTooltip target="expert" placement="top">+ triplets and quinteplets</UncontrolledTooltip> : null}
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                      {this.props.state.tips ? <UncontrolledTooltip target="presets" placement="top">Presets</UncontrolledTooltip> : null}

                      <button disabled={!this.state.bars.length || this.state.metronomeSwitch} className="btn btn-dark" onClick={this.clearBars} ref={this.clearScores} ><span id="clearScores">Clear</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="clearScores" placement="top">Clear the score board</UncontrolledTooltip> : null}
                    </div>

                    <button className="btn btn-dark mr-4 ml-3" onClick={this.beatReading} disabled={this.state.metronomeSwitch}><span id="metronome">Metronome</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="metronome" placement="top">Switch on metronome</UncontrolledTooltip> : null}

                    
                    <br/>
                    <div className="btn-group ml-1 mr-4">
                       <button className="btn btn-dark" disabled={!this.state.bars.length} onClick={this.beat} ref={this.beatShow}><span id="beat">Beat</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="beat" placement="top">Show the position of beat</UncontrolledTooltip> : null}

                       <button className="btn btn-dark" disabled={!this.state.beat || !this.state.bars.length} onClick={this.beatNumb} ref={this.num}><span id="num">Num</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="num" placement="top">Show the number of the beat</UncontrolledTooltip> : null}
                    </div>

                    <div className="btn-group mr-1">
                      <button className="btn btn-dark" onClick={this.beatReading} disabled={this.state.bars.length < 1 || this.state.metronomeSwitch}><span id="reading">Reading</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="reading" placement="top">Listen to the rhytm</UncontrolledTooltip> : null}

                       <button className="btn btn-dark" onClick={this.stop} disabled={!this.state.metronomeSwitch}><span id="stop">Stop</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="stop" placement="top">Stop metronome</UncontrolledTooltip> : null}

                       <button className="btn btn-dark" onClick={this.beatInput} disabled={this.state.bars.length < 1 || this.state.metronomeSwitch}><span id="practice">Practice</span></button>
                      {this.props.state.tips ? <UncontrolledTooltip target="practice" placement="top">Play note values with your keyboard (any key)</UncontrolledTooltip> : null}
                    </div>
                       
                  
                  </div>
            </nav>

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
            
                
                <div className="settings--hook" onMouseOver={this.settings}>Settings</div>
                <div className="info--hook" onMouseOver={this.info}>Info</div>
                

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
                        {(( (ind === 0 && Array.isArray(y)) || (ind === 1 && beat === y[1]) || Number.isInteger(beat-y[1]) || (ind === x.length-1 && y[1] === this.state.beamNum) ) && count < measureReassign[this.props.state.measure] ? (<div key={beat+y[0]} className="beat" style={this.state.beat ? ((/rest|whole/).test(y[0]) ? ({opacity: "100%", top:"100%", left:"5px"}) : ((/--end/).test(y[0]) ? ({opacity: "100%", left: "10px"}) : ({opacity: "100%"}))) : {opacity: "0%"}}><div style={this.state.beatNumb ? {opacity:"1"} : {opacity:"0"}}>{beat-y[1] + 1}</div><span style={{display: "none"}}>{count ++ }</span></div>) : null)}
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
                    return <div className={Array.isArray(y) ? ("value " + y[0].match(/\D+[\d]*.+/).join("")) : ("value  " + this.props.state.measure)} key={index+ind + y[0]}>
                      <Linked link={link} ch={ch} ind={ind} bars={this.state.bars} />
                      {(( (ind === 0 && Array.isArray(y)) ||( ind === 1 && beat === y[1]) || Number.isInteger(beat-y[1]) || (ind === x.length-1 && y[1] === this.state.beamNum) ) && count < measureReassign[this.props.state.measure] ? (<div key={beat+y[0]} className="beat" style={this.state.beat ? ((/rest|whole/).test(y[0]) ? ({opacity: "100%", top:"100%", left:"5px"}) : ((/--end/).test(y[0]) ? ({opacity: "100%", left: "10px"}) : ({opacity: "100%"}))) : {opacity: "0%"}}><div style={this.state.beatNumb ? {opacity:"1"} : {opacity:"0"}}>{beat-y[1] + 1}</div><span style={{display: "none"}}>{count ++ }</span></div>) : null)}
                      </div>
                    }
                })}
                </div>
                </div>
                
              })
              }

              </div>
                <div className="mistakes" style={{opacity: (this.state.mistakes !== null && mistakes >= 0 && this.state.bars.length) ? "1" : "0"}}>Mistakes: {this.state.mistakes}</div>
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


