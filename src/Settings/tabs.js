import {mapStateToProps, mapDispatchToProps} from "../redux/redux";
import {connect} from "react-redux";
import React, { useState } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, Row, Col, Label, Input, UncontrolledCollapse } from 'reactstrap';

const SettingsTabsCon = (props) => {
    const [activeTab, setActiveTab] = useState(`${props.state.tab}`);

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    const tabFunc = () => {
        toggle('1'); 
        props.updateState({tab: 1})

    }
        return(
            <div>
                <div className="settings__tabs">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); props.updateState({tab: 1})}}>
                                Score Settings
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); props.updateState({tab: 2})}}>
                                Bar Settings
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); props.updateState({tab: 3})}}>
                                Values Probability
                            </NavLink>
                        </NavItem>
                </Nav>

                <TabContent activeTab={activeTab} className="settings__tabs__content">
                    <TabPane tabId="1">
                        <Row>
                            <Col md="4">
                                <Card body>
                                    <CardTitle>Measure</CardTitle>
                                    <Row>
                                        <Col md="4">
                                             <p>2/4</p>
                                        </Col>
                                        <Col md="4">
                                            <p>3/4</p>
                                        </Col>
                                        <Col md="4">
                                            <p>4/4</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4">
                                             <p>5/4</p>
                                        </Col>
                                        <Col md="4">
                                            <p>7/4</p>
                                        </Col>
                                        <Col md="4">
                                            <p>5/8</p>
                                        </Col>
                                    </Row>
                                   <Row>
                                       <Col md={{size: "4", offset: "4"}}>
                                           <p>6/8</p>
                                       </Col>
                                   </Row>
                                
                                    
                                </Card>
                            </Col>
                            <Col md="3">
                                <Card body>
                                    <CardTitle>Bar quantity</CardTitle>
                                        <Row>
                                            <Col md="4">
                                                <p>4</p>
                                            </Col>
                                            <Col md="4">
                                                <p>8</p>
                                            </Col>
                                            <Col md="4">
                                                <p>10</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="4">
                                                <p>12</p>
                                            </Col>
                                            <Col md="4">
                                                <p>16</p>
                                            </Col>
                                            <Col md="4">
                                                <p>20</p>
                                            </Col>
                                        </Row>
                                </Card>
                            </Col>
                            <Col md="3">
                                <Card body>
                                    <CardTitle>BPM</CardTitle>
                                    <Row>
                                        <Col md={{size: "4", offset: "4"}}>
                                            <Input type="number" name="selectMulti" id="exampleSelectMulti" defaultValue={props.state.bpm}>
                                            </Input>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        
                        
                    </TabPane>

                    <TabPane tabId="2" className="tab__bar-settings">
                        <Row>
                            <Col md={{size: "6", offset: "3"}}>
                                <Card body>
                                    <Label>
                                        Easy on beat
                                        <Input type="range" defaultValue={props.state.easyOBProb}/>
                                    </Label>
                                    
                                    <Label>
                                        Fixing beat
                                        <Input type="range" defaultValue={props.state.fixingBeatProb}/>
                                    </Label>

                                    <Label>
                                        Pause value
                                        <Input type="range" defaultValue={props.state.pauseValue}/>
                                    </Label>

                                    <Label className="settings__tabs__content__checkbox">
                                        <Input type="checkbox" defaultChecked={props.state.groupRest}/> Summing rests
                                    </Label>

                                    <Label className="settings__tabs__content__checkbox">
                                        <Input type="checkbox" defaultChecked={props.state.linkIns}/> Link inside bar
                                    </Label>

                                    <Label>
                                        Link outside the bar
                                        <Input type="range" defaultValue={props.state.linkOut}/>
                                    </Label>

                                    <Label className="settings__tabs__content__checkbox">
                                        <Input type="checkbox" defaultChecked={props.state.showBeat}/> Show beat (beaming)
                                    </Label>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="3">
                        <Row>
                            <Col md="6" className="mb-4">
                                <Card body>
                                    <CardTitle>Simple note values</CardTitle>

                                    <Label>
                                        <Input type="range" defaultValue={props.state.simpleK * 100 / props.state.maxK}/>
                                    </Label>
                                    <Row>
                                        <Col md={{size: "4", offset: "4"}} className="mb-2 mt-2">
                                            <button className="btn btn-secondary" id="simpleVals">Settings</button>
                                        </Col>
                                    </Row>

                                    <UncontrolledCollapse toggler="#simpleVals">
                                        <Row>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.noteValues.whole}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.noteValues.half}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.noteValues.quarter}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.noteValues.eighth}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.noteValues.sixteenth}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.noteValues.thirtySecond}></Input>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="2">
                                                <p>whole</p>
                                            </Col>
                                            <Col md="2">
                                                <p>half</p>
                                            </Col>
                                            <Col md="2">
                                                <p>quarter</p>
                                            </Col>
                                            <Col md="2">
                                                <p>eighth</p>
                                            </Col>
                                            <Col md="2">
                                                <p>sixteenth</p>
                                            </Col>
                                            <Col md="2">
                                                <p>thirty-second</p>
                                            </Col>
                                        </Row>

                                    </UncontrolledCollapse>
                                        
                                </Card>
                            </Col>

                            <Col md="6" className={props.state.dotsK <= 0 ? "card--inactive mb-4" : "mb-4"}>
                                <Card body>
                                    <CardTitle>Dotted note values</CardTitle>

                                    <Label>
                                        <Input type="range" defaultValue={props.state.dotsK * 100 / props.state.maxK}/>
                                    </Label>

                                    <Row>
                                        <Col md={{size: "4", offset: "4"}} className="mb-2 mt-2">
                                            <button className="btn btn-secondary" id="dottedVals">Settings</button>
                                        </Col>
                                    </Row>

                                    <UncontrolledCollapse toggler="#dottedVals">
                                        <Row>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.dottedValues.whole}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.dottedValues.half}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.dottedValues.quarter}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.dottedValues.eighth}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.dottedValues.sixteenth}></Input>
                                            </Col>
                                            <Col md="2">
                                                <Input type="range" className="input" defaultValue={props.state.dottedValues.thirtySecond}></Input>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="2">
                                                <p>whole</p>
                                            </Col>
                                            <Col md="2">
                                                <p>half</p>
                                            </Col>
                                            <Col md="2">
                                                <p>quarter</p>
                                            </Col>
                                            <Col md="2">
                                                <p>eighth</p>
                                            </Col>
                                            <Col md="2">
                                                <p>sixteenth</p>
                                            </Col>
                                            <Col md="2">
                                                <p>thirty-second</p>
                                            </Col>
                                        </Row>
                                    </UncontrolledCollapse>
                                    
                                </Card>
                            </Col>

                            <Col md={{size: "6", offset: "3"}} className={props.state.groupK <= 0 ? "card--inactive mb-4" : "mb-4"}>
                                <Card body>
                                    <CardTitle>Tuplet note values</CardTitle>

                                    <Label>
                                        <Input type="range" defaultValue={props.state.groupK * 100 / props.state.maxK}/>
                                    </Label>

                                    <Row>
                                        <Col md={{size: "4", offset: "4"}} className="mb-2 mt-2">
                                            <button className="btn btn-secondary" id="tupletVals">Settings</button>
                                        </Col>
                                    </Row>

                                    <UncontrolledCollapse toggler="#tupletVals">
                                       <Row>
                                            <Col md="3">
                                                <Input type="range" className="input" defaultValue={props.state.groupingValues.whole}></Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="range" className="input" defaultValue={props.state.groupingValues.half}></Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="range" className="input" defaultValue={props.state.groupingValues.quarter}></Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="range" className="input" defaultValue={props.state.groupingValues.eighth}></Input>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="3">
                                                <p>whole</p>
                                            </Col>
                                            <Col md="3">
                                                <p>half</p>
                                            </Col>
                                            <Col md="3">
                                                <p>quarter</p>
                                            </Col>
                                            <Col md="3">
                                                <p>eighth</p>
                                            </Col>
                                        </Row> 

                                        <Label>
                                            Quinteplet Probability
                                            <Input type="range" defaultValue={100 - props.state.tripletValue}/>
                                        </Label>

                                        <Row>
                                        <Col md={{size: "4", offset: "4"}} className="mb-2 mt-2">
                                            <button className="btn btn-secondary" id="quintepletProb" disabled={props.state.tripletValue === 100}>Quinteplet Map</button>
                                        </Col>
                                    </Row>

                                    <UncontrolledCollapse toggler="#quintepletProb">
                                       <Row>
                                            <Col md="3">
                                                <Input type="range" className="input" defaultValue={props.state.quintepletMap.whole}></Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="range" className="input" defaultValue={props.state.quintepletMap.half}></Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="range" className="input" defaultValue={props.state.quintepletMap.quarter}></Input>
                                            </Col>
                                            <Col md="3">
                                                <Input type="range" className="input" defaultValue={props.state.quintepletMap.eighth}></Input>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="3">
                                                <p>whole</p>
                                            </Col>
                                            <Col md="3">
                                                <p>half</p>
                                            </Col>
                                            <Col md="3">
                                                <p>quarter</p>
                                            </Col>
                                            <Col md="3">
                                                <p>eighth</p>
                                            </Col>
                                        </Row> 
                                    </UncontrolledCollapse>
                                    </UncontrolledCollapse>
                                    
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                </div>
                
            </div>
        )
    }


let SettingsTabs = connect(mapStateToProps, mapDispatchToProps)(SettingsTabsCon);

export default SettingsTabs;