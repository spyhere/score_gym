import {mapStateToProps, mapDispatchToProps} from "../redux/redux";
import {connect} from "react-redux";
import React from 'react';
import SettingsTabs from "./tabs";
import {Progress, Label, Input, UncontrolledTooltip} from "reactstrap";

class SettingsCon extends React.Component {
    constructor(props) {
        super(props);

    this.mainPage = this.mainPage.bind(this);
    this.tips = this.tips.bind(this);
    }
    mainPage() {
        setTimeout(() => {
           this.props.updateState({settings: false});
           
           document.querySelector(".main_page").classList.remove("main_page--settAnim", "main_page--settAnim--back");
              }, 700);
              
              document.querySelector("nav").classList.remove("nav--out");
        
        document.querySelector(".main_page").classList.add("main_page--settAnim--back");
        setTimeout(() => document.querySelector(".settings--hook").style.pointerEvents = "auto", 800);
    }

    tips() {
        this.props.updateState({tips: !this.props.state.tips})
    }

    componentDidMount() {
        document.querySelector(".settings_page").style.height = document.querySelector(".main_page").clientHeight + "px";

        document.querySelector("nav").classList.add("nav--out");

        let usedClass = document.querySelector(".main_page").classList;
        usedClass.remove("main_page--settAnim", "main_page--settAnim--back")
        usedClass.toggle("main_page--settAnim");
        setTimeout(() => document.querySelector(".main_page--hook_sett").style.pointerEvents = "auto", 700)
    }
    render() {
        return (
            <div>
                
                <div className="settings_page">
                    <h1 className="display-4">Settings</h1>
                    <div className="main_page--hook_sett" onMouseOver={this.mainPage}>Main_Page</div>
                    <div className="settings--inside">
                        

                    <Label style={{marginLeft: "5em"}} id="tips">
                        <Input type="checkbox" onClick={this.tips} defaultChecked={this.props.state.tips}/>Tips
                    </Label>
                    <UncontrolledTooltip target="tips" placement="right">Tips on hover</UncontrolledTooltip>

                    <SettingsTabs/>
                        
                        {/* <Progress multi>
                            <Progress bar style={{backgroundColor: "red"}} value={15}>whole</Progress>
                            <Progress bar style={{backgroundColor: "green"}} value={45}>half</Progress>
                            <Progress bar style={{backgroundColor: "black"}} value={40}>quarter</Progress>
                        </Progress> */}
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}
let Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsCon);

export default Settings;