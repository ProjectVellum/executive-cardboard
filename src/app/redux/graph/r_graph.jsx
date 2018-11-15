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
import fetch from 'cross-fetch';

import appConfig from 'appConfig'; //this project's config: src/appConfig.json
import * as icons from 'const/icons.jsx';
import * as actions from './r_graph_actions.jsx';
import { GetDimensions } from 'utils/common_tools.jsx';


const defaultState = {
    nodes: [{
        id: 'Main Switch',
        hardware: 'switch',
        svg: icons.GetRawSvg(icons.IconTypes.server),
        x: GetDimensions().width / 2.5,
        y: GetDimensions().height / 2.5
    }],
    links: [], // { source: 'node_id', target: 'node_id'}
    selectedNode: {},
    prevSelectedNode: {},
    nodeHighlightEvent: event, //set by NetworkGraph component
    isLoading: false,
    error: null,
}//defaultState


export function fetchGraphData() {
    return dispatch => {
        dispatch(actions.StartLoading());

        return fetch(appConfig.graph.url, {
            mode: 'no-cors',
        }) //make a rest call to get graph data
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(actions.SetGraph(json)); //call AddNode reducer
                return json;
            })
            .catch(error =>
                dispatch(actions.FetchError(error))
            );
    };//return
}//fetchGraphData


/* 
 * Handle HTTP errors since fetch won't.
 */
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}//response


/*
 * Return a node object if nodeId is in the array if state.nodes.
 * Return empty obj if not found. 
 */
const FindNode = (nodeList, nodeId) => {
    if (nodeId === undefined)
        return {}

    nodeId = nodeId.toLowerCase();
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].id.toLowerCase() == nodeId)
            return nodeList[i];
    }//for
    return {}
}//FindNode


/* "..." is a "spread operator". Source:
 *  https://medium.com/@thejasonfile/using-the-spread-operator-in-react-setstate-c8a14fc51be1

 *  Update Node Graph with a new state. Note, since by the laws of React, State is
 *  immutable, therefore - can't just add nodes and links. Thus, need to use "spread
 *  operator (...state)" to create a "new" state object, modify that, and return it.
*/
const GraphReducer = (state = defaultState, action) => {
    switch (action.type) {

        case actions.LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case actions.FAILED_OP:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }

        case actions.GET_GRAPH:
            return {
                ...state,
                graph: action.payload,
                isLoading: false,
                error: null,
            }

        case actions.SET_GRAPH:
            return {
                ...state,
                nodes: action.payload.nodes,
                links: action.payload.links,

                isLoading: false,
                error: null,
            }

        case actions.ADD_NODES:
            return {
                ...state,

                nodes: [
                    ...state.nodes,
                    //add a new "node" from action that is an "addNode" function.
                    action.payload.node
                ],//nodes 

                links: [
                    ...state.links,
                    action.payload.link
                ],

                isLoading: false,
                error: null,
            }//return

        case actions.ADD_LINKS:
            return {
                ...state,
                links: [
                    ...state.links,
                    //add a new "link" from action that is an "addLink" function.
                    state.links.concat(action.link)
                ],//links

                isLoading: false,
                error: null,
            }//return

        case actions.SELECT_NODE:
            let nodeObj = FindNode(state.nodes, action.payload);
            return {
                ...state,
                'selectedNode': nodeObj
            }//return

        case actions.SET_HIGHLIGHT_FUNC:
            return {
                ...state,
                nodeHighlightEvent: action.payload
            }//return

        case actions.DESELECT_NODE:
            //make sure that trying to deselect the node that is currently selected.
            //Otherwise - keep selection the same.
            let isSameNodeSelected = action.payload === state.selectedNode.id;
            return {
                ...state,
                'selectedNode': isSameNodeSelected ? {} : state.selectedNode,
                'prevSelectedNode': isSameNodeSelected ? state.selectedNode : state.prevSelectedNode
            }

        default:
            return state;

    }//switch
};


export default GraphReducer;