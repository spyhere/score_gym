import {mapStateToProps, mapDispatchToProps} from "./redux/redux";
import {connect} from "react-redux";
import React from 'react';

class SettingsCon extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {mainPage: false}

    this.mainPage = this.mainPage.bind(this);
    }
    mainPage() {
        this.setState({mainPage: !this.state.mainPage})
        document.querySelector(".main_page").classList.toggle("main_page--anim");
        document.querySelector(".main_page").classList.toggle("main_page--anim--back");
    }

    render() {
        return (
            <div>
                <div className="settings">
                    {/* <div className="settings--inside"></div> */}
                    <div style={{display: (this.state.mainPage) ? "none" : null}} className="main_page--hook" onMouseOver={this.mainPage}>Main_Page</div>



                </div>
            </div>
        )
    }
}
let Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsCon);

export default Settings;