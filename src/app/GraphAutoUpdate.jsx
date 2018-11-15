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
import { Button } from 'reactstrap';
import { IconTypes } from 'const/icons.jsx';
import { fetchGraphData } from 'redux/graph/r_graph.jsx';
import { SelectNode, AddNode, } from 'redux/graph/r_graph_actions.jsx';



class GraphAutoUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            autorefreshId: null,
            node_counter: 1,
            something: 0,
        };

        this.updateNodeGraph = this.updateNodeGraph.bind(this);
        this.fetchGraph = this.fetchGraph.bind(this);
    }//constructor


    componentDidMount() {
        this.updateNodeGraph()
        var autorefreshId = setInterval(this.props.fetchNode, this.props.updateTimer);

        this.setState({ autorefreshId: autorefreshId });
    }//componentDidMount


    updateNodeGraph() {
        let node = {
            id: "node_" + this.state.node_counter,
            hardware: "node",
            group: "group_" + this.state.node_counter,
        }

        let link = {
            source: "node_" + (this.state.node_counter),
            target: "Main Switch",
            value: 15,
        }

        this.setState({ node_counter: this.state.node_counter + 1 })
        return { node: node, link: link }
    }//updateNodeGraph


    fetchGraph() {
        fetchGraphData();
    }//fetchGraph


    render() {
        return (
            <div>
                {/* <button
                    onClick={() =>
                        this.props.addNode(this.updateNodeGraph())
                    }
                >Add</button> */}

                <Button color="info" style={{ margin: "10px 0 10px 10px" }}
                    onClick={() =>
                        this.props.fetchNode()
                    }
                >Refresh Graph</Button>
            </div>
        )//return
    }//render

}//class


GraphAutoUpdate.defaultProps = {
    updateTimer: 5000,
}


function mapStateToProps(state) {
    return {
        graph: state.graph,
    }
}//mapStateToProps


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectNode: SelectNode,
        addNode: AddNode,
        fetchNode: fetchGraphData,
    },
        dispatch);
}//matchDispatchToProps


export default connect(mapStateToProps, matchDispatchToProps)(GraphAutoUpdate);