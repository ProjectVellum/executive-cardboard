/**
 * (C) Copyright 2018 Hewlett Packard Enterprise Development LP” on your code
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 * of the Software, and to permit persons to whom the Software is furnished to do 
 * so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ForceGraph2D from 'react-force-graph-2d';

import * as common_tools from 'utils/common_tools.jsx';
import * as Icons from 'const/icons.jsx';
import { SelectNode, DeselectNode, SetHighlightFunc } from 'redux/graph/r_graph_actions.jsx';


class NetworkGraph extends React.Component {

    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);

        let dimensions = common_tools.GetDimensions();
        let margin = { h: 150, w: 40 };

        this.state = {
            margin: margin,
            svgWidth: dimensions.width - margin.w,
            svgHeight: dimensions.height - margin.h,
            isLocalSelect: {},
        }//state

        this.onNodeOver = this.onNodeOver.bind(this);
        this.onNodeOut = this.onNodeOut.bind(this);
        this.graphObj = React.createRef();

        this.drawNode = this.drawNode.bind(this);
        this._makeSvgImag = this._makeSvgImag.bind(this);
    }//constructor


    updateDimensions() {
        let dimensions = common_tools.GetDimensions();
        this.setState(
            {
                svgWidth: dimensions.width - this.state.margin.w,
                svgHeight: dimensions.height - this.state.margin.h,
            });
    }//updateDimensions


    /* ************************ COMPONENTS MOUNTS ************************ */

    componentWillMount() {
        this.updateDimensions();
    }//componentWillMount


    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);

        if (this.props.graph.graphEvent === undefined) {
            //Give access to node highlighting from outside this component.
            if (this.graphObj != null && this.graphObj.current != null)
                this.props.DispatchHighlightFunc(this.graphObj.current._setNodeHighlightedValue);
            else
                this.props.DispatchHighlightFunc(function () { });

        }
    }//componentDidMount


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }//componentWillUnmount

    /* ******************************************************************* */

    shouldComponentUpdate(nextProps, nextState) {
        let isSameNodes = nextProps.graph.nodes.length === this.props.graph.nodes.length;
        let isSameLinks = nextProps.graph.links.length === this.props.graph.links.length;
        let shouldUpdate = !isSameNodes || !isSameLinks;
        return shouldUpdate;
    }//shouldComponentUpdate


    onNodeOver(nodeId) {
        if (nodeId == this.props.selectedNode.id)
            return;
        this.props.DispatchSelectNode(nodeId);
    }//onNodeOver


    onNodeOut(nodeId) {
        if (this.props.selectedNode.id != nodeId)
            return;
        this.props.DispatchDeselectNode(nodeId);
    }//onNodeOut


    drawNode(node, ctx, globalScale) {
        const label = node.id;
        var imgObj = document.getElementById("icon_" + node.hardware);
        ctx.drawImage(imgObj, 0, 0, 1300, 1300, node.x - 5, node.y - 5, 11, 11);
    }//drawNode


    _makeSvgImag() {
        return (
            Object.keys(Icons.IconTypes).map(key => {
                let iconTypeName = Icons.IconTypes[key];
                return (
                    <img
                        id={"icon_" + iconTypeName}
                        style={{ "display": "none" }}
                        src={Icons.GetRawSvg(iconTypeName)}
                        width="100px"
                        height="100px"
                        key={"icon_" + iconTypeName}
                    >
                    </img>
                );
            }
            )//map
        );//return
    }//_makeSvgImag


    render() {
        let data = this.props.graph;
        let screenSize = common_tools.GetDimensions();

        return (
            <div>
                {this._makeSvgImag()}
                <ForceGraph2D
                    ref={el => { this.fg = el; }}
                    width={screenSize.width - 40}
                    height={screenSize.height - 100}
                    graphData={data}
                    nodeCanvasObject={this.drawNode}
                    linkColor="gray"
                    linkWidth={3}
                    linkDirectionalParticles={2}
                    zoom={[5]}
                />
            </div>
        )
    }//render

}//NetworkGraph


function mapStateToProps(state) {
    return {
        graph: state.graph,
        selectedNode: state.graph.selectedNode,
        prevSelectedNode: state.graph.prevSelectedNode,
    }
}//mapStateToProps


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        DispatchSelectNode: SelectNode,
        DispatchDeselectNode: DeselectNode,
        DispatchHighlightFunc: SetHighlightFunc
    },
        dispatch);
}//matchDispatchToProps


export default connect(mapStateToProps, matchDispatchToProps)(NetworkGraph);