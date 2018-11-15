import { GetNodes } from 'utils/common_tools.jsx';
import * as icons from 'const/icons.jsx';

export const LOADING = "LOADING_GRAPH";
export const FAILED_OP = "FAILED_OP";
export const GET_GRAPH = "GET_GRAPH";
export const SET_GRAPH = "SET_GRAPH";
export const ADD_NODES = "ADD_NODES";
export const ADD_LINKS = "ADD_LINKS";
export const SELECT_NODE = "SELECT_NODE";
export const DESELECT_NODE = "DESELECT_NODE";
export const SET_HIGHLIGHT_FUNC = "SET_HF";

/* Set a function that toggles nodes path highlight on selection.
 * This should be called once by NetworkGraph component on initiation.
 * @param highlightFunc: 
 */
export const SetHighlightFunc = (highlightFunc) => {
    return {
        type: SET_HIGHLIGHT_FUNC,
        payload: highlightFunc,
    }//return
}//GetGraph


export const StartLoading = () => {
    return {
        type: LOADING,
    }//return
}//StartLoading


export const FetchError = (error) => {
    // console.log(error);
    return {
        type: FAILED_OP,
        payload: { error }
    }
}


export const GetGraph = () => {
    return {
        type: GET_GRAPH,
        payload: GetNodes(),
    }//return
}//GetGraph


// @param node: <str> id of the node to select.
export const SelectNode = (node) => {
    if (node === undefined)
        node = GetGraph().selectedNode;

    return {
        type: SELECT_NODE,
        payload: node
    }//return
}//selectNode


// @param node: <str> id of the node to select.
export const DeselectNode = (node) => {
    return {
        type: DESELECT_NODE,
        payload: node
    }//return
}//selectNode



export const SetGraph = (newGraph) => {
    let newNodes = newGraph.hasOwnProperty("graph") ? newGraph.graph.nodes : newGraph.nodes;
    let newLinks = newGraph.hasOwnProperty("graph") ? newGraph.graph.links : newGraph.links;
    newNodes.map((node) => {
        node.svg = icons.GetRawSvg(node.hardware);
    });
    return {
        type: SET_GRAPH,
        payload: {
            nodes: newNodes,
            links: newLinks,
            // props: GetNodes(),
        }
    }//return
}//SetGraph


//@param newNode: <obj> { id: 'Node_1', type: "server/ram/switch..." }
export const AddNode = (newNode) => {
    if (newNode === undefined)
        return GetGraph();

    let payload = newNode;

    let node_props = GetNodes();
    payload.node.props = node_props;

    payload.node = {
        ...payload.node,
        svg: icons.GetRawSvg(),
    };

    if (payload.svg == "") {
        payload['fill'] = colors.green;
    }

    return {
        type: ADD_NODES, //str
        payload: payload,
    }//return
}//addNode