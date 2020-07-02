import {mapStateToProps, mapDispatchToProps} from "./redux/redux";
import {connect} from "react-redux";
import React from 'react';


class InfoCon extends React.Component {
    constructor(props) {
        super(props);

    this.mainPage = this.mainPage.bind(this);
    }

    mainPage() {
        document.querySelector(".main_page--hook_info").style.pointerEvents = "none";
        setTimeout(() => {
            this.props.newState({info: false});
            
        }, 700)

        setTimeout(() => {
            document.querySelector(".info--hook").style.pointerEvents = "auto";
        }, 800)
        
        document.querySelector(".info_page").classList.add("info_page--infoAnim--back");
    }
    componentDidMount() {
        document.querySelector(".info_page").style.height = document.querySelector(".main_page").clientHeight + "px";
        
        document.querySelector(".info_page").classList.add("info_page--infoAnim");

        setTimeout(() => {
            document.querySelector(".main_page--hook_info").style.pointerEvents = "auto";
          }, 700);
    }
    render() {
        return (
            <div>
                <div className="info_page">
                    <div className="info">
                        {/* <div className="info--inside"></div> */}
                        <div className="main_page--hook_info" onMouseOver={this.mainPage}>Main_Page</div>

                    <h1>INFO, TUTORIAL</h1>

                    </div>
                </div>   
            </div>
        )
    }
}

let Info = connect(mapStateToProps, mapDispatchToProps)(InfoCon);

export default Info;