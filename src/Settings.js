import {mapStateToProps, mapDispatchToProps} from "./redux/redux";
import {connect} from "react-redux";
import React from 'react';

class SettingsCon extends React.Component {
    constructor(props) {
        super(props);

    this.mainPage = this.mainPage.bind(this);
    }
    mainPage() {
        setTimeout(() => {
           this.props.newState({settings: false}) 
        }, 700);
        
        document.querySelector(".main_page").classList.add("main_page--settAnim--back");
        setTimeout(() => document.querySelector(".settings--hook").style.pointerEvents = "auto", 800);
    }

    componentDidMount() {
        document.querySelector(".settings_page").style.height = document.querySelector(".main_page").clientHeight + "px";

        let usedClass = document.querySelector(".main_page").classList;
        usedClass.remove("main_page--settAnim", "main_page--settAnim--back")
        usedClass.toggle("main_page--settAnim");
        setTimeout(() => document.querySelector(".main_page--hook_sett").style.pointerEvents = "auto", 700)
    }
    render() {
        return (
            <div>
                <div className="settings_page">
                    {/* <div className="settings--inside"></div> */}
                    <div className="main_page--hook_sett" onMouseOver={this.mainPage}>Main_Page</div>

                    <h1>SETTINGS</h1>

                </div>
            </div>
        )
    }
}
let Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsCon);

export default Settings;