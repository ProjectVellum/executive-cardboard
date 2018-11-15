import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { push as Menu } from 'react-burger-menu';

import MenuButton from 'components/MenuButton.jsx';
import GraphAutoUpdate from 'GraphAutoUpdate.jsx';
import { SelectNode, DeselectNode } from 'redux/graph/r_graph_actions.jsx';
import { OPEN, OpenMenu } from 'redux/menu/r_menu_actions.jsx';
import { IsOpened } from 'redux/menu/r_menu.jsx';
import appConfig from 'appConfig'; //this project's config: src/appConfig.json


class NodeList extends React.Component {

    constructor(props) {
        super(props);

        this.onMouseOverItem = this.onMouseOverItem.bind(this);
        this.onMouseOutItem = this.onMouseOutItem.bind(this);
    }//constructor


    onMouseOverItem(itemName) {
        this.props.graph.nodeHighlightEvent(itemName, true);
        this.props.DispatchSelectNode(itemName);
    }//onMouseOverItem


    onMouseOutItem(itemName) {
        this.props.graph.nodeHighlightEvent(itemName, false);
        this.props.DispatchDeselectNode(itemName);
    }//onMouseOutItem


    render() {
        let isOpened = IsOpened(this.props.ReduxOpenedList, this.props.name);
        return (
            <Menu
                isOpen={isOpened}
                noOverlay
                right
                disableCloseOnEsc
                width="200px"
            >
                <div className="sidebar-header">
                    <div style={{ height: "30px", marginLeft: "0px", width: "20%", padding: "0px" }}>
                        <MenuButton
                            className="btn-close"
                            name="X"
                            menuToToggle="NodeList"
                        />
                    </div>
                    <div style={{ paddingTop: "10%" }}>
                        Graph Overview
                    </div>

                </div>

                <div>

                    <GraphAutoUpdate updateTimer={appConfig.graph.updateRate} />

                </div>

                <div>
                    <ListGroup>{
                        this.props.graph.nodes.map((listValue) => {
                            let elementKey = "nodelist_" + listValue.id;
                            let isSelected = listValue.id == this.props.selectedNode.id;
                            return (
                                <ListGroupItem className="noborder"
                                    key={elementKey}
                                    color={isSelected ? "warning" : "success"}
                                    onMouseOver={() => this.onMouseOverItem(listValue.id)}
                                    onMouseOut={() => this.onMouseOutItem(listValue.id)}
                                >
                                    {listValue.id}
                                </ListGroupItem>
                            );
                        })
                    }</ListGroup>
                </div>

            </Menu>
        );
    }//render
}//app

NodeList.defaultProps = {
    name: "NodeList"
}


function mapStateToProps(state) {
    return {
        graph: state.graph,
        selectedNode: state.graph.selectedNode,
        ReduxOpenedList: state.menu.opened,
    }
}//mapStateToProps


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        DispatchSelectNode: SelectNode,
        DispatchDeselectNode: DeselectNode
    },
        dispatch);
}//matchDispatchToProps


export default connect(mapStateToProps, matchDispatchToProps)(NodeList);